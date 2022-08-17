import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';
import App from '../App';

const [pokemon] = pokemons;
const nameTestId = 'pokemon-name';
const typeTestId = 'pokemon-type';
const weightTestId = 'pokemon-weight';
const imageAlt = /Pikachu sprite/i;
const imageSrc = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
const linkText = /^More details$/i;
const linkUrl = '/pokemons/25';
const pokemonDetailsTitleText = /Pikachu Details/i;
const pokemonDetailsPathName = '/pokemons/25';
const favoriteImageAlt = /Pikachu is marked as favorite/i;
const favoriteImageSrc = '/star-icon.svg';

describe('Testa o componente <Pokemon.js />', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon',
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

  it(`Testa se o card do pokémon indicado na Pokédex contém
    um link de navegação para exibir detalhes deste pokémon.
    O link deve possuir a URL /pokemons/<id>, onde <id> é o id do pokémon exibido`,
  () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);

    const link = screen.getByRole('link', { name: linkText });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', linkUrl);
  });

  it(`Testa se ao clicar no link de navegação do pokémon,
  é feito o redirecionamento da aplicação para a página de detalhes de pokémon`,
  () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: linkText });

    userEvent.click(link);

    const pokemonDetailsTitle = screen.getByRole(
      'heading',
      { level: 2, name: pokemonDetailsTitleText },
    );

    expect(pokemonDetailsTitle).toBeInTheDocument();
  });

  it(`Teste também se a URL exibida no navegador muda para /pokemon/<id>,
  onde <id> é o id do pokémon cujos detalhes se deseja ver`,
  () => {
    const { history } = renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: linkText });

    userEvent.click(link);

    const { location: { pathname } } = history;

    expect(pathname).toBe(pokemonDetailsPathName);
  });

  it('Testa se existe um ícone de estrela nos pokémons favoritados',
    () => {
      renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);

      const favoriteImage = screen.getByRole('img', { name: favoriteImageAlt });

      expect(favoriteImage).toBeInTheDocument();
      expect(favoriteImage).toHaveAttribute('src', favoriteImageSrc);
    });
});
