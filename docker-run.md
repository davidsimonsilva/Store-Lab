# Instruções de Execução com Docker (StoreLab)

Este documento descreve como baixar, construir e executar a aplicação StoreLab localmente utilizando Docker e Docker Compose.

---

## 1. Pré-requisitos

Certifique-se de ter o Docker instalado na sua máquina:
* **Windows / macOS**: Baixe e instale o [Docker Desktop](https://www.docker.com/products/docker-desktop/).
* **Linux (Ubuntu/Debian)**:
  ```bash
  sudo apt update
  sudo apt install docker.io docker-compose-v2 -y
  sudo systemctl start docker
  sudo systemctl enable docker
  ```

---

## 2. Executando com Docker Compose (Método Recomendado)

Na raiz do projeto, execute o comando abaixo para construir a imagem e iniciar o container em segundo plano:

```bash
docker compose up --build -d
```

Acesse a aplicação no seu navegador:
👉 **[http://localhost:3000](http://localhost:3000)**

### Comandos Úteis do Compose

* **Verificar status dos containers**:
  ```bash
  docker compose ps
  ```
* **Visualizar logs da aplicação**:
  ```bash
  docker compose logs -f
  ```
* **Parar o container**:
  ```bash
  docker compose down
  ```

---

## 3. Executando Apenas com Docker CLI (Sem Compose)

Se preferir utilizar diretamente os comandos do Docker CLI:

### 3.1. Build da Imagem
```bash
docker build -t storelab-app .
```

### 3.2. Executar o Container
```bash
docker run -d -p 3000:80 --name storelab-frontend storelab-app
```

Acesse a aplicação em:
👉 **[http://localhost:3000](http://localhost:3000)**

### 3.3. Comandos Úteis do Docker CLI
* **Parar o container**:
  ```bash
  docker stop storelab-frontend
  ```
* **Remover o container**:
  ```bash
  docker rm storelab-frontend
  ```
