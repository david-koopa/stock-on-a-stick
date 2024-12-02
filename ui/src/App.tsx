import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:6868', {
  transports: ["websocket"],
  reconnection: false
})

interface User {
  first_name: string;
  last_name: string;
}

function App() {

  const [stocks, setStocks] = React.useState({});
  const [users, setUsers] = React.useState<Array<User>>([]);

  useEffect(() => {
    axios.get('http://localhost:6868/user')
    .then(function (users) {
      console.log(users.data);
      setUsers(users.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);

  useEffect(() => {

    socket.on('stock', (data) =>{
      console.log(data);
      const latestStockData = data.data.pop();
      const symbol = latestStockData["s"];
      const price = latestStockData["p"];
      setStocks({
        ...stocks,
        [`${symbol}`]: price
      })
    })

  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <ol>
          {users.map(user => {
            return (
              <li>{user.first_name}</li>
            )
          })}
        </ol>
        <div>
          {JSON.stringify(stocks)}
        </div>
      </header>
    </div>
  );
}

export default App;
