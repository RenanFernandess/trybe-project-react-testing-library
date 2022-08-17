import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../pages';
import pokemons from '../data';

describe('Testa o componente <Pokedex.js />', () => {
  it('Testa se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const titleText = /^Encountered pokémons$/i;
    const title = screen.getByRole('heading', { level: 2, name: titleText });

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(titleText);
  });

  describe(`Testa se é exibido o próximo pokémon da lista quando o botão
  Próximo pokémon é clicado`, () => {
    it('O botão deve conter o texto Próximo pokémon', () => {
      renderWithRouter(<App />);

      const buttonText = /^Próximo pokémon$/i;
      const buttonNext = screen.getByRole('button', { name: buttonText });

      expect(buttonNext).toBeInTheDocument();
      expect(buttonNext).toHaveTextContent(buttonText);
    });

    it(`Os próximos pokémons da lista devem ser mostrados, um a um,
    ao clicar sucessivamente no botão`, () => {
      renderWithRouter(<App />);

      const nameTestId = 'pokemon-name';
      const buttonText = /^Próximo pokémon$/i;
      const buttonNext = screen.getByRole('button', { name: buttonText });
      const firstPokemonCard = screen.getAllByTestId(nameTestId);
      const [pikachu] = firstPokemonCard;

      expect(firstPokemonCard).toHaveLength(1);
      expect(pikachu).toHaveTextContent('Pikachu');

      userEvent.click(buttonNext);

      const secondPokemonCard = screen.getAllByTestId(nameTestId);
      const [charmander] = secondPokemonCard;

      expect(secondPokemonCard).toHaveLength(1);
      expect(charmander).toHaveTextContent('Charmander');

      userEvent.click(buttonNext);

      const thirdPokemonCard = screen.getAllByTestId(nameTestId);
      const [caterpie] = thirdPokemonCard;

      expect(thirdPokemonCard).toHaveLength(1);
      expect(caterpie).toHaveTextContent('Caterpie');
    });

    it(`O primeiro pokémon da lista deve ser mostrado ao clicar no botão,
    se estiver no último pokémon da lista`, () => {
      const FavoritesPokemon = {
        4: false,
        10: false,
        23: false,
        25: false,
        65: false,
        78: false,
        143: false,
        148: false,
        151: false,
      };
      const twoPokemons = pokemons.slice(0, 2);
      renderWithRouter(
        <Pokedex
          isPokemonFavoriteById={ FavoritesPokemon }
          pokemons={ twoPokemons }
        />,
      );

      const nameTestId = 'pokemon-name';
      const buttonText = /^Próximo pokémon$/i;
      const buttonNext = screen.getByRole('button', { name: buttonText });
      const firstPokemonCard = screen.getAllByTestId(nameTestId);
      const [pikachu] = firstPokemonCard;

      expect(firstPokemonCard).toHaveLength(1);
      expect(pikachu).toHaveTextContent('Pikachu');

      userEvent.click(buttonNext);

      const secondPokemonCard = screen.getAllByTestId(nameTestId);
      const [charmander] = secondPokemonCard;

      expect(secondPokemonCard).toHaveLength(1);
      expect(charmander).toHaveTextContent('Charmander');

      userEvent.click(buttonNext);

      const startPokemonCard = screen.getAllByTestId(nameTestId);
      const [startpikachu] = startPokemonCard;

      expect(startPokemonCard).toHaveLength(1);
      expect(startpikachu).toHaveTextContent('Pikachu');
    });
  });

  it('Testa se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemonCard = screen.getAllByTestId('pokemon-name');

    expect(pokemonCard).toHaveLength(1);
  });
});
