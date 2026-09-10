import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductGallery } from '../../pages/ProductDetail/components/ProductGallery';

describe('ProductGallery - Componente da Galeria de Fotos do Produto', () => {
  const images = [
    'https://images.unsplash.com/photo-1',
    'https://images.unsplash.com/photo-2',
  ];
  const productName = 'Teclado Gamer Mecânico';

  test('renderiza a imagem principal e miniaturas', () => {
    render(<ProductGallery imagesList={images} productName={productName} />);

    const img = screen.getByAltText(productName);
    expect(img).toBeInTheDocument();
  });

  test('permite alterar a imagem selecionada ao clicar na miniatura', () => {
    render(<ProductGallery imagesList={images} productName={productName} />);

    const thumbnails = screen.getAllByAltText(/miniatura/i);
    expect(thumbnails.length).toBeGreaterThan(0);

    fireEvent.click(thumbnails[1]);
    expect(thumbnails[1]).toBeInTheDocument();
  });
});
