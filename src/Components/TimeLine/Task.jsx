import React from 'react'
import { withStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = (theme) => ({
  task: {
    width: '40px',
    height: '40px',
    backgroundColor: 'green',
    position: 'absolute',
    left: '0',
    transform: 'translate(-15%, -70%)',
    borderRadius: '50%',
    zIndex: '1',
    willChange: 'top',
  },

  textWrap: {
    position: 'absolute',
    bottom: '50%',
    transform: 'rotate(180deg) translate(-50%, -50%)',
    padding: '10px'
  },

  text: {
    width: '14vw'
  },

  dateWrap: {
    bottom: '50%',
    transform: 'rotate(180deg) translate(150%, -50%)',
    position: 'absolute',
    display: 'flex',
    width: '100px',
    justifyContent: 'space-between'
  }
})

class Task extends React.Component {

  render() {
    const { 
      classes, animation, 
      task: { opacity, taskPos, 
            taskHeader, taskDay, 
            taskHour } ,
      taskClick
    } = this.props

    return (
      <div
        style={{transition: `${animation ? 'all .3s linear' : ''}`, top: `${taskPos}px`, 
      opacity: `${opacity}`}}
        className={classes.task}
        onClick={taskClick}
      > 
        <Paper className={classes.textWrap}>
          <Typography  
            className={classes.text} 
            component="p"
          >
            {taskHeader}
          </Typography>
        </Paper>

        <Paper className={classes.dateWrap}>
          <Typography  
            component="p"
          >
            {taskDay}
          </Typography>
          <Typography  
            component="p"
          >
            {taskHour}
          </Typography>
        </Paper>
      </div>
    )
  }
} 

export default withStyles(styles)(Task)