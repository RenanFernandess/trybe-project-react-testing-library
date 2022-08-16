import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Testa o componente <NotFound.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested not found',
    () => {
      renderWithRouter(<NotFound />);

      const titleText = /^Page requested not found/i;
      const title = screen.getByRole('heading', { level: 2 });

      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent(titleText);
    });

  // it('', () => {
  //   renderWithRouter(<NotFound />);

  //   const imageAlt = /Pikachu crying because the page requested was not found/i;
  //   const image = screen.getByRole('img', { name: imageAlt });
  // });
});
