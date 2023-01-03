import ValidWordleWords from './valid-wordle-words';
import {getRandomInt} from './helperFunctions';

let wordInPlay = "";
populateWordInPlay();

export function populateWordInPlay()
{
    wordInPlay = ValidWordleWords[getRandomInt(ValidWordleWords.length)].split("");
    console.log(wordInPlay);
}

export function get_WordInPlay(){
    return wordInPlay;
}