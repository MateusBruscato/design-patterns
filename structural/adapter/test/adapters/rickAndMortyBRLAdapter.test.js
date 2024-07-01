import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import RickAndMortyBRLAdapter from '../../src/business/adapters/rickAndMortyBRLAdapter';
import RickAndMortyBRL from '../../src/business/integrations/rickAndMortyBRL';

describe('#RickAndMortyBRLAdapter', () => {
  beforeEach(() => jest.clearAllMocks());
  test('#getCharacters should be and adapter for RickAndMortyBRL.getCharactersJSON', async () => {
    const brlIntegration = jest
      .spyOn(RickAndMortyBRL, RickAndMortyBRL.getCharactersFromJSON.name)
      .mockReturnValue([]);

    const result = await RickAndMortyBRLAdapter.getCharacters();
    expect(result).toEqual([]);
    expect(brlIntegration).toHaveBeenCalled();
    expect(brlIntegration).toBeCalledTimes(1);
  });
});
