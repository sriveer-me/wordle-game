import React, {useState} from 'react';
import Keyboard from './Keyboard';
import Word from './Word';
import GamePrompt from './GamePrompt';

import classes from './GameObject.module.scss';

import ValidWordleWords from './valid-wordle-words';
import {getWordWithStatus,wordHasStatus,checkIfWordWithCorrectStatus} from './word-helper-methods';
import stopwatch from './Stopwatch';

function GameObject(props){
    const [rowNumber,setRowNumber] = useState(0);
    const [columnNumber,setColumnNumber] = useState(0);
    const [words,setWords] = useState([[],[],[],[],[],[]]);
    const [keyboardInformation,setkeyboardInformation] = useState([]);
    const [elapsedTime,setElapsedtime] = useState('00:00'); 
    const [score,setScore] = useState(0);
    const [showPrompt,setShowPrompt] = useState(true);
    const [prompt,setPrompt] = useState("start by choosing a letter");

    let gameOverState = false;

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
                //I win
                stopwatch.stop();
                setShowPrompt(true);
                setPrompt(`you win with a final score of ${2000} which places you 10th on the leaderboard`);
                gameOverState = true;
            }

            if(rowNumber === 5){
                if(!iWin){
                    stopwatch.stop();
                    setShowPrompt(true);
                    setPrompt(`game over, out of turns`);
                    gameOverState = true;
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

        if(!stopwatch.isTicking() && gameOverState === false && newKey !== '{bksp}' && newKey !== '{enter}') {
            stopwatch.start();
            setShowPrompt(false);
            stopwatch.callback = (duration) => {
                setElapsedtime(duration);
            };

            //calculate score here in the future!
        }
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
            <GamePrompt prompt={prompt} showPrompt={showPrompt} time={elapsedTime} score={score}/>
            <div className={classes['word-rows']}>
                {wordRows}
            </div>
            <Keyboard onKeyPress={onKeyPress} keyboardInformation={keyboardInformation} />
        </div>
    );
}

export default GameObject;