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
    transition: 'opacity 1s',
    opacity: '0',
    transform: 'rotate(180deg)',
    willChange: 'opacity'
  },

  time: {
    position: 'absolute',
    right: '25px',
    fontSize: '14px',
    transform: 'rotate(180deg)',
    lineHeight: '2',
    fontSize: '13px',
    willChange: 'opacity'
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
  <Transition
    mountOnEnter
    unmountOnExit
    in={fadeIn}
    timeout={1500}
  >
    {state => 
      <div 
        style={{ opacity: `${state === "entered" ? 1 : 0}`  }} 
        className={classes.timeSeparator}
      >
        <Typography 
          color='secondary' 
          className={classes.time}
        >
          {state === "entered" && convertDate(mode, date) }
        </Typography>
      </div>}
  </Transition>
)


export default withStyles(styles)(TimeDivider)