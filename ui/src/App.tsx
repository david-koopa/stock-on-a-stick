import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';

interface User {
  first_name: string;
  last_name: string;
}

function App() {

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
  }, [])


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
      </header>
    </div>
  );
}

export default App;
