import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Day from './Day'
import styles from './timeBlockStyles'

class Months extends React.Component {

  render() {
    const { days, classes, pos } = this.props
    return (
      <div 
        // style={{ top: `${ pos * 60 }px`, height: `${60 * this.props.days.length}px` }} 
        className={classes.timeBlock}
      >
        {days.map(tasks =>
          <Day tasks={tasks} /> 
        )}
      </div>
    )
  }
}

export default withStyles(styles)(Months)