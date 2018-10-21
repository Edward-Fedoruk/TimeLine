import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Transition } from 'react-transition-group'
import CurrentDateLine from './CurrentDateLine'


const styles = ({ timeLineSpaces }) => ({
  task: {
    width: `${timeLineSpaces.taskSize}px`,
    height: `${timeLineSpaces.taskSize}px`,
    borderRadius: '100%',
    backgroundColor: '#BEB2DB',
    position: 'relative',
    left: '50%',
    zIndex: '200',
    transform: 'translateX(-50%) rotate(180deg)',
    transition: 'top 2s ease-in-out',
    marginBottom: `${timeLineSpaces.taskOffset}px`,
    cursor: 'pointer',
    color: '#fff',
  },

  header: {
    fontSize: '1rem',
    position: 'absolute',
    left: '180%',
    transform: 'rotate(180deg)',
    width: 'max-content',
    transition: 'all 1s linear',
    margin: '0'
  },
  
  time: {
    fontSize: '12px',
    position: 'absolute',
    right: '180%',
    transform: 'rotate(180deg)',
    width: 'max-content',
    transition: 'opacity 1s linear',
    margin: '0',
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
        top: `${ mode === 0 ? 0 : -taskIndex * theme.timeLineSpaces.taskWithSpace }px`,          
      }} 
      className={classes.task}
      data-task={`${yearIndex} ${monthIndex} ${dayIndex} ${taskIndex}`}
    >
      {/* {console.log(currentTaskLine)}       */}
      <Transition
        mountOnEnter
        unmountOnExit
        in={mode === 0}
        timeout={1000}
      >
        {state => 
          <React.Fragment>
            <p 
              className={classes.header}
              style={{ opacity: `${state === 'entered' ? 1 : 0}` }}  
            > 
              {task.header} 
            </p>
            
            <p 
              className={classes.time}
              style={{ opacity: `${state === 'entered' ? 1 : 0}` }}  
            > 
              {newDate} 
            </p>       
          </React.Fragment>}
      </Transition>
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(Task)