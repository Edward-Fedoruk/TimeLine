import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Transition } from 'react-transition-group'

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
      <Transition
        mountOnEnter
        unmountOnExit
        in={fadeIn}
        timeout={1500}
      >
        {state => 
          <div className={classes.line}></div>}
      </Transition>
    )
  }
}

export default withStyles(styles)(CurrentDateLine)