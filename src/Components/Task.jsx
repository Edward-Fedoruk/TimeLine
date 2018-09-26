import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  task: {
    width: '40px',
    height: '40px',
    borderRadius: '100%',
    backgroundColor: 'green',
    // position: 'absolute',
    // left: '50%',
    zIndex: '100',
    transform: 'translateX(-50%)',
    transition: 'all 3s'
  }
})

class Task extends React.Component {
  render() {
    const { classes, pos } = this.props
    return (
      <div style={{ top: `${ pos * 40 }px` }} className={classes.task}>
        
      </div>
    )
  }
}

export default withStyles(styles)(Task)