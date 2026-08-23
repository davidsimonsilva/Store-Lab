import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductImage } from '../../../components/ui/ProductImage';

describe('ProductImage component', () => {
  test('renders image with initial src and alt text', () => {
    render(<ProductImage src="https://example.com/valid.jpg" alt="Produto Teste" />);
    const img = screen.getByAltText('Produto Teste') as HTMLImageElement;
    expect(img).toBeDefined();
    expect(img.src).toBe('https://example.com/valid.jpg');
  });

  test('switches to fallback src on image load error', () => {
    render(<ProductImage src="https://example.com/broken.jpg" alt="Produto Quebrado" />);
    const img = screen.getByAltText('Produto Quebrado') as HTMLImageElement;
    
    fireEvent.error(img);
    
    expect(img.src).toContain('data:image/svg+xml');
  });
});
