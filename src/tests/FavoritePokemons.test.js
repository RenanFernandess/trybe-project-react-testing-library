import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../pages/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Testa o componente <FavoritePokemons.js />', () => {
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

  it('Testa se são exibidos todos os cards de pokémons favoritados', () => {
    const INDEX = 3;
    const Favorites = pokemons.slice(0, INDEX);

    renderWithRouter(<FavoritePokemons pokemons={ Favorites } />);

    const favoritesCard = screen.getAllByTestId('pokemon-name');

    const [pikachu, charmander, caterpie] = favoritesCard;
    const favoritesNumber = 3;

    expect(favoritesCard).toHaveLength(favoritesNumber);
    expect(pikachu).toHaveTextContent('Pikachu');
    expect(charmander).toHaveTextContent('Charmander');
    expect(caterpie).toHaveTextContent('Caterpie');
  });
});
