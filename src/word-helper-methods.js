import {getAllIndexes} from './helperFunctions';
import { get_WordInPlay } from './word-in-play';

export function wordHasStatus(word){
    let letter = word[0];
    if("status" in letter)
        return true;
    else return false;
}

export function getWordWithStatus(word){

    let wordInPlaySet = {}; 
    get_WordInPlay().forEach(function(letterInPlay){
        if(letterInPlay in wordInPlaySet){
            wordInPlaySet[letterInPlay] += 1;
        }
        else{
            wordInPlaySet[letterInPlay] = 1;
        }
    })

    const intermediate = word.map((letter,index) => {
        let foundIndexes = getAllIndexes(get_WordInPlay(),letter.keyStroke);
        if(foundIndexes.length === 0){
            return{
                keyStroke: letter.keyStroke,
                status: "absent"
            };
        }
        else if(foundIndexes.findIndex((foundIndex) => foundIndex === index) !== -1){
            wordInPlaySet[letter.keyStroke] -= 1;
            return{
                keyStroke: letter.keyStroke,
                status: "correct"
            }
        }
        else {
            return letter.keyStroke;
        }
    });

    return intermediate.map((letter) => {
        if(typeof letter !== 'string')
            return letter;
        if(wordInPlaySet[letter] > 0){
            wordInPlaySet[letter]-=1;
            return {
                keyStroke: letter,
                status: "elsewhere"
            }
        }
        else{
            return {
                keyStroke: letter,
                status: "absent"
            }
        }
    })
}

export function checkIfWordWithCorrectStatus(word){
    for(let i=0;i<word.length;i++){
        if("status" in word[i] && word[i].status !== "correct"){
            return false;
        }
    }
    return true;
}