import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Transition } from 'react-transition-group'
import Typography from '@material-ui/core/Typography'

const styles = (theme) => ({
  timeSeparator: {
    position: 'absolute',
    bottom: 0,
    width: '100vw',
    height: '1px',
    background: 'rgba(238, 238, 238, .4)',
    left: '-75vw',
    transition: 'opacity 2s',
    opacity: '0',
    // transform: 'rotate(180deg)',
    willChange: 'opacity'
  },

  time: {
    position: 'absolute',
    left: '25px',
    fontSize: '14px',
    // transform: 'rotate(180deg)',
    lineHeight: '2',
    fontSize: '13px',
    transform: 'translateY(-100%)'
  },
})

const convertDate = (mode, date) => {
  const options = [
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    },    
    {
      year: 'numeric',
      month: 'long',
    },
    { year: 'numeric' },
    { year: 'numeric' }
  ]

  return new Date(date).toLocaleString('en-us', options[mode])
}

const TimeDivider = ({ classes, fadeIn, mode, date }) => (
  <div 
    style={{ opacity: `${fadeIn ? 1 : 0}`  }} 
    className={classes.timeSeparator}
  >
    <Typography 
      color='secondary' 
      className={classes.time}
    >
      {fadeIn && convertDate(mode, date)}
    </Typography>
  </div> 
)


export default withStyles(styles)(TimeDivider)