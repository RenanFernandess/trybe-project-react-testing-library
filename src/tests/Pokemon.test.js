import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
// import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';

const [pokemon] = pokemons;
const nameTestId = 'pokemon-name';
const typeTestId = 'pokemon-type';
const weightTestId = 'pokemon-weight';
const imageAlt = /Pikachu sprite/i;
const imageSrc = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon',
    () => {
      renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);

      const pokemonName = screen.getByTestId(nameTestId);
      const pokemonType = screen.getByTestId(typeTestId);
      const pokemonWeight = screen.getByTestId(weightTestId);
      const pokemonImage = screen.getByRole('img', { name: imageAlt });

      expect(pokemonName).toBeInTheDocument();
      expect(pokemonType).toBeInTheDocument();
      expect(pokemonWeight).toBeInTheDocument();
      expect(pokemonImage).toBeInTheDocument();
      expect(pokemonName).toHaveTextContent(/^Pikachu$/i);
      expect(pokemonType).toHaveTextContent(/^Electric$/i);
      expect(pokemonWeight).toHaveTextContent(/Average weight: 6.0 kg/i);
      expect(pokemonImage).toHaveAttribute('src', imageSrc);
    });
});
