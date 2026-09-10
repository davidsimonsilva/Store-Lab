import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Chip,
  Divider,
} from '@mui/material';
import { CustomAlert } from '../../components/ui/CustomAlert';
import {
  Search,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
} from 'lucide-react';
import { PageContainer } from '../../components/ui/PageContainer';
import { useTrackingSimulation } from '../../hooks/useTrackingSimulation';
import { useAuth } from '../../context/AuthContext';
import {
  trackingHeaderBoxStyle,
  trackingTitleStyle,
  trackingSubtitleStyle,
  trackingSearchCardStyle,
  trackingFormBoxStyle,
  trackingTextFieldStyle,
  trackingSubmitButtonStyle,
  trackingResultCardStyle,
  trackingHeaderMetaRowStyle,
  trackingHeaderBadgeStyle,
  trackingTableStyle,
  trackingTableHeaderStyle,
  trackingTableCellStyle,
  trackingTableRowStyle,
  trackingStatusChipDeliveredStyle,
  trackingStatusChipShippedStyle,
  trackingInputSearchIconStyle,
  trackingDestinationColumnStyle,
  trackingMetaItemStyle,
  trackingPendingChipStyle,
  trackingMobileStepCardStyle,
} from './TrackingPage.styles';

const searchSchema = Yup.object().shape({
  code: Yup.string()
    .trim()
    .required('Insira um código de rastreio válido'),
});

