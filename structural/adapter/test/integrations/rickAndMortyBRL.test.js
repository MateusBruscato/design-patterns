import { expect, describe, test, jest, beforeEach } from '@jest/globals';
import fs from 'fs/promises';
import Character from '../../src/entities/character.js';
import RickAndMortyBRL from '../../src/business/integrations/rickAndMortyBRL.js';
import axios from 'axios';

describe('#RickAndMortyBRL', () => {
  beforeEach(() => jest.clearAllMocks());

  test('#getCharactersJSON should return a list of a Character Entity', async () => {
    const rawData = await fs.readFile('./test/mocks/characters.json');
    const jsonData = JSON.parse(rawData);
    jest.spyOn(axios, 'get').mockResolvedValue({ data: jsonData });

    const expected = jsonData.results.map(
      (character) => new Character(character)
    );
    const result = await RickAndMortyBRL.getCharactersFromJSON();
    expect(result).toStrictEqual(expected);
  });
  test('#getCharactersJSON should return an empty list if the API returns nothing', async () => {
    const rawData = await fs.readFile('./test/mocks/characters-empty.json');
    const jsonData = JSON.parse(rawData);
    jest.spyOn(axios, 'get').mockResolvedValue({ data: jsonData });

    const expected = jsonData.results.map(
      (character) => new Character(character)
    );
    const result = await RickAndMortyBRL.getCharactersFromJSON();
    expect(result).toStrictEqual(expected);
  });
});
