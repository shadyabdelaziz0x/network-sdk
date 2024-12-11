import { wordList } from '../constants'

export const generateRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * wordList.length)
  return wordList[randomIndex]
}
