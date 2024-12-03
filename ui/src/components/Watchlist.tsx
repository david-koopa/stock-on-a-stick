import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

interface Props {
    stock: string;
  }

interface StockWatchlist<T> {
  [Key:string]: T
}

const socket = io('http://localhost:6868', {
  transports: ["websocket"],
  reconnection: false
})

const Watchlist: React.FC<Props> = ({ stock }) => {

  const [stockData, setStockData] = React.useState<StockWatchlist<string>>({});

  useEffect(() => {
    socket.on(stock, (data) =>{
      const latestStockData = data.data.pop();
      const symbol = latestStockData["s"];
      const price = latestStockData["p"];
      setStockData({
        [`${symbol}`]: price
      })
    })
  }, []);



  return (
    <div>
        <h1>Watching {stock}</h1>
        {JSON.stringify(stockData)}
    </div>
  );
}

export default Watchlist;
