import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import RickAndMortyUSAAdapter from '../../src/business/adapters/rickAndMortyUSAAdapter';
import RickAndMortyUSA from '../../src/business/integrations/rickAndMortyUSA';

describe('#RickAndMortyUSAAdapter', () => {
  beforeEach(() => jest.clearAllMocks());
  test('#getCharacters should be and adapter for RickAndMortyUSA.getCharactersJSON', async () => {
    const usaIntegration = jest
      .spyOn(RickAndMortyUSA, RickAndMortyUSA.getCharactersFromXML.name)
      .mockReturnValue([]);

    const result = await RickAndMortyUSAAdapter.getCharacters();
    expect(result).toEqual([]);
    expect(usaIntegration).toHaveBeenCalled();
    expect(usaIntegration).toBeCalledTimes(1);
  });
});
