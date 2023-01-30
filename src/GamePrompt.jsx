import React,{ useState } from 'react';
import Classes from './GamePrompt.module.scss';

// prompt: string - this is the prompt that will be displayed to the user
// showPrompt: boolean - setting this ti true will show the prompt to the user, false will mean score and time will be shown
//score: Number(integer) - this is the score earned by the user in the current session
//time: string(mm:ss) - this is the time that has elapsed in the current session
export default function GamePrompt({
    prompt,
    showPrompt,
    score,
    time
})
{
    let promptJSX;
    let promptWrapperProps;
    if(showPrompt === false) {
        promptJSX = [
            <h1 className={Classes['h1']}>Score: {score}</h1>, 
            <h1 className={Classes['h1']}>Time: {time}</h1>
        ]
        promptWrapperProps = {
            className: `${Classes['prompt-wrapper']} width-constrainer ${Classes['min-width-keyboard']}`
        };
    }
    else{
        promptJSX = <h1 className={Classes['h1']}>{prompt}</h1>
        promptWrapperProps = {
            className: `${Classes['prompt-wrapper']} width-constrainer`
        }
    }


    return(
        <div {...promptWrapperProps}>
            {promptJSX}
        </div>
    );
}