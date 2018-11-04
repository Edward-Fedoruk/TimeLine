import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = ({ timeLineSpaces }) => ({
  task: {
    width: `${timeLineSpaces.taskSize}px`,
    height: `${timeLineSpaces.taskSize}px`,
    borderRadius: '100%',
    backgroundColor: '#BEB2DB',
    position: 'relative',
    left: '50%',
    zIndex: '200',
    transition: 'transform 2s ease-in-out',
    marginBottom: `${timeLineSpaces.taskOffset}px`,
    cursor: 'pointer',
    willChange: 'transform'
  },

  header: {
    position: 'absolute',
    left: '180%',
    transform: 'rotate(180deg)',
    width: 'max-content',
    transition: 'opacity 2s linear',
    margin: '0',
    willChange: 'opacity'
  },
  
  time: {
    fontSize: '12px',
    position: 'absolute',
    right: '180%',
    transform: 'rotate(180deg)',
    width: 'max-content',
    transition: 'opacity 2s linear',
    margin: '0',
    willChange: 'opacity',
    bottom: '0'
  },

})

const Task = ({ 
  classes, yearIndex, dayIndex, 
  monthIndex, taskIndex, mode, 
  task, theme, currentTaskLine
}) => {
  const newDate = new Date(task.date).toLocaleString('en-us', {
    hour: 'numeric',
    minute: 'numeric',
  })
  
  return (
    <div 
      style={{ 
        transform: `
          translateX(-50%) 
          rotate(180deg) 
          translateY(${ mode === 0 ? 0 : taskIndex * theme.timeLineSpaces.taskWithSpace }px)
        `
      }} 
      className={classes.task}
      data-task={`${yearIndex} ${monthIndex} ${dayIndex} ${taskIndex}`}
    >
      <Typography 
        variant='subheading'
        color='secondary'
        className={classes.header}
        style={{ opacity: `${mode === 0 ? 1 : 0}` }}  
      > 
        {task.header} 
      </Typography>
      
      <Typography 
        color='secondary'
        noWrap
        className={classes.time}
        style={{ opacity: `${mode === 0 ? 1 : 0}` }}  
      > 
        {newDate} 
      </Typography>       
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(Task)