import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <App.js />', () => {
  describe('Testa se o topo da aplicação contém um conjunto fixo de links de navegação',
    () => {
      it('Verifica se possui o link Home', () => {
        renderWithRouter(<App />);

        const homeText = /^Home$/i;
        const home = screen.getByText(homeText);

        expect(home).toBeInTheDocument();
        expect(home).toHaveTextContent(homeText);
      });

      it('Verifica se possui o link About', () => {
        renderWithRouter(<App />);

        const aboutText = /^About$/i;
        const about = screen.getByText(aboutText);

        expect(about).toBeInTheDocument();
        expect(about).toHaveTextContent(aboutText);
      });

      it('Verifica se possui o link Favorite Pokémons', () => {
        renderWithRouter(<App />);

        const favoriteText = /^Favorite Pokémons$/i;
        const favoritePokemons = screen.getByText(favoriteText);

        expect(favoritePokemons).toBeInTheDocument();
        expect(favoritePokemons).toHaveTextContent(favoriteText);
      });
    });

  it(`Testa se a aplicação é redirecionada para a página inicial,
  na URL / ao clicar no link Home da barra de navegação`,
  () => {
    const { history } = renderWithRouter(<App />);

    const aboutPathName = '/about';
    history.push(aboutPathName);

    const { location: { pathname } } = history;

    expect(pathname).toBe(aboutPathName);

    const homeText = /^Home$/i;
    const home = screen.getByText(homeText);

    userEvent.click(home);

    const { location: { pathname: path } } = history;
    const homePathName = '/';

    expect(path).toBe(homePathName);
  });

  it(`Testa se a aplicação é redirecionada para a página de About,
  na URL /about, ao clicar no link About da barra de navegação`,
  () => {
    const { history } = renderWithRouter(<App />);

    const aboutText = /^About$/i;
    const about = screen.getByText(aboutText);

    userEvent.click(about);

    const { location: { pathname } } = history;
    const aboutPathName = '/about';

    expect(pathname).toBe(aboutPathName);
  });

  it(`Testa se a aplicação é redirecionada para a página de Pokémons Favoritados,
  na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação`,
  () => {
    const { history } = renderWithRouter(<App />);

    const favoriteText = /^Favorite Pokémons$/i;
    const favoritePokemons = screen.getByText(favoriteText);

    userEvent.click(favoritePokemons);

    const { location: { pathname } } = history;
    const favoritePathName = '/favorites';

    expect(pathname).toBe(favoritePathName);
  });

  it(`Testa se a aplicação é redirecionada para
  a página Not Found ao entrar em uma URL desconhecida`,
  () => {
    const { history } = renderWithRouter(<App />);
    history.push('/hahahuhuee');

    const imageAlt = /Pikachu crying because the page requested was not found/i;
    const titleText = /^Page requested not found/i;
    const title = screen.getByRole('heading', { level: 2 });
    const image = screen.getByRole('img', { name: imageAlt });

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(titleText);
    expect(image).toBeInTheDocument();
  });
});
