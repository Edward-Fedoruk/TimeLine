import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Transition } from 'react-transition-group'

const styles = () => ({
  tasksIn: {
    fontSize: '1rem',
    position: 'absolute',
    right: '300%',
    width: 'max-content',
    color: '#fff',
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
        <p className={classes.tasksIn}>
          {state === 'entered' ? `${tasks} tasks in this ${modes[mode]}` : '' } 
        </p>
      </div>}
  </Transition>
)

export default withStyles(styles)(TasksAmount)