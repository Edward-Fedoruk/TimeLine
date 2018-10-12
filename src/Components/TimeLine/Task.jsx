import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  task: {
    width: '14px',
    height: '14px',
    borderRadius: '100%',
    backgroundColor: '#BEB2DB',
    position: 'relative',
    left: '50%',
    zIndex: '200',
    transform: 'translateX(-50%) rotate(180deg)',
    transition: 'all 3s ease-in-out',
    marginBottom: '30px',
    cursor: 'pointer',
    color: '#fff'
  },

  header: {
    fontSize: '12px',
    position: 'absolute',
    left: '180%',
    transform: 'rotate(180deg)',
    width: 'max-content',
    transition: 'all 2s',
    margin: '0'
  },

  time: {
    fontSize: '12px',
    position: 'absolute',
    right: '180%',
    transform: 'rotate(180deg)',
    width: 'max-content',
    transition: 'all 2s',
    margin: '0'
  },

})

class Task extends React.Component {

  render() {
    const { classes, yearIndex, dayIndex, monthIndex, taskIndex, mode, task } = this.props
    const newDate = new Date(task.date).toLocaleString('en-us', {
      hour: 'numeric',
      minute: 'numeric',
    })
    return (
      <div 
        style={{ 
          top: `${ mode === 0 ? 0 : -taskIndex * 70 }px`,          
        }} 
        className={classes.task}
        data-task={`${yearIndex} ${monthIndex} ${dayIndex} ${taskIndex}`}
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