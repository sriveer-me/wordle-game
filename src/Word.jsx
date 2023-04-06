import React from 'react';
import './Word.scss';

//props.wordInError: boolean
//props.word
//props.rowNumber: number - used for creating keys
//props.onClearMessage: function(rowIndex,columnIndex) - this function is called when user wants to clear multiple characters
function Word(props){
    let wordLetters = [];
    for(let i=0;i<5;i++) {

        let letter = props.word[i];
        let letterString ='';
        let letterClassName = `word-letter word-letter-${i+1}`;
        if(letter) {
            if('keyStroke' in letter){
                letterString = letter.keyStroke;
            }
            else{
                console.error('a letter object must contain the field keyStroke');
            }

            //no status present in the object means normal status
            if('status' in letter){
                if(letter.status === "absent"){ // eslint-disable-next-line 
                    letterClassName = letterClassName + " " + "letter-absent";
                }
                else if(letter.status === "elsewhere"){ // eslint-disable-next-line 
                    letterClassName = letterClassName + " " + "letter-elsewhere";
                }
                else if(letter.status === "correct"){ // eslint-disable-next-line 
                    letterClassName = letterClassName + " " + "letter-correct";
                }
                else{
                    console.error(`${letter.status} must one of the three values mentioned : 'absent' 'elsewhere' 'correct' (quotes for representation only)`);
                }
            }
        }
        
        wordLetters.push(
            <div 
                className={letterClassName+' '+(props.wordInError?'letter-error':'')  }
                key={`row-${props.row}-word-letter-${i}`}
                onClick={() => {props.onClearMessage(props.rowNumber-1,i)}}
            >
                {letterString}
            </div>
        );
    }

    return(
        <div className={`word animate__animated ${props.wordInError?'animate__shakeX':''}`}>
            {wordLetters}
        </div>
    );
}

export default Word;