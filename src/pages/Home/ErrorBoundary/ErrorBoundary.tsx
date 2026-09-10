import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button } from '@mui/material';
import {
  errorBoundaryBoxStyle,
  errorBoundaryTitleStyle,
  errorBoundarySubtitleStyle,
  errorBoundaryButtonStyle,
} from './ErrorBoundary.styles';

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
        <Box sx={errorBoundaryBoxStyle}>
          <Typography variant="h6" sx={errorBoundaryTitleStyle}>
            {this.props.fallbackTitle || 'Ocorreu um problema ao carregar este bloco.'}
          </Typography>
          <Typography variant="body2" sx={errorBoundarySubtitleStyle}>
            Não foi possível exibir esta seção no momento.
          </Typography>
          <Button 
            variant="outlined" 
            color="error" 
            onClick={() => this.setState({ hasError: false })}
            sx={errorBoundaryButtonStyle}
          >
            Tentar Novamente
          </Button>
        </Box>
      );
    }
    return this.props.children;
  }
}
