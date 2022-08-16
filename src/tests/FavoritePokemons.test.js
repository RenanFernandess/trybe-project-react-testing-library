import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../pages/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it(`Teste se é exibida na tela a mensagem No favorite pokemon found,
  caso a pessoa não tenha pokémons favoritos`,
  () => {
    const noFavorites = [];

    renderWithRouter(<FavoritePokemons pokemons={ noFavorites } />);

    const textMesMessage = /^No favorite pokemon found$/i;
    const message = screen.getByText(textMesMessage, { selector: 'p' });

    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent(textMesMessage);
  });
});
