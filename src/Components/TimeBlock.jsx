import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Task from './Task'

const styles = () => ({
  timeBlock: {
    height: '100vh',
    backgroundColor: 'gray',
    position: 'relative'
  }
})

class TimeBlock extends React.Component {
  render() {
    const { classes, timeBlock } = this.props
    return (
      <div className={classes.timeBlock}>
        {timeBlock.map(task =>
          <Task task={task} />
        )}
      </div>
    )
  }
}

export default withStyles(styles)(TimeBlock)