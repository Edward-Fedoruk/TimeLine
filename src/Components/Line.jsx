import React from 'react'
import { withStyles } from '@material-ui/core'

const styles = (theme) => ({
  wrap: {
    width: '100%',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },

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

  task: {
    width: '40px',
    height: '40px',
    backgroundColor: 'green',
    position: 'absolute',
    left: '0',
    transform: 'translate(-15%, -15%)',
    borderRadius: '50%',
    zIndex: '1',
  }
})

class Line extends React.Component {
  state = {
    lineHeight: 101,
    tasksPos: []
  }

  makeLine = e => {
    const windowHeight = document.documentElement.clientHeight
    if(window.scrollY === 0) {
      this.setState({ lineHeight: this.state.lineHeight + 100 })
      window.scrollBy(0, windowHeight)
    }
  }

  taskClick = e => e.stopPropagation()

  makeTask = e => {
    const taskPos = e.nativeEvent.offsetY

    // if(this.state.lines[id].tasksPos.length !== 0) {
    //   this.state.lines[id].tasksPos.map(pos => {
    //     console.log(taskPos, pos, pos - taskPos)
    //     pos - taskPos < 60 ? console.log('<60' ) : console.log('>60')
    //   })
    // }
    

    this.state.tasksPos.push(taskPos)

    this.setState({ tasksPos: this.state.tasksPos })
  }

  componentDidMount() {
    window.scrollBy(0, 5)
    window.addEventListener('scroll', this.makeLine)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.makeLine)
  }

  render() {
    const { classes } = this.props
    const { lineHeight, tasksPos } = this.state

    return (
      <div  className={classes.wrap}>
        <div className={classes.lineWrap}>

            <div 
              style={{ height: `${lineHeight}vh` }} 
              className={classes.fullHeightLine}
              onClick={this.makeTask}
            >
              {tasksPos.map((pos, i) => 
                <div
                  key={i}
                  style={{ top: `${pos}px` }}
                  className={classes.task}
                  onClick={this.taskClick}
                />
              )}
            </div>

        </div>
      </div>
    )
  }
} 

export default withStyles(styles)(Line)