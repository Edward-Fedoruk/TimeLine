import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  time: {
    fontSize: '12px',
    position: 'absolute',
    right: '120%',
    transform: 'rotate(180deg)',
    width: 'max-content',
    transition: 'all 2s'
  },
})

class TaskTime extends React.Component {
  
  render() {
    const { classes, fadeIn, date } = this.props
    
    return (
      <p 
        className={classes.time}
        style={{ opacity: `${fadeIn ? 1 : 0}` }}  
      > 
        {date} 
      </p>  
    )
  }
}

export default withStyles(styles)(TaskTime)