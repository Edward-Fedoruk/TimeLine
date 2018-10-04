import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Day from './Day'
import styles from './timeBlockStyles'
import TimeSeparator from './TimeSeparator'
import TasksAmount from './TasksAmount'
import TaskTime from './TaskTime'


class Months extends React.Component {

  getTasksInMonth = () => 
    this.props.days.reduce((ac, cur) => ac + cur.length, 0)

  setHeight(mode) {
    if(mode === 1) return `${this.props.days.length * 70}px`
    
    else if(mode > 1) return `40px`

    else if(mode === 0) {
      const monthBlockH = this.props.days.reduce((ac, cur) => ac + (cur.length * 70) + 30, 0)
      return `${monthBlockH - 30}px`
    }
  }

  render() {
    const { days, classes, pos, mode } = this.props
    const lastTaskDate = days[0][0].date
    
    return (
      <div 
        style={{ 
          top: `${ mode > 2 ? -pos * 70 : 0 }px`, 
          height: `${this.setHeight(mode)}`,
        }}
        data-timeBlock="true"
        className={classes.timeBlock}
      >
        <TimeSeparator 
          mode={mode} 
          date={lastTaskDate} 
          fadeIn={mode === 1}
        />

        <TasksAmount
          fadeIn={mode === 2}
          mode={mode}
          tasks={this.getTasksInMonth()}
        />

        <TaskTime
          date={lastTaskDate}
          fadeIn={mode === 2}
          mode={mode}
        /> 

        {days.map((tasks, i) =>
          <Day mode={mode} key={i} pos={i} tasks={tasks} /> 
        )}
      </div>
    )
  }
}

export default withStyles(styles)(Months)