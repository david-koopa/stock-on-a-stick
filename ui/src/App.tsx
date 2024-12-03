import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:6868', {
  transports: ["websocket"],
  reconnection: false
})

function App() {

  const [stocks, setStocks] = React.useState({});
  const [userInput, setUserInput] = React.useState('');
  useEffect(() => {

    socket.on('watchlist', (data) =>{
      const latestStockData = data.data.pop();
      const symbol = latestStockData["s"];
      const price = latestStockData["p"];
      setStocks({
        ...stocks,
        [`${symbol}`]: price
      })
    })

  }, []);

  const submitStock = (input: string) => {
  
    const payload = {
      stock_symbol: input
    };

    axios.post('http://localhost:6868/watch', payload).then(data => {
      setUserInput('');
    });

  }


  return (
    <div className="App">
      <header className="App-header">
        <div>
          <input type="text" value={userInput} 
          onChange={(e) => setUserInput(e.target.value)}
          />
          <button onClick={() => submitStock(userInput)}>watch</button>
        </div>
        {/* Add Stock Component */}
        <div>
          {JSON.stringify(stocks)}
        </div>
      </header>
    </div>
  );
}

export default App;
