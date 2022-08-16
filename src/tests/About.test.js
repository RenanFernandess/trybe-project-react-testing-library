import React from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <About.js />.', () => {
  it('Testa se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const paragraphOneText = /^This application simulates/i;
    const paragraphTwoText = /^One can filter Pokémons by type, and see more details/i;
    const paragraphOne = screen.getByText(paragraphOneText);
    const paragraphTwo = screen.getByText(paragraphTwoText);

    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphOne).toHaveTextContent(paragraphOneText);
    expect(paragraphTwo).toBeInTheDocument();
    expect(paragraphTwo).toHaveTextContent(paragraphTwoText);
  });

  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const titleText = /^About Pokédex/i;
    const title = screen.getByRole('heading', { level: 2, name: titleText });

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(titleText);
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const paragraphsText = /Pokémons/i;
    const paragraphs = screen.getAllByText(paragraphsText);
    const numberOfParagraphs = 2;

    expect(paragraphs).toHaveLength(numberOfParagraphs);
  });

  it('Testa se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const imageSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imageAlt = /^Pokédex$/i;
    const image = screen.getByRole('img', { name: imageAlt });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAccessibleName(imageAlt);
    expect(image).toHaveAttribute('src', imageSrc);
  });
});
