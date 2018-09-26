import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Task from './Task'
import styles from './timeBlockStyles'

class TimeBlock extends React.Component {

  render() {
    const { tasks, pos, classes } = this.props
    return (
      <div 
        className={classes.timeBlock} 
        // style={{ top: `${ pos * 60 }px`, height: `${60 * this.props.tasks.length}px`}} 
      >
        {tasks.map((task, i) =>
          <Task key={i} pos={i}/>
        )}
      </div>
    )
  }
}

export default withStyles(styles)(TimeBlock)