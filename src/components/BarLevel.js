import React from 'react'
import { makeStyles } from '@material-ui/core';
import { Line } from 'rc-progress';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { CryptoState } from '../CryptoContext';

function getPercentageIncrease(numA, numB) {
  return ((numA - numB) / numB) * 100;
}

function BarLevel({max,min,days}) {
  const {symbol}=CryptoState()
  getPercentageIncrease(max)
  const useStyles=makeStyles(()=>({
      container:{
          width:"100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems:"center",
          marginBottom:20,
      },
      stats:{
        width:"100%",
      },
        rangeText:{
          fontFamily: "Montserrat",
          color:"gold",
          opacity:0.3 ,
          fontWeight:500,
        },
        rangeValue:{
          fontFamily: "Montserrat",
          color:"gold",
          fontWeight:"bolder",
          fontSize:30,
          // fontSize:50,
        },

        bar:{
            width:"60%",
            padding: 10,
            borderRadius: 25,
            borderRight:"2px solid grey",
            border:"2px solid grey",

          }
    })
        );
    const classes=useStyles();
  return (
    <div
    className={classes.stats}
    >
<div
className={classes.container}
>


      <p>
      {days===1 && 
      <span className={classes.rangeText}>24h Low</span>}
      {days===30 && 
      <span className={classes.rangeText}>30d Low</span>}
      {days===90 && 
      <span className={classes.rangeText}>90d Low</span>}
      {days===365 && 
      <span className={classes.rangeText}>365d Low</span>}
      <br></br> 
        <span className={classes.rangeValue}>{symbol}{min.toFixed(2)}</span>
      </p>
  


     <Line className={classes.bar} percent={10} strokeWidth={4} trailWidth={4} trailColor="transparent" strokeColor=" #FFD700" />
     <p>
      {days===1 && 
      <span className={classes.rangeText}>24h High</span>}
      {days===30 && 
      <span className={classes.rangeText}>30d High</span>}
      {days===90 && 
      <span className={classes.rangeText}>90d High</span>}
      {days===365 && 
      <span className={classes.rangeText}>365d High</span>}
      <br></br> 
        <span className={classes.rangeValue}>{symbol}{max.toFixed(2)}</span>
      </p>
      
      </div>

    <TrendingUpIcon sx={{ fontSize: 40,color:"gold",opacity:0.5}}  />
      </div>
  )
}

export default BarLevel

/////
 


