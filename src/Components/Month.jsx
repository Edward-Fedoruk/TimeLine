import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Day from './Day'
import styles from './timeBlockStyles'

class Months extends React.Component {
  // height: `${ mode === 1 ? days.length * 40 : null }px`
  setStyles = mode => {
    if(mode === 2) {
      return  '40px' 
    }
    else if(mode === 1) {
      return `${ this.props.days * 40 }px`
    }
    
  }
  render() {
    const { days, classes, pos, mode } = this.props
    return (
      <div 
        style={{ 
          position: 'relative', 
          top: `${ mode > 2 ? -(pos * 40) : 0 }px`, 
          height: `${mode > 1 ? '40px' : mode === 1 ? `${days.length * 40}px` : `auto`}`,
        }}
        className={classes.timeBlock}
      >
        {days.map((tasks, i) =>
          <Day mode={mode} key={i} pos={i} tasks={tasks} /> 
        )}
      </div>
    )
  }
}

export default withStyles(styles)(Months)