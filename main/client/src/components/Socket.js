import io from 'socket.io-client';
// var socket = io('http://localhost:3000/');
let Socket = io("//localhost:3000");
export default Socket;