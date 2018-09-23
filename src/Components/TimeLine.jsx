import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import TimeBlock from './TimeBlock'

const styles = () => ({
  lineWrap: {
    height: '100vh',
    overflowY: 'scroll',
    width: '100vw',
    position: 'absolute',
    bottom: '0'
  },

  line: {
    width: '20px',
    position: 'absolute',
    left: '60%'
  }
})

class FullLine extends React.Component {
  state = {
    allTasks: [ [0, 1, 2], [2], [1] ],  
    mode: 'hours'
  }

  render() {
    const { classes } = this.props
    const { allTasks, mode } = this.state

    return (
      <div className={classes.lineWrap}>
        <div className={classes.line}>
          {allTasks.map(timeBlock => 
            <TimeBlock mode={mode} timeBlock={timeBlock} />
          )}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(FullLine)