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
  }

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

  componentWillUnmount() {
    window.removeEventListener('scroll', this.makeLine)
  }

  render() {
    const { allTasks, classes, makeTask, 
            taskClick, animation } = this.props

    return (
      <div className={classes.lineWrap}>
        <div 
          style={{ height: `${this.state.lineHeight}vh` }} 
          className={classes.fullHeightLine}
          onClick={makeTask}
        >
          {allTasks.map((task, i) => 
            <Task 
              key={i}
              task={task}
              animation={animation}
              taskClick={taskClick(i)}
            />
          )}
        </div>
      </div>
    )
  }
  
}

export default withStyles(styles)(Line)