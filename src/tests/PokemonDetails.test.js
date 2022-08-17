import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pokemonDetailsTitleText = /Pikachu Details/i;
const titleSummaryText = /^summary$/i;
const pokemonSummaryText = /^This intelligent Pokémon roasts hard berries with/i;
const linkText = /^More details$/i;

describe('Testa o componente <PokemonDetails.js />', () => {
  it('Testa se as informações detalhadas do pokémon selecionado são mostradas na tela',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/pokemons/25');

      const pokemonDetailsTitle = screen.getByRole(
        'heading',
        { level: 2, name: pokemonDetailsTitleText },
      );
      const summary = screen.getByRole('heading', { level: 2, name: titleSummaryText });
      const pokemonSummary = screen.getByText(pokemonSummaryText, { selector: 'p' });
      const link = screen.queryByRole('link', { name: linkText });

      expect(link).not.toBeInTheDocument();
      expect(pokemonDetailsTitle).toBeInTheDocument();
      expect(summary).toBeInTheDocument();
      expect(pokemonSummary).toBeInTheDocument();
    });
});
