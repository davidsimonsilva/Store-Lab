import React from 'react';
import { Box, Card, Typography, Table, TableBody, TableCell, TableRow, TableContainer, Paper } from '@mui/material';
import { Product } from '../../types';
import { getBasicDescription, getTechnicalSpecifications } from '../../mocks/specsMock';
import {
  specsGridStyle,
  specsCardStyle,
  specsTitleStyle,
  specsTextStyle,
} from './TechnicalSpecs.styles';

interface TechnicalSpecsProps {
  product: Product;
}

export const TechnicalSpecs: React.FC<TechnicalSpecsProps> = ({ product }) => {
  return (
    <Box sx={specsGridStyle}>
      <Card elevation={0} sx={specsCardStyle}>
        <Typography variant="h5" sx={specsTitleStyle}>
          Descrição Básica do Produto
        </Typography>
        <Typography variant="body1" sx={specsTextStyle}>
          {getBasicDescription(product)}
        </Typography>
      </Card>

      <Card elevation={0} sx={specsCardStyle}>
        <Typography variant="h5" sx={specsTitleStyle}>
          Descrição Técnica do Produto
        </Typography>
        
        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '12px', overflow: 'hidden' }}>
          <Table size="small">
            <TableBody>
              {getTechnicalSpecifications(product).map((spec, i) => (
                <TableRow 
                  key={i} 
                  sx={{ bgcolor: i % 2 === 0 ? 'action.hover' : 'background.paper' }}
                >
                  <TableCell component="th" scope="row" sx={{ fontWeight: 700, color: 'text.primary', borderBottom: i === getTechnicalSpecifications(product).length - 1 ? 'none' : undefined, py: 1.5 }}>
                    {spec.label}
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary', borderBottom: i === getTechnicalSpecifications(product).length - 1 ? 'none' : undefined, py: 1.5 }}>
                    {spec.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

