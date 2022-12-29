import React from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

import './Keyboard.scss';

//* props.onKeyPress: function(newCharacter: string) - this function is called when a new button is pressed
function GameKeyboard(props){
    let keyBoardlayout = {
        'default': [
            'q w e r t y u i o p',
            'a s d f g h j k l',
            '{bksp} z x c v b n m {enter}',
        ]
    };

    let keyDisplay = {
        '{bksp}': ' ',
        '{enter}': ' ',
    }

    let buttonTheme = [
        {    
            class: "letter-absent",
            buttons: "b"     
        },
        {    
            class: "letter-elsewhere",
            buttons: "a"
        },
        {
            class: "letter-correct",
            buttons: "c"
        }
    ]

    return(
        <Keyboard
        buttonTheme={buttonTheme}
            display={keyDisplay}
            layout={keyBoardlayout}
            onKeyPress={props.onKeyPress}
        />
    );    
}

export default GameKeyboard;