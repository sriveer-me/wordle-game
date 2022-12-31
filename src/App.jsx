import React, { useState } from 'react';
import Keyboard from './Keyboard';
import Word from './Word';

import classes from './App.module.scss';

let wordInPlay = ["f","o","u","n","d"];

function getWordWithStatus(word){
    return word.map((letter,index) => {
        let foundIndex = wordInPlay.findIndex((letterInPLay) => letterInPLay === letter.keyStroke);
        if(foundIndex === -1){
            return{
                keyStroke: letter.keyStroke,
                status: "absent"
            };
        }
        else if(foundIndex === index){
            return{
                keyStroke: letter.keyStroke,
                status: "correct"
            }
        }
        else{
            return{
                keyStroke: letter.keyStroke,
                status: "elsewhere"
            }
        }
    });
}

function checkIfWordWithCorrectStatus(word){
    for(let i=0;i<word.length;i++){
        if("status" in word[i] && word[i].status != "correct"){
            return false;
        }
    }
    return true;
}

function App(){

    let [rowNumber,setRowNumber] = useState(0);
    let [columnNumber,setColumnNumber] = useState(0);
    let [words,setWords] = useState([[],[],[],[],[],[]]);

    let onKeyPress = function(newKey) {

        if(newKey === '{enter}') {
            if(words[rowNumber].length != 5)
                return;
            
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
            <Keyboard onKeyPress={onKeyPress} />
        </>
    );
}

export default App;