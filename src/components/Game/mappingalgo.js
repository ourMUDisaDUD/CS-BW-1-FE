
// const structure = [[0]];

// const data = {
//     1 : {
//         n_to: 5,
//         e_to: 0,
//         s_to: 3,
//         w_to: 2
//     },
//     2 : {
//         n_to: 0,
//         e_to: 1,
//         s_to: 0,
//         w_to: 0
//     },
//     3 : {
//         n_to: 1,
//         e_to: 0,
//         s_to: 4,
//         w_to: 0
//     },
//     4 : {
//         n_to: 3,
//         e_to: 0,
//         s_to: 0,
//         w_to: 0
//     },
//     5 : {
//         n_to: 0,
//         e_to: 6,
//         s_to: 1,
//         w_to: 8
//     },
//     6 : {
//         n_to: 0,
//         e_to: 0,
//         s_to: 7,
//         w_to: 5
//     },
//     7 : {
//         n_to: 6,
//         e_to: 0,
//         s_to: 0,
//         w_to: 0
//     },
//     8 : {
//         n_to: 0,
//         e_to: 5,
//         s_to: 0,
//         w_to: 9
//     },
//     9 : {
//         n_to: 0,
//         e_to: 8,
//         s_to: 0,
//         w_to: 0
//     }
// }

// const newData = {}

// coordPlot();

// for(ea in newData) {
//     console.log(ea, newData[ea])
// }

// function coordPlot() {
//     x = 0
//     y = 0
//     counter = 1
//     current = data[counter]
//     while(data.hasOwnProperty(counter)) {
//         console.log('hi')
//         if(!(newData.hasOwnProperty(current))) {
//             newData[counter] = [x, y]
//         }
//         if(current.n_to && !(newData.hasOwnProperty(current.n_to))) {
//             if(x != 0) {
//                 x -= 1
//                 newData[current.n_to] = [x, y]
//             } else {
//                 for(ea in newData) {
//                     newData[ea][0] += 1
//                 }
//                 newData[current.n_to] = [x, y]
//             }
//         }
//         if(current.e_to && !(newData.hasOwnProperty(current.e_to))) {
//             y += 1
//             newData[current.e_to] = [x, y]
//         }
//         if(current.s_to && !(newData.hasOwnProperty(current.s_to))) {
//             x += 1
//             newData[current.e_to] = [x, y]
//         }
//         if(current.w_to && !(newData.hasOwnProperty(current.w_to))) {
//             if(y != 0){
//                 y -= 1
//                 newData[current.w_to] = [x, y]
//             } else {
//                 for(ea in newData) {
//                     newData[ea][1] += 1
//                 }
//                 newData[current.w_to] = [x, y]
//             }
//         }
//         counter += 1
//         current = data[counter]
//     }

// }

// function createRoom(roomid=1, x=0, y=0) {
//     if(structure[x][y] === 0) {
//         newData[roomid] = [x,y]
//         structure[x][y] = roomid
//         if(data[roomid].n_to) {
//             //north
//             var northTo = data[roomid].n_to
//             if(x != 0) {
//                 createRoom(northTo, newData[roomid][0]-1, newData[roomid][1])
//             } else {    
//                 console.log('here')
//                 structure.unshift(new Array(structure[0].length).fill(0))
//                 for(ea in newData) {
//                     ea[0] += 1
//                 }
//                 createRoom(northTo, newData[roomid][0], newData[roomid][1])
//             }
//         }
//         if(data[roomid].e_to) {
//             //east
//             var eastTo = data[roomid].e_to
//             if(y != structure[0].length-1) {
//                 createRoom(eastTo, newData[roomid][0], newData[roomid][1]+1)
//             } else {
//                 structure.forEach(row => row.push(0))
//                 createRoom(eastTo, newData[roomid][0], newData[roomid][1]+1)
//             }
//         }
//         if(data[roomid].s_to) {
//             var southTo = data[roomid].s_to
//             if(x != structure.length-1) {
//                 createRoom(southTo, newData[roomid][0]+1, newData[roomid][1])
//             } else {
//                 structure.push(new Array(structure[0].length).fill(0))
//                 createRoom(southTo, newData[roomid][0]+1, newData[roomid][1])
//             }
//         }
//         if(data[roomid].w_to) {
//             //west
//             var westTo = data[roomid].w_to
//             if(y != 0) {
//                 createRoom(westTo, newData[roomid][0], newData[roomid][1]-1)
//             } else {
//                 structure.forEach(row => row.unshift(0))
//                 for(ea in newData) {
//                     ea[1] += 1
//                 }
//                 createRoom(westTo, newData[roomid][0], newData[roomid][1])
//             }
//         }
//     }
// }