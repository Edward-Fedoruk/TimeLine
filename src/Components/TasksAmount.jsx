import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
 
})

class TasksAmount extends React.Component {
  
  render() {
    const { classes, fadeIn, mode } = this.props
    const modes = [, 'day', 'month', 'year']
    
    return (
      <div style={{ opacity: `${fadeIn ? 1 : 0}`  }} className={classes.timeSeparator}>
        <p className={classes.tasks}>{tasks.length} tasks in this {modes[mode]}</p>
      </div>  
    )
  }
}

export default withStyles(styles)(TasksAmount)