export const TrackingPage: React.FC = () => {
  const [activeCode, setActiveCode] = useState<string>('');
  const { user } = useAuth();

  const { trackingInfo, hasSearched } = useTrackingSimulation({
    trackingQuery: activeCode,
    currentUserId: user?.isLoggedIn ? user.id : undefined,
    intervalMs: 10000,
  });

  const formik = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema: searchSchema,
    onSubmit: (values) => {
      const cleanCode = values.code.trim();
      setActiveCode(cleanCode);
    },
  });

  return (
    <PageContainer maxWidth="lg" py={{ xs: 3, md: 5 }}>

      <Box sx={trackingHeaderBoxStyle}>
        <Typography variant="h4" component="h1" sx={trackingTitleStyle}>
          Rastreio de Encomendas
        </Typography>
        <Typography variant="body1" sx={trackingSubtitleStyle}>
          Acompanhe em tempo real o avanço logístico e as etapas de entrega do seu pacote.
        </Typography>
      </Box>

      <Paper sx={trackingSearchCardStyle}>
        <Box component="form" onSubmit={formik.handleSubmit} sx={trackingFormBoxStyle}>
          <TextField
            fullWidth
            id="tracking-input-code"
            name="code"
            placeholder="Insira seu código de rastreio"
            value={formik.values.code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.code && Boolean(formik.errors.code)}
            helperText={formik.touched.code && formik.errors.code}
            sx={trackingTextFieldStyle}
            slotProps={{
              input: {
                startAdornment: <Search size={20} style={trackingInputSearchIconStyle} />,
              },
            }}
          />

          <Button
            id="tracking-submit-btn"
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<Truck size={18} />}
            sx={trackingSubmitButtonStyle}
          >
            Rastrear
          </Button>
        </Box>
      </Paper>

      {trackingInfo ? (
        <Box>

          <Paper sx={trackingResultCardStyle}>
            <Box sx={trackingHeaderMetaRowStyle}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                <Typography variant="h6" sx={trackingHeaderBadgeStyle}>
                  Código: {trackingInfo.trackingCode}
                </Typography>
                <Chip
                  icon={trackingInfo.isDelivered ? <CheckCircle2 size={13} /> : <Truck size={13} />}
                  label={trackingInfo.isDelivered ? 'Objeto Entregue' : 'Em Transporte'}
                  size="small"
                  sx={trackingInfo.isDelivered ? trackingStatusChipDeliveredStyle : trackingStatusChipShippedStyle}
                />
              </Box>

              <Box sx={trackingDestinationColumnStyle}>
                <Box sx={trackingMetaItemStyle}>
                  <MapPin size={16} color="#2563eb" />
                  <Typography variant="body2" fontWeight={600}>
                    Destino: {trackingInfo.destinationCityState}
                  </Typography>
                </Box>
                <Box sx={trackingMetaItemStyle}>
                  <Calendar size={16} color="#2563eb" />
                  <Typography variant="body2" fontWeight={600}>
                    {trackingInfo.estimatedDelivery}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="subtitle1" fontWeight={700} color="text.primary" mb={2}>
              Extrato Logístico de Entrega
            </Typography>

            <Box sx={{ display: { xs: 'none', md: 'block' }, overflowX: 'auto' }}>
              <Box component="table" sx={trackingTableStyle}>
                <Box component="thead">
                  <Box component="tr">
                    <Box component="th" sx={trackingTableHeaderStyle}>Data / Horário</Box>
                    <Box component="th" sx={trackingTableHeaderStyle}>Localidade</Box>
                    <Box component="th" sx={trackingTableHeaderStyle}>Status da Encomenda</Box>
                    <Box component="th" sx={{ ...trackingTableHeaderStyle, textAlign: 'center' }}>Situação</Box>
                  </Box>
                </Box>
                <Box component="tbody">
                  {trackingInfo.courierSteps.map((step) => (
                    <Box key={step.stepNumber} component="tr" sx={trackingTableRowStyle(step.completed, step.active)}>
                      <Box component="td" sx={trackingTableCellStyle}>
                        <Typography variant="body2" fontWeight={step.completed || step.active ? 700 : 500}>
                          {step.timestamp}
                        </Typography>
                      </Box>

                      <Box component="td" sx={trackingTableCellStyle}>
                        <Typography variant="body2" color="text.secondary">
                          {step.location}
                        </Typography>
                      </Box>

                      <Box component="td" sx={trackingTableCellStyle}>
                        <Typography
                          variant="body2"
                          fontWeight={step.completed || step.active ? 700 : 500}
                          color={step.completed ? 'success.main' : step.active ? 'primary.main' : 'text.secondary'}
                        >
                          {step.label}
                        </Typography>
                      </Box>

                      <Box component="td" sx={{ ...trackingTableCellStyle, textAlign: 'center' }}>
                        {step.completed ? (
                          <Chip
                            icon={<CheckCircle2 size={13} color="#15803d" />}
                            label="Concluído"
                            size="small"
                            sx={trackingStatusChipDeliveredStyle}
                          />
                        ) : step.active ? (
                          <Chip
                            icon={<Clock size={13} color="#1d4ed8" />}
                            label="Em Andamento"
                            size="small"
                            sx={trackingStatusChipShippedStyle}
                          />
                        ) : (
                          <Chip
                            label="Pendente"
                            size="small"
                            variant="outlined"
                            sx={trackingPendingChipStyle}
                          />
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 2 }}>
              {trackingInfo.courierSteps.map((step) => (
                <Paper
                  key={step.stepNumber}
                  elevation={0}
                  sx={trackingMobileStepCardStyle(step.completed, step.active)}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1, gap: 1 }}>
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      fontSize="0.95rem"
                      color={step.completed ? 'success.main' : step.active ? 'primary.main' : 'text.primary'}
                    >
                      {step.label}
                    </Typography>

                    {step.completed ? (
                      <Chip
                        icon={<CheckCircle2 size={13} color="#15803d" />}
                        label="Concluído"
                        size="small"
                        sx={trackingStatusChipDeliveredStyle}
                      />
                    ) : step.active ? (
                      <Chip
                        icon={<Clock size={13} color="#1d4ed8" />}
                        label="Em Andamento"
                        size="small"
                        sx={trackingStatusChipShippedStyle}
                      />
                    ) : (
                      <Chip
                        label="Pendente"
                        size="small"
                        variant="outlined"
                        sx={trackingPendingChipStyle}
                      />
                    )}
                  </Box>

                  <Divider sx={{ my: 1.5 }} />

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <MapPin size={14} color="#64748b" />
                      <Typography variant="body2" color="text.secondary" fontWeight={500}>
                        {step.location}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Clock size={14} color="#64748b" />
                      <Typography variant="body2" fontWeight={600} color="text.primary">
                        {step.timestamp}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Paper>
        </Box>
      ) : hasSearched && activeCode ? (
        <CustomAlert severity="warning" sx={{ borderRadius: '12px', py: 2 }}>
          Código de rastreio não encontrado. Verifique o código informado (ex: SL123456789BR) e certifique-se de que o pedido já se encontra em fase de transporte.
        </CustomAlert>
      ) : null}
    </PageContainer>
  );
};

export default TrackingPage;
