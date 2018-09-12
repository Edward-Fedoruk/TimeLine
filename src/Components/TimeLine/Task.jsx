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
  },
  
})

class Task extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = { canDrag: false }

  //   this.timer = null
  // }

  // waitForDnD = e => {
  //   e.preventDefault()
  //   this.timer = setTimeout(() => {
  //     this.setState({ canDrag: true })
  //     console.log('can drag')
  //   }, 2000)
  // }
  

  // cancelDnD = () => {
  //   clearTimeout(this.timer)
  //   if(this.state.canDrag) {
  //     this.setState({ canDrag: false })
  //     console.log('cant drag')
  //   }
  // }

  // taskDrag = e => {
  //   console.log(this.props.refLine.current)
  //   console.log(e.clientY, window.innerHeight, window.innerHeight - e.clientY )
  //   e.target.style.top = window.innerHeight - e.clientY + 'px'
  // }

  currentTaskClick = e => {
    e.stopPropagation()
    console.log(this.props.canClick)
    if(this.props.canClick) this.props.taskClick()
    else this.props.resetDraggedTask()
  }

  render() {
    const { 
      classes, animation, 
      task: { opacity, taskPos, 
            taskHeader, taskDay, 
            taskHour } ,
      taskClick,
      refTask
    } = this.props

    return (
      <div
        style={{
          transition: `${animation ? 'all .3s linear' : ''}`,
          top: `${taskPos}px`, 
          opacity: `${opacity}`
        }}
        className={`${classes.task} task`}
        onClick={this.currentTaskClick}
        ref={refTask}
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