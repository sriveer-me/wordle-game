import React, { useState } from 'react';
import Keyboard from './Keyboard';
import Word from './Word';

import {getRandomInt,getAllIndexes} from './helperFunctions';

import classes from './App.module.scss';

import ValidWordleWords from './valid-wordle-words';
let wordInPlay;
populateWordInPlay();

function populateWordInPlay()
{
    wordInPlay = ValidWordleWords[getRandomInt(ValidWordleWords.length)].split("");
    console.log(wordInPlay);
}

function wordHasStatus(word){
    let letter = word[0];
    if("status" in letter)
        return true;
    else return false;
}

function getWordWithStatus(word){

    let wordInPlaySet = {}; 
    wordInPlay.forEach(function(letterInPlay){
        if(letterInPlay in wordInPlaySet){
            wordInPlaySet[letterInPlay] += 1;
        }
        else{
            wordInPlaySet[letterInPlay] = 1;
        }
    })

    const intermediate = word.map((letter,index) => {
        let foundIndexes = getAllIndexes(wordInPlay,letter.keyStroke);
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

function checkIfWordWithCorrectStatus(word){
    for(let i=0;i<word.length;i++){
        if("status" in word[i] && word[i].status !== "correct"){
            return false;
        }
    }
    return true;
}

function App(){

    let [rowNumber,setRowNumber] = useState(0);
    let [columnNumber,setColumnNumber] = useState(0);
    let [words,setWords] = useState([[],[],[],[],[],[]]);
    let [keyboardInformation,setkeyboardInformation] = useState([]);

    let onKeyPress = function(newKey) {

        if(newKey === '{enter}') {
            //return if provided word is not 5 letters long
            if(words[rowNumber].length !== 5)
                return;

            //return if this is not a valid wordle word
            const rowWord = words[rowNumber].map((letter)=> letter.keyStroke).join("");
            if(ValidWordleWords.findIndex((wordleWord) => wordleWord === rowWord) === -1){
                console.log('not valid wordle word!');
                return;
            }
           
            let wordWithStatus = getWordWithStatus([...words[rowNumber]]);
            words[rowNumber] = wordWithStatus;
            setWords([...words]);

            const iWin = checkIfWordWithCorrectStatus(wordWithStatus);
            if(iWin){
                console.log('i win!')
            }

            if(rowNumber === 5){
                if(!iWin){
                    console.log('i lost!')
                }
            } 
            else{
                setRowNumber(rowNumber + 1);
                setColumnNumber(0);
            }

            //light the keyboard accordingly
            keyboardInformation = [];
            const classPrecedenceList = {
                "letter-absent": 1,
                "letter-elsewhere": 2,
                "letter-correct": 3
            };
            for(let i=0;i<rowNumber+1;i++){
                const wordWithStatus = getWordWithStatus([...words[i]]);
                wordWithStatus.forEach(letterWithStatus => {
                    let keyboardInformationFound = false;
                    for(let j=0;j<keyboardInformation.length;j++){
                        if(keyboardInformation[j].buttons === letterWithStatus.keyStroke){
                            keyboardInformationFound = true;
                            if(classPrecedenceList[keyboardInformation[j].class] < classPrecedenceList[`letter-${letterWithStatus.status}`]){
                                keyboardInformation[j].class = `letter-${letterWithStatus.status}`  
                            }
                        }
                    }
                    if(keyboardInformationFound === false){
                        keyboardInformation.push({
                            buttons: letterWithStatus.keyStroke,
                            class: `letter-${letterWithStatus.status}`
                        });
                    }
                });
            }
            setkeyboardInformation([...keyboardInformation]);
            
            return;
        }

        else if(newKey === '{bksp}'){
            if(columnNumber > 0)
            {
                words[rowNumber].pop();
                setWords([...words]);
                setColumnNumber(columnNumber-1);
            }
            return;
        }
    
        if(columnNumber >= 5)
            return;

        words[rowNumber][columnNumber] = {
            keyStroke: newKey
        }
        
        setWords([...words]);
        setColumnNumber(columnNumber+1);
    }

    let onClearMessage = function(rowIndex,columnIndex){

        if(wordHasStatus(words[rowIndex]))
            return;

        for(let i=4;i>=columnIndex;i--){
            words[rowIndex][columnIndex] = undefined;
            words[rowIndex].length = i+1;
        }
        setWords([...words]);
        setColumnNumber(columnIndex);
    }

    let wordRows = [];
    for(let i=0;i<6;i++){
        wordRows.push(
            <Word rowNumber={i+1} word={words[i]} onClearMessage={onClearMessage} key={i+"word-row-in-app"}/>
        );
    }

    return (
        <>
            <div className={classes.center}>
                {wordRows}
            </div>
            <Keyboard onKeyPress={onKeyPress} keyboardInformation={keyboardInformation} />
        </>
    );
}

export default App;