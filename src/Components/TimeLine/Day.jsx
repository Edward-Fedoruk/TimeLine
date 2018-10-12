import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Task from './Task'
import styles from './timeBlockStyles'
import TimeDivider from './TimeDivider'
import TasksAmount from './TasksAmount'
import TaskTime from './TaskTime'

const dayStyles = () =>({
  TimeDivider: {
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
    const { tasks, monthIndex, classes, mode, yearIndex, dayIndex } = this.props
    const lastTaskDate = tasks[0].date
    return (
      <div 
        className={classes.timeBlock} 
        data-timeblock="true"
        style={{
          top:    `${ mode > 1 ? -dayIndex * 70 : 0 }px`, 
          height: `${ mode > 0 ? 40 : 70 * tasks.length }px`
        }}
      >
        <TimeDivider 
          mode={mode} 
          date={lastTaskDate} 
          fadeIn={mode === 0}
        />
        
        <TasksAmount
          fadeIn={mode === 1}
          mode={mode}
          tasks={tasks.length}
        />

        <TaskTime
          date={lastTaskDate}
          fadeIn={mode === 1}
          mode={mode}
        />

        {tasks.map((task, i) =>
          <Task task={task} mode={mode} key={i} yearIndex={yearIndex} monthIndex={monthIndex} dayIndex={dayIndex} taskIndex={i} />
        )}
      </div>
    )
  }
}

export default withStyles(dayStyles)(Day)