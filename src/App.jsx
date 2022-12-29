import React from 'react';
import Keyboard from './Keyboard';

function App(){

    let keyPress = function(newKey){
        console.log(newKey);
    }

    return (
        <Keyboard onKeyPress={keyPress} />
    );
}

export default App;