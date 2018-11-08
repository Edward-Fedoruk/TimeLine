import React from 'react'
import { withStyles } from '@material-ui/core'
import Switch from '@material-ui/core/Switch'
import Cached from '@material-ui/icons/Cached'
import Typography from '@material-ui/core/Typography'


const styles = theme => ({
  selectionsWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  selectWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '13px',
    marginTop: '60px'
  },

  repeat: {
    marginRight: '10px'
  },

  repeatIcon: {
    cursor: 'pointer',
    fontSize: '30px',
    color: '#AAAAAA',
    transition: 'color .2s linear',
  },
})

const TaskSettings = ({ classes, remind, repeat, setTaskSettings, theme }) => (
  <div className={classes.selectionsWrap}>
    <div className={classes.selectWrap}>
      <Typography variant='subheading'>Remind me</Typography>
      <Switch
        checked={remind}
        onChange={() => setTaskSettings('remind')(!remind)}
        color="primary"
      />
    </div>

    <div className={classes.selectWrap}>
      <Typography variant='subheading' className={classes.repeat}>Repeat Task</Typography>
      <Cached 
        style={{ color: `${repeat ? theme.palette.primary.main : 'gray'}` }} 
        onClick={() => setTaskSettings('repeat')(!repeat)}
        className={classes.repeatIcon}
      />
    </div>
  </div>
)

export default withStyles(styles, { withTheme: true })(TaskSettings)