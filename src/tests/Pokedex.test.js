import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

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
  });

  it('Testa se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemonCard = screen.getAllByTestId('pokemon-name');

    expect(pokemonCard).toHaveLength(1);
  });
});
