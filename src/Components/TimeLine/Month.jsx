import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Day from './Day'
import styles from './timeBlockStyles'
import TimeDivider from './TimeDivider'
import TasksAmount from './TasksAmount'
import TaskTime from './TaskTime'

const getTasksInMonth = (days) => 
  days.reduce((ac, cur) => ac + cur.length, 0)

const setHeight = (mode, days, theme) => {
  if(mode === 1) return `${days.length * theme.timeLineSpaces.taskWithSpace}px`

  else if(mode > 1) return `${theme.timeLineSpaces.taskSize}px`

  else if(mode === 0) { 
    const monthBlockH = days.reduce((ac, cur) => ac + (cur.length * theme.timeLineSpaces.taskWithSpace) + theme.timeLineSpaces.taskOffset, 0)
    return `${monthBlockH - theme.timeLineSpaces.taskOffset}px`
  }
}

const Months = ({ 
  days, classes, yearIndex, 
  mode, monthIndex, theme 
}) => {
  const lastTaskDate = days[0][0].date    
  return (
    <div 
      style={{ 
        top: `${ mode > 2 ? -monthIndex * theme.timeLineSpaces.taskWithSpace : 0 }px`, 
        height: `${setHeight(mode, days, theme)}`,
      }}
      data-timeblock="true"
      className={classes.timeBlock}
    >
      <TimeDivider 
        mode={mode} 
        date={lastTaskDate} 
        fadeIn={mode === 1}
      />

      <TasksAmount
        fadeIn={mode === 2}
        mode={mode}
        tasks={getTasksInMonth(days)}
      />

      <TaskTime
        date={lastTaskDate}
        fadeIn={mode === 2}
        mode={mode}
      /> 

      {days.map((tasks, i) =>
        <Day 
          mode={mode} 
          key={i} 
          yearIndex={yearIndex} 
          monthIndex={monthIndex} 
          dayIndex={i} 
          tasks={tasks} 
        /> 
      )}
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(Months)