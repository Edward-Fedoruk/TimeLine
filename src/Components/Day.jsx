import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Task from './Task'
import styles from './timeBlockStyles'
import TimeSeparator from './TimeSeparator'

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

  tasks: {
    fontSize: '12px',
    position: 'absolute',
    left: '200%',
    transform: 'rotate(180deg)',
    width: 'max-content'
  },

  ...styles()
})

class Day extends React.Component {

  render() {
    const { tasks, pos, classes, mode } = this.props
    const lastTaskDate = tasks[0].date

    return (
      <div 
        className={classes.timeBlock} 
        style={{
          top:    `${ mode > 1 ? -pos * 70 : 0 }px`, 
          height: `${ mode > 0 ? 40 : 70 * tasks.length }px`
        }}
      >
        <TimeSeparator 
          mode={mode} 
          date={lastTaskDate} 
          fadeIn={mode === 0}
        />
        
        {mode === 1 && <p className={classes.tasks}>{tasks.length} tasks in this day</p>}

        {tasks.map((task, i) =>
          <Task task={task} mode={mode} key={i} pos={i} />
        )}
      </div>
    )
  }
}

export default withStyles(dayStyles)(Day)