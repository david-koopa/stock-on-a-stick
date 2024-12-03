import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Watchlist from './components/Watchlist';

function App() {

  const [isMarketDown, setIsMarketDown] = React.useState<boolean>(true);
  const [stocks, setStocks] = React.useState<Array<string>>([]);
  const [userInput, setUserInput] = React.useState('');

  useEffect(() => {
    // todo look at finnhub and see status of market 
    setIsMarketDown(false);
  }, []);

  const submitStock = (input: string) => {
  
    const payload = {
      stock_symbol: input
    };

    axios.post('http://localhost:6868/watch', payload).then(data => {
      setStocks([...stocks, input]);
      setUserInput(''); // clear input on success
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
        { isMarketDown ? <></>: stocks.map(stock => <Watchlist stock={stock}/>) }
      </header>
    </div>
  );
}

export default App;
