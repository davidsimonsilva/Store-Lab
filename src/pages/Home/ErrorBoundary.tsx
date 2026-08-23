import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button } from '@mui/material';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Box 
          sx={{ 
            p: 3, 
            textAlign: 'center', 
            bgcolor: '#fef2f2', 
            border: '1px solid #fecaca',
            borderRadius: '12px',
            my: 2
          }}
        >
          <Typography variant="h6" sx={{ color: '#dc2626', fontWeight: 700, mb: 1 }}>
            {this.props.fallbackTitle || 'Ocorreu um problema ao carregar este bloco.'}
          </Typography>
          <Typography variant="body2" sx={{ color: '#7f1d1d', mb: 2 }}>
            Não foi possível exibir esta seção no momento.
          </Typography>
          <Button 
            variant="outlined" 
            color="error" 
            onClick={() => this.setState({ hasError: false })}
            sx={{ borderRadius: '20px', textTransform: 'none', fontWeight: 600 }}
          >
            Tentar Novamente
          </Button>
        </Box>
      );
    }
    return this.props.children;
  }
}
