import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useState } from 'react';
import { Reddit, Twitter,Facebook, Forum } from '@mui/icons-material';
import data from '../Data/data.json'
import { Line } from 'rc-progress';



const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    // textAlign: 'center',
    // justifyContent:'center',
    // justifyItems:'center',
    // verticalAlign:'center',
    // color: theme.palette.text.secondary,
    color: 'gold',
    backgroundColor:'transparent',
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    // border: ' 1px solid gold',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    '&:hover': {
      // elevation:24,
      border: ' 1px solid gold',
      boxShadow:'0 5px 15px rgba(0,0,0,0)',
    }
  },
  heads: {
    padding: theme.spacing(1),
    textAlign: 'center',
    justifyContent:'center',
    justifyItems:'center',
    verticalAlign:'center',
    // color: theme.palette.text.secondary,
    color: 'gold',
    backgroundColor:'transparent',
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    // border: ' 1px solid gold',
    
  },
  // icon:{
  //   // marginTop: 50
  // },
  button: {
    display: 'inline-block',
    padding:0,
    minHeight: 0,
    minWidth: 0,
    color: 'gold',
  },
  
  bar:{
    width:"60%",
    padding: 10,
    borderRadius: 25,
    borderRight:"2px solid grey",
    border:"2px solid grey",

  },
  menuPaper:{
    color: "black",
  },
  menu: {
    "& .MuiPaper-root": {
      backgroundColor:'gold',
    }
  },
}));


function MoreInfo({dataInfo}) {
  const [anchorEl, setAnchorEl] =useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  function handleClose(i){
    setAnchorEl(null);
  };

  const classes = useStyles();
  console.log(dataInfo)
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Info:
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper className={classes.heads} elevation={0}>Website</Paper>
        </Grid>
        <Grid item container  xs={9} spacing={1}>
        <Grid item xs={2}>
          
        </Grid>
          <Grid item xs={8}>
          <a href={dataInfo.social.website} target="_blank" rel="noreferrer">
            <Paper elevation={24} className={classes.paper}>bitcoin</Paper></a>
          </Grid>
         
        </Grid>
        
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper  className={classes.heads} elevation={0}>Explorers</Paper>
        </Grid>
        <Grid item container  xs={9} spacing={1}>
        <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Paper elevation={24} className={classes.paper}>
            <div>
              <Button className={classes.button} style={{ minHeight: 0, minWidth: 0, padding: 0 }} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Open Menu
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className={classes.menu}
              >
                {dataInfo.address.explorers.map((i) =>
              
              {
                if(i!==''){
                  var a=i.split('.').slice(-2)[0].split('/').slice(-1)[0]
                  
                return(<div><MenuItem onClick={handleClose} ><a style={{color:'black'}} href={i} target="_blank" rel="noreferrer" >{
                  a
                  }
                  </a></MenuItem></div>)}}
              )}
              </Menu>
            </div>
            </Paper>
            {/* </a> */}
          </Grid>
        </Grid>
        
      </Grid> 
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper className={classes.heads} elevation={0}>Community</Paper>
        </Grid>
        <Grid item container  xs={9} spacing={1}>
        <Grid item xs={2}></Grid>
          <Grid item xs={8}>
          <a href={dataInfo.social.community.twitter} target="_blank" rel="noreferrer">
          <Grid item>
              <Paper elevation={24} className={classes.paper} >
              <Twitter/> twitter
              </Paper>
          </Grid>
          </a>
          <a href={dataInfo.social.community.reddit} target="_blank" rel="noreferrer">
          <Grid item>
              <Paper elevation={24} className={classes.paper}>
              <Reddit/>Reddit
              </Paper>
          </Grid>
          </a>
          <a href={dataInfo.social.community.facebook} target="_blank" rel="noreferrer">
          <Grid item>
              <Paper elevation={24} className={classes.paper}>
              <Facebook/>Facebook
              </Paper>
          </Grid>
          </a>
          <a href={dataInfo.social.community.forum_url} target="_blank" rel="noreferrer">
          <Grid item>
              <Paper elevation={24} className={classes.paper}>
              <Forum/>Forum
              </Paper>
          </Grid>
          </a>
          </Grid>
          
        </Grid>
        <Grid item xs={3}>
          <Paper  className={classes.heads} elevation={0}>Github</Paper>
        </Grid>
        
        <Grid item container  xs={9} spacing={1}>
        <Grid item xs={1}>
        </Grid>
        {/* this above grid might be removed may cause styling prob when github buttons >2 */}
          {dataInfo.code.github.map((i) =>{
                if(i!==''){
                  var a=i.split('/').slice(-1)[0]
                  
                return(
                <Grid item xs={5}>
          <a href={i} target="_blank" rel="noreferrer">
            <Paper elevation={24} className={classes.paper}>
              {
                a
                }
            </Paper></a>
          </Grid>
                )
                }
          })}
        </Grid>
      </Grid>
      <div>
      <Typography variant="h6" gutterBottom>
        Treasury:
      </Typography>
      <Typography style={{color:'gold'}} variant="subtitle1" gutterBottom>
      Decentraland
      </Typography>
      <Typography style={{color:'gold'}} variant="subtitle1" gutterBottom>
      CurrentTreasuryUSD:{data.decentraland.currentTreasuryUSD.toFixed(2)}
      </Typography>
      <Typography style={{color:'gold'}} variant="subtitle1" gutterBottom>
      CurrentLiquidTreasury:{data.decentraland.currentLiquidTreasuryUSD.toFixed(2)}
      </Typography>
        {console.log(data)}
        <Line className={classes.bar} percent={12} strokeWidth={4} trailWidth={4} trailColor="transparent" strokeColor=" #FFD700" />
      </div>
</div>
  )
}
export default MoreInfo