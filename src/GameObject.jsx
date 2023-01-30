import React, {useState} from 'react';
import Keyboard from './Keyboard';
import Word from './Word';
import GamePrompt from './GamePrompt';

import classes from './GameObject.module.scss';

import ValidWordleWords from './valid-wordle-words';
import {getWordWithStatus,wordHasStatus,checkIfWordWithCorrectStatus} from './word-helper-methods';

function GameObject(props){
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
                const wordWithStatus = getWordWithStatus([...words[i]]); //eslint-disable-next-line
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
        <div className={classes['game-object']}>
            <GamePrompt prompt="start by choosing a letter" showPrompt={false}/>
            <div className={classes['word-rows']}>
                {wordRows}
            </div>
            <Keyboard onKeyPress={onKeyPress} keyboardInformation={keyboardInformation} />
        </div>
    );
}

export default GameObject;