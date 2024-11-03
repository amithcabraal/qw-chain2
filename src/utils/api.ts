const DATAMUSE_API = 'https://api.datamuse.com/words';
const DICTIONARY_API = 'https://api.dictionaryapi.dev/api/v2/entries/en';

export interface DictionaryResponse {
  word: string;
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
    }[];
  }[];
}

export const fetchWordData = async (word: string) => {
  try {
    // Get dictionary definition
    const definitionResponse = await fetch(`${DICTIONARY_API}/${word}`);
    if (!definitionResponse.ok) {
      throw new Error('Word not found in dictionary');
    }
    const definitionData: DictionaryResponse[] = await definitionResponse.json();
    const definition = definitionData[0]?.meanings[0]?.definitions[0]?.definition || 'Definition not found';

    // Get synonyms
    const synonymResponse = await fetch(
      `${DATAMUSE_API}?rel_syn=${word}&max=10`
    );
    const synonymData: { word: string }[] = await synonymResponse.json();
    const synonyms = synonymData.map(item => item.word);

    return {
      word,
      definition,
      synonyms: synonyms.length > 0 ? synonyms : []
    };
  } catch (error) {
    console.error('Error fetching word data:', error);
    return {
      word,
      definition: 'Unable to fetch definition',
      synonyms: []
    };
  }
};