import React from 'react';
import { Box, Grid, Typography, Card } from '@mui/material';
import { Product } from '../../../types';
import { getBasicDescription, getTechnicalSpecifications } from '../../../mocks/specsMock';
import { specCardStyle, basicDescriptionTextStyle } from '../ProductDetail.styles';

interface ProductSpecsCardsProps {
  product: Product;
}

export const ProductSpecsCards: React.FC<ProductSpecsCardsProps> = ({ product }) => {
  const techSpecs = getTechnicalSpecifications(product);

  return (
    <Grid container spacing={3.5} sx={{ mb: 6 }}>

      <Grid size={{ xs: 12, md: 6 }}>
        <Card elevation={0} sx={specCardStyle}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 800,
              color: '#0f172a',
              mb: 2,
              fontSize: '1.25rem',
            }}
          >
            Descrição Básica do Produto
          </Typography>
          {getBasicDescription(product)
            .split('\n\n')
            .map((paragraph, index) => (
              <Typography key={index} variant="body2" sx={basicDescriptionTextStyle}>
                {paragraph}
              </Typography>
            ))}
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Card elevation={0} sx={specCardStyle}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 800,
              color: '#0f172a',
              mb: 2,
              fontSize: '1.25rem',
            }}
          >
            Descrição Técnica do Produto
          </Typography>

          <Box sx={{ border: '1px solid #f1f5f9', borderRadius: '12px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <tbody>
                {techSpecs.map((spec, i) => (
                  <tr
                    key={i}
                    style={{
                      backgroundColor: i % 2 === 0 ? '#f8fafc' : '#ffffff',
                      borderBottom: '1px solid #f1f5f9',
                    }}
                  >
                    <th
                      style={{
                        padding: '10px 14px',
                        fontWeight: 600,
                        color: '#64748b',
                        width: '40%',
                      }}
                    >
                      {spec.label}
                    </th>
                    <td style={{ padding: '10px 14px', fontWeight: 500, color: '#0f172a' }}>
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};
