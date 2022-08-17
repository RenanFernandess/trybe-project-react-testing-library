import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const URL = '/pokemons/25';
const pokemonDetailsTitleText = /^Pikachu Details$/i;
const titleSummaryText = /^summary$/i;
const pokemonSummaryText = /^This intelligent Pokémon roasts hard berries with/i;
const linkText = /^More details$/i;
const gameLocationsTitleText = /^Game Locations of Pikachu$/i;
const pokemonLocationImageAlt = /^Pikachu location$/i;
const locationImageOneSrc = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
const locationImageTwoSrc = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
const checkboxText = /^Pokémon favoritado\?$/i;

describe('Testa o componente <PokemonDetails.js />', () => {
  it('Testa se as informações detalhadas do pokémon selecionado são mostradas na tela',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(URL);

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

  it(`Teste se existe na página uma seção com os mapas contendo
    as localizações do pokémon`,
  () => {
    const { history } = renderWithRouter(<App />);
    history.push(URL);

    const gamesLocationsTitle = screen.getByRole(
      'heading',
      { level: 2, name: gameLocationsTitleText },
    );
    const locationImage = screen.getAllByRole('img', { name: pokemonLocationImageAlt });
    const [locationImageOne, locationImageTwo] = locationImage;
    const locationNameOne = screen.getByText('Kanto Viridian Forest', { selector: 'em' });
    const locationNameTwo = screen.getByText('Kanto Power Plant', { selector: 'em' });

    expect(locationImage).toHaveLength(2);
    expect(locationNameOne).toBeInTheDocument();
    expect(locationNameTwo).toBeInTheDocument();
    expect(locationImageOne).toHaveAttribute('src', locationImageOneSrc);
    expect(locationImageTwo).toHaveAttribute('src', locationImageTwoSrc);
    expect(gamesLocationsTitle).toBeInTheDocument();
  });

  it('Testa se o usuário pode favoritar um pokémon através da página de detalhes',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(URL);

      const checkbox = screen.getByRole('checkbox', { name: checkboxText });

      expect(checkbox).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();

      userEvent.click(checkbox);
      expect(checkbox).toBeChecked();

      userEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });
});
