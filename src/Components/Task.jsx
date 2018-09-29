import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  task: {
    width: '40px',
    height: '40px',
    borderRadius: '100%',
    backgroundColor: 'green',
    position: 'relative',
    left: '50%',
    zIndex: '100',
    transform: 'translateX(-50%)',
    transition: 'all 3s',
    marginBottom: '30px'
  },

  header: {
    fontSize: '12px',
    position: 'absolute',
    left: '120%',
    transform: 'rotate(180deg)',
    width: 'max-content'
  },

  time: {
    fontSize: '12px',
    position: 'absolute',
    right: '120%',
    transform: 'rotate(180deg)',
    width: 'max-content'
  },

})

class Task extends React.Component {
  render() {
    const { classes, pos, mode, task } = this.props
    return (
      <div 
        style={{ top: `${ mode === 0 ? 0 : -pos * 70 }px` }} 
        className={classes.task}
      >
        {console.log(task)}
        <p className={classes.header}> {mode === 0 && task.header} </p>
        <p className={classes.time}> {mode === 0 && task.date} </p>
      </div>
    )
  }
}

export default withStyles(styles)(Task)