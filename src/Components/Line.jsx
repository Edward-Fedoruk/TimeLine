import React from 'react'
import { withStyles } from '@material-ui/core'

const styles = (theme) => ({
  lineWrap: {
    width: '100%',
    backgroundColor: '#eee',
    overflow: 'hidden',
  },

  fullHeightLine: {
    width: '30px',
    height: '110vh',
    backgroundColor: '#a2a2a2',
    margin: '0 0 0 60%',
    position: 'relative',
    cursor: 'pointer'
  },

  task: {
    width: '40px',
    height: '40px',
    backgroundColor: 'green',
    position: 'absolute',
    left: '0',
    transform: 'translateX(-15%)',
    borderRadius: '50%',
    zIndex: '1'
  }
})

class Line extends React.Component {
  state = {
    lines: [
      {
        id: 0,
        task: false,
        tasksPos: []
      }
    ]
  }

  makeLine = e => {
    const windowHeight = document.documentElement.clientHeight
    if(window.scrollY <= 1) {
      this.state.lines.push(
        {
          id: 1 + this.state.lines[this.state.lines.length - 1].id,
          task: false,
          tasksPos: []
        }
      )
      this.setState({ lines: this.state.lines })
      window.scrollBy(0, windowHeight)
    }
  }

  makeTask = e => {
    const id = parseInt(e.target.dataset.id)
    const taskPos = e.nativeEvent.offsetY

    this.state.lines[id].tasksPos.push(taskPos)
    this.state.lines[id].task = true

    this.setState({ lines: this.state.lines })
  }

  taskClick = e => {
    e.stopPropagation()
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
    const { lines } = this.state
    return (
      <div className={classes.lineWrap}>

        {[...lines].reverse().map((line, i) => 
          <div 
            key={i} 
            data-id={`${line.id}`}
            onClick={this.makeTask} 
            className={classes.fullHeightLine}
          >
            {line.task &&
              line.tasksPos.map((pos, i) =>            
                <div 
                  key={i} 
                  className={classes.task} 
                  style={{top: `${pos}px`}}
                  onClick={this.taskClick}
                />
              )} 
          </div>
        )}

      </div>
    )
  }
} 

export default withStyles(styles)(Line)