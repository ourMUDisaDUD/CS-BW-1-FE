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
import { Box, PseudoBox, Text} from '@chakra-ui/core'
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
                        <Icon onClick={() => props.moveUser("n")} alt="Move North" className="arw">keyboard_arrow_up</Icon>
                    <div className="leftright">
                            <Icon  onClick={() => props.moveUser("w")} alt="Move West" className="arw">keyboard_arrow_left</Icon>
                            <Icon onClick={() => props.moveUser("e")} alt="Move East" className="arw">keyboard_arrow_right</Icon>
                    </div>
                    <Icon onClick={() => props.moveUser("s")} alt="Move South" className="arw">keyboard_arrow_down</Icon>
                </div>
            </div>


            <div className="status">
                    <Text fontSize="2xl" color="#E59400
">{props.room.name}</Text>
                {/* <h1>{props.room.name}</h1> */}
                <h2>Currently in 
                <Text color="#fcf4e5">{props.room.title}</Text></h2>
                <h3>{props.room.description}</h3>
            </div>
    </div>

    <div className="statusLogs">

{/* box containing 4 prev statuses */}
{/* // {props.statlogs && props.statlogs.length > 0 ? ( */}
    {/* <div> */}


                            <Box borderWidth="1px" rounded="md" overflow="hidden" border>
                        {props.statlogs && props.statlogs.length > 0 ? (

                                props.statlogs.map((log, i) => (
                                    <PseudoBox key={i} px={4} py={2} bg="white" _even={{ bg: "gray.100" }}>
                                       <Text>{log}</Text>
                                    </PseudoBox>
                                ))

                        ) : 
                        (
                            ["Make a move", "Make a move", "Make a move", "Make a move"].map((item, i) => (
                                <PseudoBox key={i} px={4} py={2} bg="white" _even={{ bg: "gray.100" }}>
                                    {item}
                                </PseudoBox>
                            ))
                    )   
                        
                        
                        }

    </Box>


        </div>
        </div>
        )
        }


export default StatusBar;


