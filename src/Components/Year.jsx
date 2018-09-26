import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Month from './Month'
import styles from './timeBlockStyles'

class Years extends React.Component {

  render() {
    const { classes, months, pos } = this.props
    return (
      <div 
        className={classes.timeBlock} 
        // style={{ top: `${ pos * 60 }px`, height: `${60 * months.length}px` }}
      >
        {months.map((days, i) =>       
          <Month pos={i} key={i} days={days} />
        )}
      </div>
    )
  }
}

export default withStyles(styles)(Years)