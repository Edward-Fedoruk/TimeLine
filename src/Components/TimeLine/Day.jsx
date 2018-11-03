import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Task from './Task'
import styles from './timeBlockStyles'
import TimeDivider from './TimeDivider'
import TasksAmount from './TasksAmount'
import TaskTime from './TaskTime'

const Day = ({ 
  tasks, monthIndex, classes, 
  mode, yearIndex, dayIndex, theme 
}) => {
  const lastTaskDate = tasks[0].date
  return (
    <div 
      className={classes.timeBlock} 
      data-timeblock="true"
      style={{
        transform: `translateY(${ mode > 1 ? -dayIndex * theme.timeLineSpaces.taskWithSpace : 0 }px)`, 
        height: `${ mode > 0 ? theme.timeLineSpaces.taskSize : theme.timeLineSpaces.taskWithSpace * tasks.length }px`
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

      {
        tasks.map((task, i) =>
            <Task 
              task={task}
              mode={mode} 
              key={i} 
              yearIndex={yearIndex} 
              monthIndex={monthIndex} 
              dayIndex={dayIndex} 
              taskIndex={i}
            />
          )
      }
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(Day)