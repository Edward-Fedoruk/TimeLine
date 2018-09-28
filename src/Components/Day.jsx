import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Task from './Task'
import styles from './timeBlockStyles'

class TimeBlock extends React.Component {

  render() {
    const { tasks, pos, classes, mode } = this.props
    return (
      <div 
        className={classes.timeBlock} 
        style={
          {
            top:      `${ mode > 1 ? -(pos * 40) : 0 }px`, 
            position: `${ mode > 0 ? 'relative' : 'relative'}`, 
            height:   `${ mode > 0 ? 40 : 40 * tasks.length }px` 
          }
        }
      >
        {tasks.map((task, i) =>
          <Task mode={mode} key={i} pos={i} />
        )}
      </div>
    )
  }
}

export default withStyles(styles)(TimeBlock)