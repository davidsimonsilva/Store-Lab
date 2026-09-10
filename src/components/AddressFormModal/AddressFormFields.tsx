import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Grid,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  CircularProgress,
  MenuItem,
  Button,
} from '@mui/material';
import {
  MapPin,
  Home,
  Store,
  Navigation,
  User,
} from 'lucide-react';
import { FormikProps } from 'formik';
import { BRAZILIAN_UFS } from '../../schemas/commonSchemas';
import {
  addressFormInputStyle,
  addressTypeButtonStyle,
} from './AddressFormModal.styles';

const ADDRESS_TYPES = [
  { value: 'Casa', label: 'Casa', icon: Home },
  { value: 'Comercial', label: 'Comercial', icon: Store },
];

export interface AddressFormValues {
  label: string;
  recipientName: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  referencePoint: string;
  isDefault: boolean;
}

interface AddressFormFieldsProps {
  formik: FormikProps<AddressFormValues>;
  isSearchingCep: boolean;
  onCepChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AddressFormFields: React.FC<AddressFormFieldsProps> = ({
  formik,
  isSearchingCep,
  onCepChange,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.2, pt: 1.5 }}>

      <Box>
        <TextField
          name="cep"
          label={
            <span>
              CEP <span style={{ color: '#ef4444' }}>*</span>
            </span>
          }
          placeholder="38010-200"
          value={formik.values.cep}
          onChange={onCepChange}
          onBlur={formik.handleBlur}
          fullWidth
          variant="outlined"
          sx={addressFormInputStyle}
          error={formik.touched.cep && Boolean(formik.errors.cep)}
          helperText={formik.touched.cep && formik.errors.cep}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <MapPin size={18} color="#64748b" />
                </InputAdornment>
              ),
              endAdornment: isSearchingCep ? (
                <InputAdornment position="end">
                  <CircularProgress size={18} />
                </InputAdornment>
              ) : null,
            },
            htmlInput: {
              maxLength: 9,
            },
          }}
        />
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.75, display: 'block' }}>
          Digite o CEP para preencher o endereço automaticamente.
        </Typography>
      </Box>

      <TextField
        name="recipientName"
        label={
          <span>
            Nome do Destinatário <span style={{ color: '#ef4444' }}>*</span>
          </span>
        }
        placeholder="Ex: João da Silva Sauro"
        value={formik.values.recipientName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        fullWidth
        variant="outlined"
        sx={addressFormInputStyle}
        error={formik.touched.recipientName && Boolean(formik.errors.recipientName)}
        helperText={formik.touched.recipientName && formik.errors.recipientName}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <User size={18} color="#64748b" />
              </InputAdornment>
            ),
          },
          htmlInput: {
            maxLength: 150,
          },
        }}
      />

      <TextField
        name="street"
        label={
          <span>
            Logradouro / Rua <span style={{ color: '#ef4444' }}>*</span>
          </span>
        }
        placeholder="Avenida Guilherme Ferreira"
        value={formik.values.street}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        fullWidth
        variant="outlined"
        sx={addressFormInputStyle}
        error={formik.touched.street && Boolean(formik.errors.street)}
        helperText={formik.touched.street && formik.errors.street}
        slotProps={{
          htmlInput: {
            maxLength: 160,
          },
        }}
      />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 5 }}>
          <TextField
            name="number"
            label={
              <span>
                Número <span style={{ color: '#ef4444' }}>*</span>
              </span>
            }
            placeholder="Ex: 123 ou S/N"
            value={formik.values.number}
            onChange={(e) => {
              const sanitized = e.target.value.replace(/['"`<>[\]\\]/g, '');
              formik.setFieldValue('number', sanitized);
            }}
            onBlur={formik.handleBlur}
            fullWidth
            variant="outlined"
            sx={addressFormInputStyle}
            error={formik.touched.number && Boolean(formik.errors.number)}
            helperText={formik.touched.number && formik.errors.number}
            slotProps={{
              htmlInput: {
                maxLength: 20,
              },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 7 }}>
          <TextField
            name="complement"
            label="Complemento (Opcional)"
            placeholder="Ex: Apto 102, Bloco B"
            value={formik.values.complement}
            onChange={(e) => {
              const sanitized = e.target.value.replace(/['"`<>[\]\\]/g, '');
              formik.setFieldValue('complement', sanitized);
            }}
            onBlur={formik.handleBlur}
            fullWidth
            variant="outlined"
            sx={addressFormInputStyle}
            error={formik.touched.complement && Boolean(formik.errors.complement)}
            helperText={formik.touched.complement && formik.errors.complement}
            slotProps={{
              htmlInput: {
                maxLength: 120,
              },
            }}
          />
        </Grid>
      </Grid>

      <TextField
        name="neighborhood"
        label={
          <span>
            Bairro <span style={{ color: '#ef4444' }}>*</span>
          </span>
        }
        placeholder="Centro"
        value={formik.values.neighborhood}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        fullWidth
        variant="outlined"
        sx={addressFormInputStyle}
        error={formik.touched.neighborhood && Boolean(formik.errors.neighborhood)}
        helperText={formik.touched.neighborhood && formik.errors.neighborhood}
        slotProps={{
          htmlInput: {
            maxLength: 100,
          },
        }}
      />

      <Grid container spacing={2}>
        <Grid size={{ xs: 8, sm: 8.5 }}>
          <TextField
            name="city"
            label={
              <span>
                Cidade <span style={{ color: '#ef4444' }}>*</span>
              </span>
            }
            placeholder="Uberaba"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            variant="outlined"
            sx={addressFormInputStyle}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
            slotProps={{
              htmlInput: {
                maxLength: 80,
              },
            }}
          />
        </Grid>
        <Grid size={{ xs: 4, sm: 3.5 }}>
          <TextField
            select
            name="state"
            label={
              <span>
                UF <span style={{ color: '#ef4444' }}>*</span>
              </span>
            }
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            variant="outlined"
            sx={addressFormInputStyle}
            error={formik.touched.state && Boolean(formik.errors.state)}
            helperText={formik.touched.state && formik.errors.state}
          >
            {BRAZILIAN_UFS.map((uf) => (
              <MenuItem key={uf} value={uf}>
                {uf}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <Box>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 600, color: 'text.primary', mb: 1.25, fontSize: '0.9rem' }}
        >
          Tipo de endereço
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
          {ADDRESS_TYPES.map((type) => {
            const IconComp = type.icon;
            const isSelected = formik.values.label === type.value;
            return (
              <Button
                key={type.value}
                variant="outlined"
                onClick={() => formik.setFieldValue('label', type.value)}
                startIcon={<IconComp size={18} />}
                sx={addressTypeButtonStyle(isSelected)}
              >
                {type.label}
              </Button>
            );
          })}
        </Box>
      </Box>

      <TextField
        name="referencePoint"
        label="Ponto de Referência (Opcional)"
        placeholder="Ex: Próximo à praça central ou padaria"
        value={formik.values.referencePoint}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        fullWidth
        variant="outlined"
        sx={addressFormInputStyle}
        error={formik.touched.referencePoint && Boolean(formik.errors.referencePoint)}
        helperText={formik.touched.referencePoint && formik.errors.referencePoint}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Navigation size={18} color="#64748b" style={{ transform: 'rotate(45deg)' }} />
              </InputAdornment>
            ),
          },
          htmlInput: {
            maxLength: 150,
          },
        }}
      />

      <Box sx={{ mt: 0.25 }}>
        <FormControlLabel
          sx={{ ml: -0.75, my: 0 }}
          control={
            <Checkbox
              checked={formik.values.isDefault}
              onChange={(e) => formik.setFieldValue('isDefault', e.target.checked)}
              color="primary"
              sx={{
                p: 0.75,
                '&.Mui-checked': {
                  color: '#2563eb',
                },
              }}
            />
          }
          label={
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', ml: 0.5 }}>
              Tornar este meu endereço principal
            </Typography>
          }
        />
      </Box>
    </Box>
  );
};
