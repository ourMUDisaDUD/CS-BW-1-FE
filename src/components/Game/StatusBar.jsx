import React from 'react'
import Up from './Up.png'
// import Right from '../iconassets/right.png'
// import Down from '../iconassets/down.png'
// import '../iconassets/Up.png'
// import blah from './src/components/iconassets/down.png'
import Icon from '@material-ui/core/Icon';
import SvgIcon from '@material-ui/core/SvgIcon';
// import IconButton from '@material-ui/core/IconButton';
import { IconButton } from '@material-ui/core';
import { AccessAlarm, keyboard_arrow_right } from '@material-ui/icons';
function StatusBar(props) {


    return (
        <div>
            <h1>holder</h1>

            <IconButton className="keyboard_arrow_right">keyboard_arrow_right</IconButton>

            <div className="buttons">
                {/* <img src={Left} alt="work"/> */}
                <img src={Up}/>
                {/* <img src='Up'/> */}
                {/* <img src={Right}/> */}
                {/* <img src={blah}/> */}
            <Icon>keyboard_arrow_right</Icon>
            <Icon>keyboard_arrow_up</Icon>
            <Icon>keyboard_arrow_down</Icon>
            <Icon fontSize="large">keyboard_arrow_left</Icon>
<button>Up</button>
<button>Left</button>
<button>Right</button>
<button>Down</button>
{/* finding arrows for directions now, icons */}

                </div>
            </div>
    )

}

export default StatusBar;



{/* four buttons, up down left right */}

{/* show previous moves in status bar chat text esque thing */}
{/* maybe use a LRUC for this? to hold previous moves and display those? or ring buffer */}

let prevMoves = []

// ex
// "You moved Left."
// "To the North of you, the {TITLE} blah. {DESCRIPTION}"
