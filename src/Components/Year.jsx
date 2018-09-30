import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Month from './Month'
import styles from './timeBlockStyles'
import TimeSeparator from './TimeSeparator'

class Years extends React.Component {

  render() {
    const { classes, months, mode } = this.props
    return (
      <div 
        className={classes.timeBlock} 
        style={{ 
          height: `${ mode === 3 ? '40px' : `auto` }`,
        }}
      > 
        <TimeSeparator 
          mode={mode} 
          date={months[0][0][0].date} 
          fadeIn={mode > 1}
        />

        {months.map((days, i) =>
          <Month pos={i} key={i} mode={mode} days={days} />
        )}
      </div>
    )
  }
}

export default withStyles(styles)(Years)