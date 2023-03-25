import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter,Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Login';
import { validateUserLoggedIn } from './APP/Utils';
import { userState } from './APP/Utils';
import { authContext } from './APP/Utils';
import CreateProfile from './pages/CreateProfile';
import WhoAreYouProfile from './pages/WhoAreYouProfile';
import SetPrefernces from './pages/SetPreferncesProfile';

function App() {
  
  const [authenticated, setAuthenticated] = useState(false);
  

  useEffect( () => {
    async function checkLoggedIn(){
      let res = await validateUserLoggedIn();
      setAuthenticated(res);
    }
    checkLoggedIn();
  }, []);

  return (
    <div className="App">
      {/* <header className="App-header"></header> */}
        {/* <ThemeProvider theme={uiTheme}> */}
            <div>
                <BrowserRouter>
                <authContext.Provider value={{ authenticated, setAuthenticated }}>
                <div> user is {`${authenticated ? "" : "not"} authenticated`} </div>

                        { authenticated ? (
                          <h1>Logged In Validated successfully (; </h1>
                            // <SideBar
                            //     refresh={reloadSideBar}
                            //     user={currentUser}
                            //     notifyOnLogOutHandler={notifyOnLogOutHandler}
                            //     changeUiTheme={changeUiTheme}
                            //     logout={logOut}
                            //     isAdmin={() => {
                            //         return isAdmin;
                            //     }}
                            //     routes={
                            //         <CenopsRoutes
                            //             isAdmin={isAdmin}
                            //             reload={reload}
                            //         ></CenopsRoutes>
                            //     }
                            // ></SideBar>
                        ) : (
                          <h1>a</h1>
                          // <Login>

                          // </Login>
                            // <Routes>
                            //     <Route
                            //         path="/oauth2/redirect"
                            //         element={<OAuth2RedirectHandler />}
                            //     ></Route>
                            //     <Route
                            //         path="/*"
                            //         element={<Login></Login>}
                            //     ></Route>
                            // </Routes>
                        )}
                   </authContext.Provider>
                   <Routes>
                        <Route path='/create-profile' element={<CreateProfile/>}/>
                        <Route path='/create-profile/who-are-you' element={<WhoAreYouProfile/>}/>
                        <Route path='/create-profile/set-prefernces' element={<SetPrefernces/>}/>
                   </Routes>
                </BrowserRouter>
            </div>
        {/* </ThemeProvider> */}
    </div>
  );
}

export default App;
