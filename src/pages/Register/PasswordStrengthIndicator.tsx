import React from 'react';
import { Box, Typography } from '@mui/material';
import { Check, X } from 'lucide-react';
import {
  passwordRequirementsContainerStyle,
  criteriaListStyle,
  criterionItemStyle,
} from './PasswordStrengthIndicator.styles';

interface PasswordStrengthIndicatorProps {
  password: string;
}

interface PasswordCriterion {
  id: string;
  label: string;
  met: boolean;
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  if (!password) return null;

  const criteria: PasswordCriterion[] = [
    {
      id: 'length',
      label: 'Mínimo de 10 caracteres',
      met: password.length >= 10,
    },
    {
      id: 'uppercase',
      label: 'Pelo menos 1 letra maiúscula (A-Z)',
      met: /[A-Z]/.test(password),
    },
    {
      id: 'lowercase',
      label: 'Pelo menos 1 letra minúscula (a-z)',
      met: /[a-z]/.test(password),
    },
    {
      id: 'number',
      label: 'Pelo menos 1 número (0-9)',
      met: /[0-9]/.test(password),
    },
    {
      id: 'special',
      label: 'Pelo menos 1 caractere especial (@$!%*#?&)',
      met: /[@$!%*#?&]/.test(password),
    },
  ];

  return (
    <Box sx={passwordRequirementsContainerStyle} aria-live="polite">
      <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block' }}>
        Para criar a senha, é necessário atender aos requisitos abaixo:
      </Typography>

      <Box sx={criteriaListStyle}>
        {criteria.map((criterion) => (
          <Box key={criterion.id} sx={criterionItemStyle(criterion.met)}>
            {criterion.met ? (
              <Check size={14} color="#10b981" strokeWidth={3} />
            ) : (
              <X size={14} color="#94a3b8" strokeWidth={2} />
            )}
            <Typography variant="caption" sx={{ color: 'inherit', fontWeight: 'inherit' }}>
              {criterion.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

