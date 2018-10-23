import React from 'react'
import { withStyles, withTheme } from '@material-ui/core/styles'
import Month from './Month'
import styles from './timeBlockStyles'
import TimeDivider from './TimeDivider'
import TasksAmount from './TasksAmount'
import TaskTime from './TaskTime'

class Years extends React.Component {

  getTasksInYear = () => 
    this.props.months.reduce((acum, day) => 
      acum + day.reduce((ac, cur) => ac + cur.length, 0), 
    0)

  setHeight(mode) {
    const { months, theme } = this.props
    
    if(mode === 2) return `${months.length * theme.timeLineSpaces.taskWithSpace}px`
    
    else if(mode === 3) return `${theme.timeLineSpaces.taskSize}px`

    else if(mode === 1) {
      const sum = months.reduce((ac, cur) => ac + (cur.length * theme.timeLineSpaces.taskWithSpace) + theme.timeLineSpaces.taskOffset, 0)
      return `${sum - theme.timeLineSpaces.taskOffset}px`
    }

    else if(mode === 0) {
      const sum = months.reduce((acum, day) => 
        acum + day.reduce((ac, cur) => ac + (cur.length * theme.timeLineSpaces.taskWithSpace) + theme.timeLineSpaces.taskOffset, 0), 
      0)
        // console.log(sum)
      return `${sum - theme.timeLineSpaces.taskOffset}px`
    }
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.updTasks !== this.props.updTasks
      || nextProps.mode !== this.props.mode) return true
    else return false
  }

  componentDidUpdate() {
    console.log('test')
  }

  render() {
    const { classes, months, mode, yearIndex } = this.props
    const lastTaskDate = months[0][0][0].date

    return (
      <div 
        className={classes.timeBlock} 
        style={{ 
          height: `${this.setHeight(mode)}`,
          transform: 'inherit'
        }}
        data-timeblock="true"
      > 
        <TimeDivider 
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
          <Month yearIndex={yearIndex} monthIndex={i} key={i} mode={mode} days={days} />
        )}
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Years)