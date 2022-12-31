import React, { useState } from 'react';
import Keyboard from './Keyboard';
import Word from './Word';

import {getRandomInt} from './helperFunctions';

import classes from './App.module.scss';

import ValidWordleWords from './valid-wordle-words';
let wordInPlay;
populateWordInPlay();

function populateWordInPlay()
{
    wordInPlay = ValidWordleWords[getRandomInt(ValidWordleWords.length)].split("");
    console.log(wordInPlay);
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
        let foundIndex = wordInPlay.findIndex((letterInPlay) => letterInPlay === letter.keyStroke);
        if(foundIndex === -1){
            return{
                keyStroke: letter.keyStroke,
                status: "absent"
            };
        }
        else if(foundIndex === index){
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
            for(let i=0;i<rowNumber+1;i++){
                const wordWithStatus = getWordWithStatus([...words[i]]);
                wordWithStatus.forEach(letterWithStatus => {
                    let keyboardInformationFound = false;
                    for(let j=0;j<keyboardInformation.length;j++){
                        if(keyboardInformation[j].buttons === letterWithStatus.keyStroke){
                            keyboardInformationFound = true;
                            keyboardInformation[j].class = `letter-${letterWithStatus.status}`
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

    return (
        <>
            <div className={classes.center}>
                <Word rowNumber={1} word={words[0]}/>
                <Word rowNumber={2} word={words[1]}/>
                <Word rowNumber={3} word={words[2]}/>
                <Word rowNumber={4} word={words[3]}/>
                <Word rowNumber={5} word={words[4]}/>
                <Word rowNumber={6} word={words[5]}/>
                {/* <Word rowNumber={5} word={[{keyStroke: 'a', status: 'elsewhere'}]}/> */}
            </div>
            <Keyboard onKeyPress={onKeyPress} keyboardInformation={keyboardInformation} />
        </>
    );
}

export default App;