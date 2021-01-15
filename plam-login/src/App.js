import {Route} from 'react-router-dom'
import LoginTest from './LoginTest'
import Register from './Register'
import Repassword from './Repassword'
import Home from './component/Home'
import React from 'react';
import testdatateble from './testdatateble'





function App() {
  return (
    <div>
       <Route exact path='/' component={LoginTest} />
       <Route path="/register" component={Register}  />
       <Route path="/Repassword" component={Repassword}  />
       <Route path="/home" component={Home}  />

       <Route path="/data" component={testdatateble}  />
    </div>
  );
}

export default App;


