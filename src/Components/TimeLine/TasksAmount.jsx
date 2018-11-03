import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = () => ({
  tasksIn: {
    position: 'absolute',
    right: '300%',
    width: 'max-content',
    margin: '0'
  },

  wrap: {
    transition: 'opacity 1s',
    willChange: 'opacity'
  }
})

const modes = [ , 'day', 'month', 'year']

const TasksAmount = ({ classes, fadeIn, mode, tasks }) => (
  <div style={{ opacity: `${fadeIn ? 1 : 0}`  }} className={classes.wrap}>
    <Typography 
      className={classes.tasksIn}
      variant='subheading'
      color='secondary'
    >
      {fadeIn ? `${tasks} tasks in this ${modes[mode]}` : '' } 
    </Typography>
  </div> 
)

export default withStyles(styles)(TasksAmount)