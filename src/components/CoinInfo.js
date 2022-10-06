import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { CryptoState } from '../CryptoContext';
import { HistoricalChart } from './../config/api';
import { createTheme, ThemeProvider, makeStyles, CircularProgress } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
// import { Chart } from 'react-chartjs-2'
import { chartDays } from './../config/data';
import SelectButtons from './SelectButtons';
import BarLevel from './BarLevel';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  function perci(nowPrice,startPrice) {
    let change
    var percDiff =  100 * Math.abs( (nowPrice - startPrice) / ( (nowPrice+startPrice)/2 ) );
    if(nowPrice>startPrice) {
        change = "+"+percDiff.toFixed(2)+"%";
    } else {
        change = "-"+percDiff.toFixed(2)+"%";
    }
    return change
}

function CoinInfo({coin}) {
    const [historicData, setHistoricData] = useState()
    const [days, setDays] = useState(1)
    const {currency}=CryptoState()
    const [mini, setMini] = useState(9999999999)
    const [maxi, setMaxi] = useState(0)
    const [coinValue, setCoinValue] = useState(0)

    const fetchHistoricData=async()=>{
        const {data}=await axios.get(HistoricalChart(coin.id,days,currency))
        // const {data}=await axios.get(HistoricalChart(coin.id,days,currency?currency:"INR"))

        setHistoricData(data.prices)
        let prices=data.prices
        
        let minimum=Number.MAX_VALUE
        let maximum=0
        if(prices!=undefined){
         setCoinValue(coin?.market_data.current_price[currency.toLowerCase()]);
         
        prices.map((coin) => {
          
          if(minimum>coin[1]){
            minimum=coin[1]
          }
          if(maximum<coin[1]){
            maximum=coin[1]
          }
        })
        setMaxi(maximum);
        setMini(minimum)
      }
      
       
    }

    useEffect(() => {
      fetchHistoricData()
      

        
    }, [currency,days])
    
    const darkTheme=createTheme({
        palette:{
            primary:{
                main:"#fff",
            },
            type:"dark",
        },
    })
    
    const useStyles = makeStyles((theme) => ({
      container: {
        width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,

        padding: 40,
        paddingTop:2,
        paddingBottom:2,
        [theme.breakpoints.down("md")]: {
          // marginLeft:0 ,
          width: "100%",
          marginTop: 0,
          padding: 20,
          paddingTop: 0,
        },
      },
    }));

    const classes=useStyles()

    return (
        <ThemeProvider theme={darkTheme}>
            <div className={classes.container}>
                {/* Chart */}
                {
                    !historicData ? (
                        <CircularProgress
                        style={{color:"gold"}}
                        size={250}
                        thickness={1}/> 
                    ):(
                        
                         <>
                        {/* {console.log("yo", historicData.map(coin=>{console.log(coin)}))} */}

                        {/* {historicData.map(coin=>{
                          let date=new Date(coin[0])

                          console.log(date.getHours())
                            
                            return`<h1>${coin[1]}</h1>`
                            })} */}
                           
                            {/* <Line 
                            data={{
                                labels:historicData.map((coin)=>{

                                    let date=new Date(coin[0]);
                                    let time=date.getHours()>12?`${date.getHours()-12}`

                                }),
                            }}/> */}

                            <Line
                            width={600} height={250}
              data={{
                labels: historicData.map((coin) => {
                  
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />

            <div
            style={{
              display:"flex",
              marginTop:20,
              
              justifyContent:"space-around",
              width:"100%",
            }}
            >
            {coinValue && historicData && <BarLevel min={mini} max={maxi} days={days} perci={perci(coinValue,historicData[0][1])} />}
            
            </div>
            <div
            style={{
              display:"flex",
              marginTop:20,
              marginBottom:20,
              justifyContent:"space-around",
              width:"100%",
            }}
            >
            
            {chartDays.map(day=>(
              <SelectButtons
              key={day.value}
              onClick={()=>setDays(day.value)}
              selected={day.value===days}
              >{day.label}</SelectButtons>
            ))}
            
            </div>
            <div>
             <img src='https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Fmobile%2F000%2F013%2F564%2Fdoge.jpg' />
            </div></>
                    )
                }

                {/* Button */}
            
            </div>
        </ThemeProvider>
    
    )
}

export default CoinInfo