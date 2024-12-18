const initWebSocket = () => {

    if (!process.env.FINNHUB_TOKEN) {
        return Error('FINNHUB_TOKEN missing. Will not subscribe to Finnhub API.'), null
    }

    // does not work on weekends .... market down :(
    return null, new WebSocket(`wss://ws.finnhub.io?token=${process.env.FINNHUB_TOKEN}`);
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
        const parsed = JSON.parse(event.data);

        // do nothing on ping
        if (event.data["type"] == "ping") {
            return;
        }
        console.log(`emitting from ${parsed["data"][0]["s"]}`)
        io.emit(parsed["data"][0]["s"], parsed); // send data between server and UI
    });
}

module.exports = { 
    initWebSocket, subscribe, unsubscribe, watch
}