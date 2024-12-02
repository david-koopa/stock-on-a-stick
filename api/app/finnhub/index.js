const initWebSocket = () => {

    if (!process.env.FINNHUB_TOKEN) {
        Error('FINNHUB_TOKEN missing. Will not subscribe to Finnhub API.'), null
    }

    // does not work on weekends .... market down :(
    return null, new WebSocket(`wss://ws.finnhub.io?token=${process.env.FINNHUB_TOKEN}`);
}

const open = (socket, stock) => {
    // subscribe to stock
    socket.onopen = ((event) => {
        socket.send(JSON.stringify({'type':'subscribe', 'symbol': stock}));
    });

}

const subscribe = (socket, stock) => {
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': stock}));
}

// Unsubscribe
const unsubscribe = function(socket, symbol) {
    socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
}

const watch = (socket, io) => {
    // Listen for messages
    socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
        io.emit('stock', event.data); // send data between server and UI
    });
}

module.exports = { 
    initWebSocket, open, subscribe, unsubscribe, watch
}