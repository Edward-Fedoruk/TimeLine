import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = ({ breakpoints }) => ({
  time: {
    fontSize: '12px',
    position: 'absolute',
    left: '300%',
    width: 'max-content',
    transition: 'opacity 2s linear',
    color: '#fff',
    margin: '0',
    bottom: '1px',
    cursor: 'default',
  },
})

const convertDate = (mode, date) => {
  const options = [
    , 
    {
      day: 'numeric',
      weekday: 'long'
    },
    { month: 'long' },
    { year: 'numeric' },
    { year: 'numeric' }
  ]

  return new Date(date).toLocaleString('en-us', options[mode])
}

const TaskTime = ({ classes, fadeIn, date, mode }) => (
  <Typography 
    color='secondary'
    className={classes.time}
    style={{ opacity: `${fadeIn ? 1 : 0}` }}  
  > 
    {fadeIn && convertDate(mode, date)}
  </Typography>   
)

export default withStyles(styles)(TaskTime)