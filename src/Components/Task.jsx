import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  task: {
    width: '40px',
    height: '40px',
    borderRadius: '100%',
    backgroundColor: 'green',
    position: 'relative',
    // left: '50%',
    zIndex: '100',
    transform: 'translateX(-50%)',
    transition: 'all 3s'
  }
})

class Task extends React.Component {
  render() {
    const { classes, pos, mode } = this.props
    return (
      <div style={{ top: `${ mode === 0 ? 0 : -(pos * 40) }px`,  }} className={classes.task}>
        
      </div>
    )
  }
}

export default withStyles(styles)(Task)