import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Month from './Month'
import styles from './timeBlockStyles'
import TimeSeparator from './TimeSeparator'
import TasksAmount from './TasksAmount'
import TaskTime from './TaskTime'

class Years extends React.Component {

  getTasksInYear = () => 
    this.props.months.reduce((acum, day) => 
      acum + day.reduce((ac, cur) => ac + cur.length, 0), 
    0)

  setHeight(mode) {
    if(mode === 2) return `${this.props.months.length * 70}px`
    
    else if(mode > 2) return `70px`

    else if(mode === 1) {
      const sum = this.props.months.reduce((ac, cur) => ac + (cur.length * 70) + 30, 0)
      return `${sum - 30}px`
    }
    else if(mode === 0) {
      const sum = this.props.months.reduce((acum, day) => 
          acum + day.reduce((ac, cur) => ac + (cur.length * 70) + 30, 0), 
      0)
        console.log(sum)
      return `${sum - 30}px`
    }
  }

  render() {
    const { classes, months, mode } = this.props
    const lastTaskDate = months[0][0][0].date

    return (
      <div 
        className={classes.timeBlock} 
        style={{ 
          height: `${this.setHeight(mode)}`,
          transform: 'inherit'
        }}
        data-timeBlock="true"
      > 
        <TimeSeparator 
          mode={mode} 
          date={lastTaskDate} 
          fadeIn={mode === 2}
        />

        <TasksAmount
          fadeIn={mode === 3}
          mode={mode}
          tasks={this.getTasksInYear()}
        />

        <TaskTime
          date={lastTaskDate}
          fadeIn={mode === 3}
          mode={mode}
        /> 

        {months.map((days, i) =>
          <Month pos={i} key={i} mode={mode} days={days} />
        )}
        
      </div>
    )
  }
}

export default withStyles(styles)(Years)