import type { WordChain } from '../types';

export const isValidGuess = (
  guess: string,
  currentWord: WordChain,
  usedWords: Set<string>
): boolean => {
  // Convert to lowercase for comparison
  const normalizedGuess = guess.toLowerCase();
  
  // Check if word was already used
  if (usedWords.has(normalizedGuess)) {
    return false;
  }

  // Check if word is in synonyms list
  return currentWord.synonyms
    .map(s => s.toLowerCase())
    .includes(normalizedGuess);
};

export const getAvailableSynonyms = (
  currentWord: WordChain,
  usedWords: Set<string>
): string[] => {
  return currentWord.synonyms.filter(
    synonym => !usedWords.has(synonym.toLowerCase())
  );
};

export const calculateScore = (chainLength: number, timeLeft: number): number => {
  const baseScore = chainLength * 100;
  const timeBonus = timeLeft * 10;
  return baseScore + timeBonus;
};