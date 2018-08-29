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
    transform: 'translateX(-50%)'
  }
})

class Line extends React.Component {
  state = {
    lines: []
  }

  makeLine = e => {
    const windowHeight = document.documentElement.clientHeight
    if(window.scrollY <= 1) {
      this.state.lines.unshift('item')
      this.setState({ lines: this.state.lines })
      window.scrollBy(0, windowHeight)
    }
  }

  makeTask = (e) => {
    console.log(e.nativeEvent.offsetY)
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

        {lines.map((line, i) => 
          <div 
            key={i} 
            onClick={this.makeTask} 
            className={classes.fullHeightLine}
          >
            line
          </div>)}

        <div 
          onClick={this.makeTask} 
          className={classes.fullHeightLine}
        >
          hello
        </div>

      </div>
    )
  }
} 

export default withStyles(styles)(Line)