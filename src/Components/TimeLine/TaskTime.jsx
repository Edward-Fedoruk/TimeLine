import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Transition } from 'react-transition-group'

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

class TaskTime extends React.Component {
  convertDate() {
    const options = [
      , 

      {
        day: 'numeric',
        weekday: 'long'
      },

      {
        month: 'long',
      },

      { year: 'numeric' },

      { year: 'numeric' }
    ]

    const { mode, date } = this.props
    return new Date(date).toLocaleString('en-us', options[mode])
  }

  render() {
    const { classes, fadeIn } = this.props
    
    return (
      <Transition
        mountOnEnter
        unmountOnExit
        in={fadeIn}
        timeout={1000}
      >
        {state => 
          <p 
            className={classes.time}
            style={{ opacity: `${state === 'entered' ? 1 : 0}` }}  
          > 
            {state === 'entered' && this.convertDate()}
          </p>}  
      </Transition>
    )
  }
}

export default withStyles(styles)(TaskTime)