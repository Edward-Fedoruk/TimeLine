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
    width: '14vw',
    userSelect: 'none'
  },

  dateWrap: {
    bottom: '50%',
    transform: 'rotate(180deg) translate(150%, -50%)',
    position: 'absolute',
    display: 'flex',
    width: '100px',
    justifyContent: 'space-between',
    userSelect: 'none'

  },
  
})

class Task extends React.Component {
  state = {
    draggedTask: false
  }

  currentTaskClick = e => {
    e.stopPropagation()
    this.setState({ draggedTask: false })
    if(this.props.canClick) this.props.taskClick()
    else this.props.resetDraggedTask()
  }

  render() {
    const { 
      classes, animation, 
      task: { opacity, taskPos, 
            taskHeader, taskDay, 
            taskHour } ,
      waitForDnD,
    } = this.props
    const { draggedTask } = this.state
    return (
      <div
        style={{
          transition: `${animation ? 'all .3s linear' : ''}`,
          top: `${taskPos}px`, 
          opacity: `${opacity}`,
          width: `${draggedTask ? 45 : 40}px`,
          height: `${draggedTask ? 45 : 40}px`
        }}
        className={`${classes.task} task`}
        onClick={this.currentTaskClick}
        onMouseDown={e => {this.setState({draggedTask: true}); waitForDnD(e)}}
        onTouchStart={e => {e.preventDefault(); this.setState({draggedTask: true}); waitForDnD(e)}}
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