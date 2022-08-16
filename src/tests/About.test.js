import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import App from '../App';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <About.js />.', () => {
  it('se a página contém as informações sobre a Pokédex', () => {
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

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const titleText = /^About Pokédex/i;
    const title = screen.getByRole('heading', { level: 2, name: titleText });

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(titleText);
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const paragraphsText = /Pokémons/i;
    const paragraphs = screen.getAllByText(paragraphsText);
    const numberOfParagraphs = 2;

    expect(paragraphs).toHaveLength(numberOfParagraphs);
  });
});
