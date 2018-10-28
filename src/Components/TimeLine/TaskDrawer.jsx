import React from 'react'
import { withStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
import Cached from '@material-ui/icons/Cached'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos'
import CalendarToday from '@material-ui/icons/CalendarToday'
import AccessTime from '@material-ui/icons/AccessTime'
import DateTimePicker from 'material-ui-pickers/DateTimePicker'

const styles = ({ palette }) => ({
  drawerWrap: {
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: '0 auto' 
  },

  date: {
    width: '70%',
  },

  datePicker: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '70px',
  },

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

  repeat: {
    marginRight: '10px'
  },

  repeatIcon: {
    cursor: 'pointer',
    fontSize: '30px',
    color: '#AAAAAA',
    transition: 'color .2s linear',
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

  drawer: {
    width: '310px',
    paddingTop: '10px',
    backgroundColor: palette.secondary.main,
    opacity: '.97',
  },

  dateInput: {
    borderBottom: '1px red',
    '& .react-datetime-picker__wrapper': {
      border: 'none',
    }
  },

  buttonsWrap: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '70px'
  }
})

class TaskDrawer extends React.Component {
  state = {
    invalidDate: false
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isOnlySpaces', value => /\S/.test(value))
    // ValidatorForm.addValidationRule('badDateFormat', date => !isNaN(Date.parse(`${date}`)))
  }

  render() {
    const { 
      classes, taskDrawer, submitTask, 
      taskInfo, setTaskDate, theme,
      setTaskTextFields, deleteTask, taskCreation,
      cancelCreation, setTaskSettings
    } = this.props

    return (
      <Drawer
       open={taskDrawer} 
       anchor="right"
       classes={{paper: classes.drawer}}
      > 
        <div className={classes.drawerWrap}>
          <ValidatorForm onSubmit={submitTask}>    
            <TextValidator 
              margin="normal" 
              label="Task Name"
              fullWidth
              onChange={setTaskTextFields("header")} 
              name="header" 
              value={taskInfo.header}
              multiline 
              validators={['required', 'isOnlySpaces', 'minStringLength:1', 'maxStringLength:50']}
              errorMessages={['this field is required', 'must consist not only from spaces', 'must contain at least 1 characters', 'password must contain no more then 50 characters']}
            />

            <TextField  
              margin="normal" 
              rowsMax="15" 
              fullWidth
              label="Task Description"
              multiline 
              inputProps={{maxLength: "150"}}
              onChange={setTaskTextFields("desc")}
              value={taskInfo.desc}
            />            

            <div className={classes.datePicker}>
              <Typography className={classes.pickDate} variant='subheading'>
                Pick Date
              </Typography>

              <DateTimePicker
                className={classes.date}
                leftArrowIcon={<ArrowBackIos/>}
                rightArrowIcon={<ArrowForwardIos/>}
                dateRangeIcon={<CalendarToday/>}
                timeIcon={<AccessTime/>}
                autoOk
                minDateMessage={false}
                showTodayButton
                animateYearScrolling
                invalidLabel={'invalid date'}
                disablePast
                value={taskInfo.date}
                onChange={setTaskDate}
              />
            </div>
            
            <div className={classes.selectionsWrap}>
              <div className={classes.selectWrap}>
                <Typography variant='subheading'>Remind me</Typography>
                <Switch
                  checked={taskInfo.remind}
                  onChange={() => setTaskSettings('remind', !taskInfo.remind)}
                  color="primary"
                />
              </div>

              <div className={classes.selectWrap}>
                <Typography variant='subheading' className={classes.repeat}>Repeat Task</Typography>
                <Cached 
                  style={{ color: `${taskInfo.repeat ? theme.palette.primary.main : 'gray'}` }} 
                  onClick={() => setTaskSettings('repeat', !taskInfo.repeat)}
                  className={classes.repeatIcon}
                />
              </div>

              <div className={classes.selectWrap}>
                <Typography variant='subheading'>Priority</Typography>
                <div style={{ border: `${taskInfo.priority === 0 && `2px solid ${theme.palette.primary.main}` }` }} className={classes.grey}></div>
                <div style={{ border: `${taskInfo.priority === 0 && `2px solid ${theme.palette.primary.main}` }` }} className={classes.yellow}></div>
              </div>
            </div>
            
            <div className={classes.buttonsWrap}>
              <Button 
                type="submit"
                variant="contained" 
                color="primary" 
                type="submit"
                disabled={taskInfo.header === ""}
                size="medium"
              >
                OK
              </Button>
              {taskCreation 
                ? <Button 
                    onClick={cancelCreation}
                    color="inherit"
                    variant="contained"
                    size="medium"
                  >
                    Cancel
                  </Button>
                : <Button 
                    onClick={deleteTask}
                    color="inherit"
                    variant="contained"
                    size="medium"
                  >
                    Delete
                  </Button>}
            </div>
          </ValidatorForm>
        </div>
      </Drawer>
    )
  }

} 

export default withStyles(styles, { withTheme: true })(TaskDrawer)