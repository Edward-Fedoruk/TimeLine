import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  time: {
    fontSize: '12px',
    position: 'absolute',
    left: '220%',
    width: 'max-content',
    transition: 'all 2s'
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
    const { classes, fadeIn, date } = this.props
    
    return (
      <p 
        className={classes.time}
        style={{ opacity: `${fadeIn ? 1 : 0}` }}  
      > 
        {this.convertDate()}
      </p>  
    )
  }
}

export default withStyles(styles)(TaskTime)