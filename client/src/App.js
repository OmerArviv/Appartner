import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom'; // import BrowserRouter, Route, and Switch
import Login from './Login';
import { validateUserLoggedIn } from './APP/Utils';
import { userState } from './APP/Utils';
import { authContext } from './APP/Utils';
import Speechtotext from './components/Speechtotextapi/Speechtotext';

function App() {
  
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function checkLoggedIn(){
      let res = await validateUserLoggedIn();
      setAuthenticated(res);
    }
    checkLoggedIn();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <authContext.Provider value={{ authenticated, setAuthenticated }}>
          <div> user is {`${authenticated ? "" : "not"} authenticated`} </div>
          <Routes>
                 <Route path="/">
              {authenticated ? (
                <h1>Logged In Validated successfully </h1>
              ) : (
                <Route path="/" element={<Login />} />
              )}
            </Route>
            <Route path="/speechtotext" element={<Speechtotext></Speechtotext>}>
              
            </Route>
       
          </Routes>
        </authContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
