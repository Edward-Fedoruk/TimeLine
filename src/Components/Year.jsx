import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Month from './Month'
import styles from './timeBlockStyles'

class Years extends React.Component {

  render() {
    const { classes, months, pos, mode } = this.props
    return (
      <div 
        className={classes.timeBlock} 
        style={{ 
          height: `${mode === 3 ? '40px' : `auto`}`,
        }}
      >
        {months.map((days, i) =>       
          <Month pos={i} key={i} mode={mode} days={days} />
        )}
      </div>
    )
  }
}

export default withStyles(styles)(Years)