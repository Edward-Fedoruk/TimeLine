import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import TaskTime from './TaskTime'

const styles = () => ({
  task: {
    width: '40px',
    height: '40px',
    borderRadius: '100%',
    backgroundColor: 'green',
    position: 'relative',
    left: '50%',
    zIndex: '200',
    transform: 'translateX(-50%) rotate(180deg)',
    transition: 'all 3s ease-in-out',
    marginBottom: '30px'
    
  },

  header: {
    fontSize: '12px',
    position: 'absolute',
    left: '120%',
    transform: 'rotate(180deg)',
    width: 'max-content',
    transition: 'all 2s'
  },

  time: {
    fontSize: '12px',
    position: 'absolute',
    right: '120%',
    transform: 'rotate(180deg)',
    width: 'max-content',
    transition: 'all 2s'
  },

})

class Task extends React.Component {

  render() {
    const { classes, pos, mode, task } = this.props
    const newDate = new Date(task.date).toLocaleString('en-us', {
      hour: 'numeric',
      minute: 'numeric',
    })

    return (
      <div 
        style={{ 
          top: `${ mode === 0 ? 0 : -pos * 70 }px`,
          
        }} 
        className={classes.task}
      >
        <p 
          className={classes.header}
          style={{ opacity: `${mode === 0 ? 1 : 0}` }}  
        > 
          {task.header} 
        </p>

        <p 
          className={classes.time}
          style={{ opacity: `${mode === 0 ? 1 : 0}` }}  
        > 
          {newDate} 
        </p>       
      </div>
    )
  }
}

export default withStyles(styles)(Task)