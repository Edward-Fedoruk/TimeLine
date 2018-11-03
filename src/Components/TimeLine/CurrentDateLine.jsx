import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  line: {
    position: 'absolute',
    bottom: 0,
    width: '100vw',
    height: '1px',
    background: 'red',
    left: '-75vw',
    transition: 'opacity 1s',
    opacity: '1',
    transform: 'rotate(180deg)',
    willChange: 'opacity'
  },
})

class CurrentDateLine extends React.Component {
  render() {
    const { classes, fadeIn } = this.props
    return (
      <div className={classes.line}></div>
    )
  }
}

export default withStyles(styles)(CurrentDateLine)