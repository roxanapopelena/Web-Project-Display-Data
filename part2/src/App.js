import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Authors from './components/Authors';
import Schedule from './components/Schedule';
import Home from './components/pages/Home';
import Admin from './components/Admin';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import './App.css';

class NotFound404 extends React.Component {
  render() {
    return (
      <div>
        <p>Not Found 404</p>
      </div>
    )
  }       
 }

 function App() {
  return (
   <Router basename="/kf6012/part2">
     <Navbar/>
       <Switch>
         <Route path="/Authors">
           <Authors />
         </Route>
         <Route path="/Schedule">
           <Schedule />
         </Route>
         <Route path="/admin">
           <Admin />
         </Route>
         <Route exact path="/" component={Home}/>
         <Route path="*">
         <NotFound404 />
        </Route>
       </Switch>
       <Footer />
   </Router>
  );
  }

export default App;