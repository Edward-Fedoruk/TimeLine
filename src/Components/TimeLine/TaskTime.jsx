import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Transition } from 'react-transition-group'
import Typography from '@material-ui/core/Typography'

const styles = () => ({
  time: {
    fontSize: '12px',
    position: 'absolute',
    left: '300%',
    width: 'max-content',
    transition: 'opacity 1s linear',
    color: '#fff',
    margin: '0',
    willChange: 'opacity'
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
  <Transition
    mountOnEnter
    unmountOnExit
    in={fadeIn}
    timeout={1000}
  >
    {state => 
      <Typography 
        color='secondary'
        className={classes.time}
        style={{ opacity: `${state === 'entered' ? 1 : 0}` }}  
      > 
        {state === 'entered' && convertDate(mode, date)}
      </Typography>}  
  </Transition>
)

export default withStyles(styles)(TaskTime)