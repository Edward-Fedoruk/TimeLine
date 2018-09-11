import React from 'react'
import { withStyles } from '@material-ui/core'
import Task from './Task'

const styles = (theme) => ({
  lineWrap: {
    width: 'fit-content',
    backgroundColor: '#eee',
    margin: '0 0 0 60%',
    zIndex: '2'
  },

  fullHeightLine: {
    width: '30px',
    height: '101vh',
    backgroundColor: '#a2a2a2',
    position: 'relative',
    cursor: 'pointer',
    transform: 'rotate(180deg)'
  },
})

class Line extends React.Component  {
  state = {
    lineHeight: 300,
    canDrag: false
  }

  refTask = React.createRef()
  timer = null

  makeLine = e => {
    const windowHeight = document.documentElement.clientHeight
    if(window.scrollY <= 0) {
      this.setState({ lineHeight: this.state.lineHeight + 100 }, 
      () => {
        console.log(windowHeight)
        window.scrollBy(0, windowHeight)
      })
    }
  }

  componentDidMount() {
    const windowHeight = document.documentElement.clientHeight * 3
    window.scrollBy(0, windowHeight)
    window.addEventListener('scroll', this.makeLine) 
  }

  taskDrag = e => {
    console.log(this.refTask.current, e.target)
    this.refTask.current.style.top = window.innerHeight - e.clientY + 'px'

  }

  waitForDnD = e => {
    e.preventDefault()
    console.log(e.target.classList)
    if([...e.target.classList].includes('task'))
      this.timer = setTimeout(() => {
        this.setState({ canDrag: true })
        console.log('can drag')
      }, 2000)
  }   

  cancelDnD = e => {
    e.preventDefault()
    clearTimeout(this.timer)
    if(this.state.canDrag) {
      this.setState({ canDrag: false })
      console.log('cant drag')
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.makeLine)
  }

  render() {
    const { allTasks, classes, makeTask, 
            taskClick, animation } = this.props
    const { canDrag, lineHeight } = this.state

    return (
      <div className={classes.lineWrap}>
        <div 
          style={{ height: `${lineHeight}vh` }} 
          className={classes.fullHeightLine}
          onClick={makeTask}
          onMouseDown={this.waitForDnD}
          onMouseMove={canDrag ? this.taskDrag : null}
          onMouseUp={this.cancelDnD}
          ref={this.refLine}
        >
          {allTasks.map((task, i) => 
            <Task 
              key={i}
              task={task}
              animation={animation}
              taskClick={taskClick(i)}
              canDrag={this.state.canDrag}
              refTask={this.refTask}
            />
          )}
        </div>
      </div>
    )
  }
  
}

export default withStyles(styles)(Line)