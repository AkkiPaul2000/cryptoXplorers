import './App.css';
import Homepage from './pages/Homepage';
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from './components/Header';
import CoinPage from './pages/CoinPage';
import { makeStyles } from '@material-ui/core';
import TreasuryPage from './pages/TreasuryPage';

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
        <Route path="/" element={<Homepage/>} exact ></Route>
        <Route path="/coins/:id" element={<CoinPage/>} ></Route>
        <Route path='/treasury'  element={<TreasuryPage/>}></Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
