import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Day from './Day'
import styles from './timeBlockStyles'
import TimeSeparator from './TimeSeparator'

class Months extends React.Component {

  setHeight(mode) {
    if(mode === 1) return `${this.props.days.length * 70}px`
    
    else if(mode > 1) return `40px`

    else if(mode === 0) {
      const sum = this.props.days.reduce((ac, cur) => ac + (cur.length * 70) + 30, 0)
      return `${sum - 30}px`
    }
  }

  render() {
    const { days, classes, pos, mode } = this.props
    return (
      <div 
        style={{ 
          top: `${ mode > 2 ? -pos * 70 : 0 }px`, 
          height: `${this.setHeight(mode)}`,
        }}
        className={classes.timeBlock}
      >
        <TimeSeparator 
          mode={mode} 
          date={days[0][0].date} 
          fadeIn={mode === 1}
        />

        {days.map((tasks, i) =>
          <Day mode={mode} key={i} pos={i} tasks={tasks} /> 
        )}
      </div>
    )
  }
}

export default withStyles(styles)(Months)