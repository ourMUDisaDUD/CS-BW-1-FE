import React, { useEffect, useState } from 'react'
import Up from './Up.png'
import Axios from 'axios'
import axiosWithAuth from '../util/axiosWithAuth';
// import Right from '../iconassets/right.png'
// import Down from '../iconassets/down.png'
// import '../iconassets/Up.png'
// import blah from './src/components/iconassets/down.png'
import Icon from '@material-ui/core/Icon';
import SvgIcon from '@material-ui/core/SvgIcon';
// import IconButton from '@material-ui/core/IconButton';
import { IconButton } from '@material-ui/core';
import { AccessAlarm, keyboard_arrow_right } from '@material-ui/icons';
import './StatusBar.css'


function StatusBar(props) {
    console.log(props)
    // function movePlayer(dir) {
    //     const direction = {
    //         direction: dir
    //     }
    //     axiosWithAuth().post('https://amuddyday.herokuapp.com/api/adv/move', direction).then(res => {
    //         console.log(res)
    //         console.log(res.data.title, res.data.description)
    //         console.log(res.data.error_msg)
    //         if (res.data.error_msg) {
    //             console.log(res.data.error_msg)
    //         }
    //         console.log(res.data.name)
    //         // n on init = start desc
    //     })
    //     console.log(direction)
    // }

    // componentDidMount() {
    //     console.log(props.room)
    // } room.name = pname, room.title = room title room.description = room description
    // room.players all players existing

    useEffect(() => {
        // Get map here when its done first
        console.log('from props room', props.room);
        console.log('from props room p', props);
        console.log('from statusbar UE', props.statlogs)
    }, [])

    // let statuslogs = [];
    // You moved DIRECTION. You entered the TITLE OF ROOM. DESCRIPTION OF ROOM.
    // You moved DIRECTION. You can't move there!

    // function createLog(dir, res) {
    //     const {title, description, error_msg} = res.data;
    //     let log = ''
    //     if (error_msg) {
    //         log = `You moved ${dir}. ${error_msg}`
    //     } else {
    //         log = `You moved ${dir}. You entered the ${title}. ${description}`
    //     }

    //     statuslogs.append(log)
    // }


    return (
        <div className="status-bar">
            <div className="navAndStatuses">


            <div className="buttons">
                <div className="updownlr">
                    <Icon fontSize="large" onClick={() => props.moveUser("n")} alt="Move North">keyboard_arrow_up</Icon>
                    <div className="leftright">
                        <Icon fontSize="large" onClick={() => props.moveUser("w")} alt="Move West">keyboard_arrow_left</Icon>
                        <Icon fontSize="large" onClick={() => props.moveUser("e")} alt="Move East">keyboard_arrow_right</Icon>
                    </div>
                    <Icon fontSize="large" onClick={() => props.moveUser("s")} alt="Move South">keyboard_arrow_down</Icon>
                </div>
            </div>


            <div className="status">
                <h1>{props.room.name}</h1>
                <h2>Currently in {props.room.title}</h2>
                <h3>{props.room.description}</h3>
            </div>
    </div>

    <div className="statusLogs">

{/* box containing 4 prev statuses */}
{props.statlogs && props.statlogs.length > 0 ? 
(
<div>
    <h1>Previous moves</h1>
    {props.statlogs.map(log => { return (
        
        <div className="log">
            <p>{log}</p>
            </div>
        )

    })}
    </div>
) : null }


        </div>




        </div>
    )

}

export default StatusBar;



{/* four buttons, up down left right */ }

{/* show previous moves in status bar chat text esque thing */ }
{/* maybe use a LRUC for this? to hold previous moves and display those? or ring buffer */ }

let prevMoves = []

// ex
// "You moved Left."
// "To the North of you, the {TITLE} blah. {DESCRIPTION}"
