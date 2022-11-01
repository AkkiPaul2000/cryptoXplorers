import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { ExpandMore } from '@mui/icons-material';
import data from '../Data/data.json'



const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    marginLeft:'10%',
    color:"gold",
    backgroundColor:"transparent",
  },
  contents:{
    display: 'flex',
    width:"100%",
    // justifyContent: 'space-between',
    margin:'0',
    },
  heading: {
    fontSize: theme.typography.pxToRem(25),
    justifyContent: 'center',
    flex:1,
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function TreasuryPage() {
  const classes = useStyles();
 
  Object.keys(data).map((i) =>console.log(i));
  return (
    <div>
    yo
    <div className={classes.root}>
    
    {Object.keys(data).map((i) =>
      <Accordion className={classes.root}>
        <AccordionSummary
        className={classes.root}
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <div className={classes.contents}>
        {console.log(data[i])}

          <Typography className={classes.heading}>{i}</Typography>
          <Typography className={classes.heading}>${data[i].currentTreasuryUSD.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Typography>
          <Typography className={classes.heading}>{data[i].currentLiquidTreasuryUSD?"$"+data[i].currentLiquidTreasuryUSD.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","):null}</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails >
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
            
          </Typography>
        </AccordionDetails>
      </Accordion>
    )
    }
    </div>
    </div>
  );
}
