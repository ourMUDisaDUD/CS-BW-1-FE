import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../util/axiosWithAuth';
import { getPortPromise } from 'portfinder';
import StatusBar from './StatusBar'
import './Game.css';

const map = {
    1 : {
        title: 'hallway',
        description: 'this is a hallway',
        doors: [0, 2, 5, 0]
    },
    2 : {
        title: 'hallway',
        description: 'this is a hallway',
        doors: [4, 3, 0, 1]
    },
    3 : {
        title: 'hallway',
        description: 'this is a hallway',
        doors: [0, 0, 0, 2]
    },
    4 : {
        title: 'hallway',
        description: 'this is a hallway',
        doors: [0, 0, 2, 0]
    },
    5 : {
        title: 'hallway',
        description: 'this is a hallway',
        doors: [1, 0, 0, 0]
    }
}

var noRoom = {
    opacity: '0.0',
    // border: '1px solid transparent',
    backgroundColor: 'grey',
    width: '15px',
    margin: '3px',
    height: '15px'
  };

  

function Game(props){
    const [hasGridChanged, setGridChanged] = useState(false)
    const [currentRoom, setUser] = useState({})
    const [player, setPlayer] = useState('')
    const [rooms, setRooms] = useState({})
    const [map, setMap] = useState([])
    const [logs, setLog] = useState([])

    function innerDiv(roomid, key) {
        return {
            border: '1px solid black',
            position: 'absolute',
            backgroundColor: key === roomid ? 'blue' : key === 500 ? 'yellow' : '#808080',
            width: '15px',
            height: '15px',
            zIndex: '5'
        }
      };

    function roomStyle(roomid) {
        return {
        backgroundColor: 'blue',
        width: '15px',
        height: '15px',
        margin: '3px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '6px',
        color: 'white',
        borderRadius: '2px',

        // borderTop: (rooms[roomid].n_to != 0 ? '1px solid grey' : '1px solid grey'),
        // borderBottom: (rooms[roomid].s_to != 0 ? '1px solid grey' : '1px solid grey'),
        // borderRight: (rooms[roomid].e_to != 0 ? '1px solid grey' : '1px solid grey'),
        // borderLeft: (rooms[roomid].w_to != 0 ? '1px solid grey' : '1px solid grey'),
        }
    };

    function northSouthDiv(roomid) {
        let northSouth = 15
        let topMargin = 0
        if(rooms[roomid].n_to != 0 && rooms[roomid].s_to != 0) {
            northSouth += 6
        }
        else if(rooms[roomid].s_to != 0) {
            northSouth += 3
            topMargin += 3
        }
        else if(rooms[roomid].n_to != 0) {
            northSouth += 3
            topMargin -= 3
        }
        return {
        backgroundColor: '#454545',
        position: 'absolute', 
        height: `${northSouth}px`,
        width: '4px',
        zIndex: '2',
        marginTop: `${topMargin}px`
        }
    };

    function eastWestDiv(roomid) {
        let eastWest = 15
        let westMargin = 0
        if(rooms[roomid].e_to != 0 && rooms[roomid].w_to != 0) {
            eastWest += 6
        }
        else if(rooms[roomid].e_to != 0) {
            eastWest += 3
            westMargin += 3
        }
        else if(rooms[roomid].w_to != 0) {
            eastWest += 3
            westMargin -= 3
        }
        return {
        backgroundColor: '#454545',
        position: 'absolute', 
        width: `${eastWest}px`,
        height: '4px',
        zIndex: '2',
        marginLeft: `${westMargin}px`
        }
    };

    function correctCoords(obj) {
        console.log(obj)
        let rooms = []
        for(let ea in obj) {
            rooms.push(obj[ea])
        }
        let lowestx = 0
        let largestx = 0
        let lowesty = 0
        let largesty = 0
        rooms.map(room => {
            if(room.x < lowestx){
                lowestx = room.x
            } else if(room.x > largestx){
                largestx = room.x                 
            }
            
            if(room.y < lowesty){
                lowesty = room.y
            } else if(room.y > largesty) {
                largesty = room.y
            }
            return
        })
        console.log(counter)
        rooms.map(room => { room.x += Math.abs(lowestx-3); room.y += Math.abs(lowesty-3); return room})
        let grid = [];
        for(let i = 0; i < Math.floor((largestx*1.5))+Math.abs(lowestx); i++) {
            grid.push(new Array(Math.floor((largesty*1.5))+Math.abs(lowesty)).fill(0))
        }
        rooms.map(room =>
            grid[room.y === 0 ? 0 : room.y-1][room.x === 0 ? 0 : room.x-1] = room.key
        )
        console.log(grid)
        return grid;
    }

    function getRooms() {
        axiosWithAuth().get('https://amuddyday.herokuapp.com/api/adv/getrooms')
        .then(res => { setRooms(res.data.rooms); setPlayer(res.data.name); return setMap(correctCoords(res.data.rooms));})
        .then(() => setGridChanged(true))
        .catch(err => console.log(err))
        // .then((res) =>{setPlayer(res.data.name)} ); console.log(res.data.name, 'from rdn')
    }

    //on component mount
    useEffect(() => {
        // Get map here when its done first
        axiosWithAuth().get('https://amuddyday.herokuapp.com/api/adv/init/')
        .then(res => setUser({
            ...res.data
        }))
        getRooms();
    }, [])

    function setMove(move) {
        console.log('fired')
        axiosWithAuth().post('https://amuddyday.herokuapp.com/api/adv/move/', {direction: move})
        .then(res => {
            createLog(move, res)
            setUser({...res.data})
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        console.log(1)
    })
    let counter = 0;


    let statuslogs = [];

    const dirs = {
        n: "North",
        s: "South",
        e: "East",
        w: "West"
    }

    function createLog(dir, res) {
        let { title, description, error_msg } = res.data;
        let log = 'empty'
        // console.log('we hit create log', dir, res)
        // console.log(title, description, error_msg, dir, "title, desc, errmsg, dir")
        // console.log('empty log: ', log)
        if (error_msg) {
            // console.log('err msg in createlog')
            log = `You tried to move ${dirs[dir]}. ${error_msg}`
            // console.log('log to be:', log)
            // setLog([log, ...logs])
            // statuslogs.push([log])
        } else {
            // console.log('no err in createlog')
            log = `You moved ${dirs[dir]}. You entered the ${title}. ${description}`
            // console.log('log to be: ', log)
            // statuslogs.push([log])
        }

        if (logs.length >= 3) {
            logs.length = 3
        }
        setLog([log, ...logs])

    }



    return (
        <>
            {hasGridChanged ?
            <div className="map">
                <div className="innerMap">
                {map.map(row => {
                    return (<div style={{display: "flex", justifyContent: 'center', flexWrap: "wrap", width: "100%"}}>
                        {row.map(column => {
                            counter += 1
                            //<div style={northSouthDiv(column)}></div>
                            return (<div>{column === 0 ? <div style={noRoom}></div> 
                                : <div style={roomStyle(column)}>{column}<div style={northSouthDiv(column)}></div><div style={eastWestDiv(column)}></div><div style={innerDiv(currentRoom.key, column)}></div></div>}</div>)
                        })}
                    </div>)
                })}
                </div>
            </div> : null}
            {hasGridChanged ? <StatusBar room={currentRoom} player={player} moveUser={setMove} statlogs={logs}/> : null}
        </>
    );
}


export default Game