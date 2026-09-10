import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment,
} from '@mui/material';
import { CustomAlert } from '../../../components/ui/CustomAlert';
import {
  User as UserIcon,
  Mail,
  Fingerprint,
  Phone,
  Check,
  Save,
} from 'lucide-react';
import { useFormik } from 'formik';
import { RegisteredUser, User } from '../../../types';
import { profileSchema } from '../../../schemas/userSchemas';
import { formatCPF, formatPhone, validateCPF } from '../../../utils/formatters';
import { authService } from '../../../services/authService';
import { setStorageItem } from '../../../services/storageService';
import { STORAGE_KEYS } from '../../../constants';
import { useToast } from '../../../context/ToastContext';
import {
  profileDataContainerStyle,
  profileDataSectionTitleStyle,
  profileDataSectionDescStyle,
  profileDataInputStyle,
  profileDataAlertStyle,
  profileDataActionsWrapperStyle,
  profileDataSubmitButtonStyle,
} from './ProfileDataTab.styles';

interface ProfileDataTabProps {
  user: User;
  onUpdateUser: (updatedData: Partial<User>) => void;
}

export const ProfileDataTab: React.FC<ProfileDataTabProps> = ({ user, onUpdateUser }) => {
  const { showToast } = useToast();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user.name || '',
      email: user.email || '',
      cpf: user.cpf ? formatCPF(user.cpf) : '',
      phone: user.phone ? formatPhone(user.phone) : '',
    },
    validationSchema: profileSchema,
    onSubmit: (values, { setSubmitting }) => {
      setErrorMessage(null);

      if (values.cpf && !validateCPF(values.cpf)) {
        const err = 'CPF inválido.';
        setErrorMessage(err);
        showToast(err, 'error');
        setSubmitting(false);
        return;
      }

      try {
        const formattedCpf = values.cpf ? formatCPF(values.cpf) : '';
        const formattedPhoneVal = values.phone ? formatPhone(values.phone) : '';

        const registered = authService.getRegisteredUsers();
        const updatedRegistered = registered.map((u: RegisteredUser) => {
          if (u.email && u.email.toLowerCase() === user.email.toLowerCase()) {
            return {
              ...u,
              name: values.name.trim(),
              cpf: formattedCpf,
              phone: formattedPhoneVal,
            };
          }
          return u;
        });
        setStorageItem(STORAGE_KEYS.REGISTERED_USERS, updatedRegistered);

        onUpdateUser({
          name: values.name.trim(),
          cpf: formattedCpf,
          phone: formattedPhoneVal,
        });

        showToast('Dados salvos com sucesso!', 'success');
      } catch (err) {
        const errMsg = 'Erro ao salvar informações.';
        setErrorMessage(errMsg);
        showToast(errMsg, 'error');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = formatCPF(e.target.value);
    formik.setFieldValue('cpf', masked);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = formatPhone(e.target.value);
    formik.setFieldValue('phone', masked);
  };

  return (
    <Box sx={profileDataContainerStyle}>
      <Box>
        <Typography variant="h6" sx={profileDataSectionTitleStyle}>
          Informações Pessoais
        </Typography>
        <Typography variant="body2" sx={profileDataSectionDescStyle}>
          Mantenha seus dados sempre atualizados para emissão de notas e comunicações de entrega.
        </Typography>
      </Box>

      {errorMessage && (
        <CustomAlert severity="error" sx={profileDataAlertStyle}>
          {errorMessage}
        </CustomAlert>
      )}

      <Box component="form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              name="name"
              label="Nome Completo"
              placeholder="Seu nome completo"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              variant="outlined"
              sx={profileDataInputStyle}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <UserIcon size={18} color="#94a3b8" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              name="email"
              label="Endereço de E-mail"
              value={formik.values.email}
              fullWidth
              disabled
              variant="outlined"
              sx={profileDataInputStyle}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={18} color="#94a3b8" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              name="cpf"
              label="CPF (Receita Federal)"
              placeholder="000.000.000-00"
              value={formik.values.cpf}
              onChange={handleCpfChange}
              onBlur={formik.handleBlur}
              disabled={Boolean(user.cpf)}
              fullWidth
              variant="outlined"
              sx={profileDataInputStyle}
              error={formik.touched.cpf && Boolean(formik.errors.cpf)}
              helperText={
                (formik.touched.cpf && formik.errors.cpf) ||
                (!user.cpf ? 'Formato: 000.000.000-00' : undefined)
              }
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Fingerprint size={18} color="#94a3b8" />
                    </InputAdornment>
                  ),
                },
                htmlInput: {
                  maxLength: 14,
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              name="phone"
              label="Telefone / Celular"
              placeholder="(11) 99999-9999"
              value={formik.values.phone}
              onChange={handlePhoneChange}
              onBlur={formik.handleBlur}
              fullWidth
              variant="outlined"
              sx={profileDataInputStyle}
              helperText="Utilizado para avisos sobre o rastreamento da entrega."
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone size={18} color="#94a3b8" />
                    </InputAdornment>
                  ),
                },
                htmlInput: {
                  maxLength: 15,
                },
              }}
            />
          </Grid>

          <Grid size={12}>
            <Box sx={profileDataActionsWrapperStyle}>
              <Button
                type="submit"
                variant="contained"
                disabled={formik.isSubmitting}
                startIcon={<Save size={18} />}
                sx={profileDataSubmitButtonStyle}
              >
                {formik.isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
