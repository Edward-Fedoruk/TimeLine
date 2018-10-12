import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  tasksIn: {
    fontSize: '12px',
    position: 'absolute',
    right: '300%',
    // transform: 'rotate(180deg)',
    width: 'max-content',
    color: '#fff',
    margin: '0'
  },

  wrap: {
    transition: 'all 2s'
  }
})

class TasksAmount extends React.Component {
  
  render() {
    const { classes, fadeIn, mode, tasks } = this.props
    const modes = [ , 'day', 'month', 'year']
    
    return (
      <div style={{ opacity: `${fadeIn ? 1 : 0}`  }} className={classes.wrap}>
        <p className={classes.tasksIn}>{tasks} tasks in this {modes[mode]}</p>
      </div>  
    )
  }
}

export default withStyles(styles)(TasksAmount)