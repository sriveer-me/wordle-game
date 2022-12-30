import React from 'react';
import './Word.scss';

//props.word
//props.rowNumber: number - used for creating keys
function Word(props){

    console.log(props.word)

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
            className={letterClassName}
            key={`row-${props.row}-word-letter-${i}`}
            >
                {letterString}
            </div>
        );
    }


    return(
        <div className='word'>
            {wordLetters}
            {/* <div className="word-letter word-letter-1 letter-absent">f</div>
            <div className="word-letter word-letter-2 letter-elsewhere">o</div>
            <div className="word-letter word-letter-3 letter-correct">u</div>
            <div className="word-letter word-letter-4">n</div>
            <div className="word-letter word-letter-5">d</div> */}
        </div>
    );
}

export default Word;