import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Task from './Task'
import styles from './timeBlockStyles'

const dayStyles = () =>({
  timeSeparator: {
    position: 'absolute',
    bottom: 0,
    width: '100vw',
    height: '2px',
    background: '#000',
    right: '-60vw',

  },

  time: {
    position: 'absolute',
    right: '10px',
    fontSize: '14px',
    transform: 'rotate(180deg)'
  },

  ...styles()
})

class Day extends React.Component {
  render() {
    const { tasks, pos, classes, mode } = this.props
    return (
      <div 
        className={classes.timeBlock} 
        style={{
          top:    `${ mode > 1 ? -pos * 70 : 0 }px`, 
          height: `${ mode > 0 ? 40 : 70 * tasks.length }px` 
        }}
      >
        <div className={classes.timeSeparator}>
          <span className={classes.time}> {mode === 0 && tasks[0].date} </span>
        </div>
        {tasks.map((task, i) =>
          <Task task={task} mode={mode} key={i} pos={i} />
        )}
      </div>
    )
  }
}

export default withStyles(dayStyles)(Day)