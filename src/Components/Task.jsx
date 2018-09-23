import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  task: {
    width: '40px',
    height: '40px',
    borderRadius: '100%',
    backgroundColor: 'green',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)'
  }
})

class Task extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.task}>
        
      </div>
    )
  }
}

export default withStyles(styles)(Task)