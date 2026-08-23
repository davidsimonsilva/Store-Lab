/**
 * ============================================================================
 * 🛡️ PARTE 1: A ESPECIFICAÇÃO (SPEC) - Validação Matemática e Tipagem Estrita
 * ============================================================================
 * Esta camada estabelece as regras matemáticas imutáveis de identificação de bandeiras,
 * contratos de dados do cartão de crédito e a validação do algoritmo de Luhn.
 */

export interface CreditCard {
  id: string;
  holderName: string;
  cardNumber: string; // Salvo higienizado (somente números)
  expiryDate: string; // Formato MM/AA
  cvv: string;
  brand: "visa" | "mastercard" | "amex" | "unknown";
}

/**
 * Algoritmo matemático de Luhn (Módulo 10) para verificação lógica de números de cartões.
 * Garante que o número digitado é matematicamente plausível antes de enviar à API/Gateway.
 */
export function validateLuhn(cardNumber: string): boolean {
  const cleanNumber = cardNumber.replace(/\D/g, "");
  if (cleanNumber.length < 13 || cleanNumber.length > 19) return false;

  let sum = 0;
  let shouldDouble = false;

  // Percorre os dígitos de trás para frente
  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

/**
 * Função estática que identifica a bandeira do cartão com base nos primeiros dígitos (BIN).
 * Visa: inicia com 4
 * Mastercard: inicia com 51-55 ou 2221-2720
 * Amex: inicia com 34 ou 37
 */
export function detectCardBrand(cardNumber: string): "visa" | "mastercard" | "amex" | "unknown" {
  const cleanNumber = cardNumber.replace(/\D/g, "");

  if (/^4/.test(cleanNumber)) return "visa";
  if (/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[0-1]|2720)/.test(cleanNumber)) return "mastercard";
  if (/^3[47]/.test(cleanNumber)) return "amex";

  return "unknown";
}


/**
 * ============================================================================
 * 🔄 PARTE 2: O CICLO DE FEEDBACK (LOOP) - Gateway Sandbox & Latência Realista
 * ============================================================================
 * Esta camada cuida do processamento dinâmico assíncrono. Ela simula o ciclo de vida
 * de uma transação bancária em ambiente de Sandbox, simulando atrasos de rede reais (Timeout)
 * e respostas determinísticas com base no número do cartão informado pelo usuário.
 */

export type TransactionStatus = "APPROVED" | "DECLINED" | "TIMEOUT_ERROR";

export interface CheckoutResponse {
  success: boolean;
  transactionId?: string;
  status: TransactionStatus;
  message: string;
}

/**
 * Simulador de Gateway Sandbox (O Loop Assíncrono de Pagamento)
 * 
 * Dependendo do final do número do cartão de teste, o Loop simulará diferentes
 * respostas e comportamentos de rede reais:
 * - Termina em "1": Sucesso Instantâneo (Aprovação rápida)
 * - Termina em "2": Recusa Financeira (Falta de limite ou cartão bloqueado)
 * - Termina em "3": Erro de Timeout (Estoura o limite de tempo simulado da API)
 */
export function simulateGatewayPayment(card: CreditCard, amount: number): Promise<CheckoutResponse> {
  return new Promise((resolve, reject) => {
    // 1. Validação estática prévia (A Spec protege a rede de enviar dados inválidos)
    if (!validateLuhn(card.cardNumber)) {
      return resolve({
        success: false,
        status: "DECLINED",
        message: "Falha na transação: O número do cartão de crédito é inválido (Luhn inválido).",
      });
    }

    // 2. Simula o ciclo/loop de latência bancária real de 1.5 segundos (setTimeout)
    setTimeout(() => {
      const lastDigit = card.cardNumber.slice(-1);

      switch (lastDigit) {
        // Cenário 1: Sucesso total
        case "1":
          resolve({
            success: true,
            transactionId: `tx_lab_${Math.floor(Math.random() * 1000000)}`,
            status: "APPROVED",
            message: `Pagamento de R$ ${amount.toFixed(2)} aprovado com sucesso no Sandbox!`,
          });
          break;

        // Cenário 2: Recusa bancária
        case "2":
          resolve({
            success: false,
            status: "DECLINED",
            message: "Transação Recusada: Saldo insuficiente ou limite de crédito indisponível.",
          });
          break;

        // Cenário 3: Timeout técnico / Queda de rede
        case "3":
          resolve({
            success: false,
            status: "TIMEOUT_ERROR",
            message: "Erro de Conexão: O banco emissor demorou muito para responder. Tente novamente.",
          });
          break;

        // Padrão: Aprovado se passar na validação geral
        default:
          resolve({
            success: true,
            transactionId: `tx_lab_${Math.floor(Math.random() * 1000000)}`,
            status: "APPROVED",
            message: "Pagamento aprovado com sucesso!",
          });
          break;
      }
    }, 1500); // 1.5 segundos emulando o tempo de resposta do servidor real
  });
}

/**
 * Exemplo de integração do Loop de carregamento (Loading) e tratativa de erros
 * no front-end em resposta aos retornos do gateway simulado.
 */
export const ExemploFluxoCheckoutLoopReact = `
import React, { useState } from "react";
import { CircularProgress, Alert, Button, Card, Typography } from "@mui/material";
import { CreditCard, simulateGatewayPayment } from "./CreditCardSandbox";

export function CheckoutPaymentButton({ card, totalAmount }: { card: CreditCard; totalAmount: number }) {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error" | "warning"; message: string } | null>(null);

  const handleProcessPaymentLoop = async () => {
    setLoading(true);
    setFeedback(null);

    try {
      // Dispara o loop assíncrono simulando a conexão externa com o gateway
      const response = await simulateGatewayPayment(card, totalAmount);

      if (response.success) {
        setFeedback({
          type: "success",
          message: response.message,
        });
        // Próximo passo no Loop: Direcionar para a tela de Sucesso do Pedido
      } else {
        // Trata os diferentes retornos de erro de forma granular
        if (response.status === "TIMEOUT_ERROR") {
          setFeedback({
            type: "warning",
            message: response.message, // Sugere que o usuário clique em re-tentar
          });
        } else {
          setFeedback({
            type: "error",
            message: response.message, // Exibe erro de recusa de limite de forma explícita
          });
        }
      }
    } catch (err) {
      setFeedback({
        type: "error",
        message: "Ocorreu um erro interno inesperado no fluxo.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6">Finalizar Compra</Typography>
      
      {feedback && (
        <Alert severity={feedback.type}>
          {feedback.message}
        </Alert>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleProcessPaymentLoop}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
      >
        {loading ? "Processando Transação..." : \`Pagar R$ \${totalAmount.toFixed(2)}\`}
      </Button>
    </Card>
  );
}
`;
