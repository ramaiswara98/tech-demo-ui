import logo from './logo.svg';
import './App.css';
import './Mint';
import 'bootstrap/dist/css/bootstrap.css';

import  bs58  from "bs58";
import {  clusterApiUrl,Connection,PublicKey, Keypair,LAMPORT_PER_SOL, LAMPORTS_PER_SOL} from "@solana/web3.js";
import { createMint, getOrCreateAssociatedTokenAccount,mintTo, transfer, Account, getMint, getAccount} from"@solana/spl-token";
import MintToken from './Mint';
import AccountUser from './page/AccountUser/AccountUser';
import ArtChooser from './page/ArtChooser/ArtChooser'
import Navigation from './component/Navigation/Navigation';
import { Modal, Navbar } from 'react-bootstrap';
import TaskOffers from './page/TaskOffers/TaskOffers';
import { Router } from 'react-router';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import React, {Fragment} from 'react'
import TaskListOrganiser from './page/TaskListOragniser/TaskListOrganiser';
import AccountOrganiser from './page/AccountOrganiser/AccountOrganiser';
import AccountAdmin from './page/AccountAdmin/AccountAdmin';
import Home from './page/Home/Home';
import SubmissionList from './page/SubmissionList/SubmissionList';

// Special setup to add a Buffer class, because it's missing
window.Buffer = window.Buffer || require("buffer").Buffer;

const Index = () => <h2>Index</h2>
const About = () => <h2>About</h2>
function App() {
  
  return (
    // <div className="App">
    //   <header className="App-header" style={{height:"50px"}}>
        
       
    //   </header>
   
    // </div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <>
          <Navigation/>
          <body>
            {/* <div style={{width:"80%", justifyContent:"center", margin:"auto"}}> */}
            <Home/>
          {/* </div> */}
          </body>
        </>
      }/>

    <Route path="/offers" element={
        <>
          <Navigation/>
          <body>
            <div style={{width:"80%", justifyContent:"center", margin:"auto"}}>
            <TaskOffers />
          </div>
          </body>
        </>
      }/>

    <Route path="/account" element={
        <>
          <Navigation/>
 <>
           
            <AccountUser />
  </>        

        </>
      }/>
      <Route path="/task/:id" element={
        <>
          <Navigation/>
          <body>
            <div style={{width:"80%", justiftyContent:"center", margin:"auto"}}>
            <ArtChooser />
          </div>
          </body>
        </>
      }/>

      <Route path="/organiser/submission-list/:id" element={
        <>
          <Navigation/>
          <body>
            <div style={{width:"80%", justiftyContent:"center", margin:"auto"}}>
            <SubmissionList />
          </div>
          </body>
        </>
      }/>
      
      <Route path="/organiser/task" element={
        <>
          <Navigation/>
          <body>
            <div style={{width:"80%", justiftyContent:"center", margin:"auto"}}>
            <TaskListOrganiser/>
          </div>
          </body>
        </>
      }/>

    <Route path="/organiser/account" element={
        <>
          <Navigation/>
          <body>
            <div style={{width:"80%", justiftyContent:"center", margin:"auto"}}>
            <AccountOrganiser/>
          </div>
          </body>
        </>
      }/>

    <Route path="/admin/account" element={
        <>
          <Navigation/>
          <body>
            <div style={{width:"80%", justiftyContent:"center", margin:"auto"}}>
            <AccountAdmin/>
          </div>
          </body>
        </>
      }/>

      <Route path="/mint" element={
        <>
          <Navigation/>
          <body>
            <div style={{width:"80%", justiftyContent:"center", margin:"auto"}}>
            <MintToken/>
          </div>
          </body>
        </>
      }/>

    </Routes>

    
    
  </BrowserRouter>
  );
}


export default App;
