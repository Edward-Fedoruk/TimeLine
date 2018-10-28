import React from 'react'
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  selectionsWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    overflow: 'scroll'
  },

  selectWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '13px',
    marginTop: '70px'
  },

  grey: { 
    width: '24px',
    height: '24px',
    backgroundColor: '#E5E5E5',
    borderRadius: '50%',
    marginLeft: '42px' 
  },

  yellow: {
    width: '24px',
    height: '24px',
    backgroundColor: '#FCFC2E',
    borderRadius: '50%',
    marginLeft: '42px' 
  },
})

const TaskPriority = ({ classes, priority, theme }) => (
  <div className={classes.selectionsWrap}>
    <div className={classes.selectWrap}>
      <Typography variant='subheading'>Priority</Typography>
      <div style={{ border: `${priority === 0 && `2px solid ${theme.palette.primary.main}` }` }} className={classes.grey}></div>
      <div style={{ border: `${priority === 0 && `2px solid ${theme.palette.primary.main}` }` }} className={classes.yellow}></div>
    </div>
  </div>
)

export default withStyles(styles, { withTheme: true })(TaskPriority)