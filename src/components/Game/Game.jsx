import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../util/axiosWithAuth';
import { getPortPromise } from 'portfinder';
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
    border: '1px solid black',
    backgroundColor: 'white',
    width: '10px',
    height: '10px'
  };

function Game(props){

    const [move, setMove] = useState(0)
    const [hasGridChanged, setGridChanged] = useState(false)
    const [currentRoom, setUser] = useState({})
    const [rooms, setRooms] = useState({})
    const [map, setMap] = useState([])

    function roomStyle(roomid) {
        return {
        backgroundColor: 'black',
        width: '10px',
        height: '10px',
        borderTop: (rooms[roomid].n_to != 0 ? '0px solid grey' : '1px solid grey'),
        borderBottom: (rooms[roomid].s_to != 0 ? '0px solid grey' : '1px solid grey'),
        borderRight: (rooms[roomid].e_to != 0 ? '0px solid grey' : '1px solid grey'),
        borderLeft: (rooms[roomid].w_to != 0 ? '0px solid grey' : '1px solid grey'),
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
        rooms.map(room => { room.x += Math.abs(lowestx); room.y += Math.abs(lowesty); return room})
        let grid = [];
        for(let i = 0; i < largestx+Math.abs(lowestx); i++) {
            grid.push(new Array(largesty+Math.abs(lowesty)).fill(0))
        }
        rooms.map(room =>
            grid[room.x === 0 ? 0 : room.x-1][room.y === 0 ? 0 : room.y-1] = room.key
        )
        console.log(grid)
        return grid;
    }

    function getRooms() {
        axiosWithAuth().get('https://amuddyday.herokuapp.com/api/adv/getrooms')
        .then(res => { setRooms(res.data.rooms); return setMap(correctCoords(res.data.rooms));})
        .then(() => setGridChanged(true))
        .catch(err => console.log(err))
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

    useEffect((direction) => {
        axiosWithAuth().post('https://amuddyday.herokuapp.com/api/adv/move/', {direction: direction})
        .then(res => setUser({...res.data}))
        .catch(err => console.log(err))
    }, [move])

    useEffect(() => {
        console.log(1)
    })

    return (
        <>
            <h2> Game World </h2>
            {hasGridChanged ?
            <div className="map">
                <div className="innerMap">
                {map.map(row => {
                    return (<div style={{display: "flex", justifyContent: 'center', flexWrap: "wrap", width: "100%"}}>
                        {row.map(column => {
                            return (<div>{column === 0 ? <div style={noRoom}></div> : <div style={roomStyle(column)}></div>}</div>)
                        })}
                    </div>)
                })}
                </div>
            </div> : null}
            {/* <StatusBar room={currentRoom} /> */}
            <button onClick={() => setMove(1)}/>
        </>
    );
}


export default Game