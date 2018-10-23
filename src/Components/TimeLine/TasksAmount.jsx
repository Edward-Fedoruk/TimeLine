import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Transition } from 'react-transition-group'
import Typography from '@material-ui/core/Typography'

const styles = () => ({
  tasksIn: {
    position: 'absolute',
    right: '300%',
    width: 'max-content',
    margin: '0'
  },

  wrap: {
    transition: 'opacity 1s'
  }
})

const modes = [ , 'day', 'month', 'year']

const TasksAmount = ({ classes, fadeIn, mode, tasks }) => (
  <Transition
    mountOnEnter
    unmountOnExit
    in={fadeIn}
    timeout={1000}
  >
    {state => 
      <div style={{ opacity: `${state === 'entered' ? 1 : 0}`  }} className={classes.wrap}>
        <Typography 
          className={classes.tasksIn}
          variant='subheading'
          color='secondary'
        >
          {state === 'entered' ? `${tasks} tasks in this ${modes[mode]}` : '' } 
        </Typography>
      </div>}
  </Transition>
)

export default withStyles(styles)(TasksAmount)