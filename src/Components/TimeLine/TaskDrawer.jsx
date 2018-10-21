import React from 'react'
import { withStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
import DateTimePicker from 'react-datetime-picker'
import Cached from '@material-ui/icons/Cached'
import classNames from 'classnames';

const styles = ({ palette }) => ({
  drawerWrap: {
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: '0 auto' 
  },

  date: {
    width: '50%'
  },

  pickDate: {
    width: '50%'
  },

  datePicker: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: '20px',
  },

  selectionsWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
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
    width: '350px',
    paddingTop: '26px',
    backgroundColor: palette.secondary.main,
    opacity: '.97',
  },

  dateInput: {
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
 
  formatDate = taskDate => {
    const date = new Date(taskDate)
    const editDate = x => x < 10 ? '0' + x : x

    const year = date.getFullYear()
    const month = editDate(1 + date.getMonth())
    const day = editDate(date.getDate())
    const hours = editDate(date.getHours())
    const minutes = editDate(date.getMinutes())

    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isOnlySpaces', value => /\S/.test(value))
    ValidatorForm.addValidationRule('badDateFormat', date => !isNaN(Date.parse(`${date}`)))
  }

  render() {
    const { 
      classes, taskDrawer, submitTask, 
      taskHeader, taskDescr, taskDate,
      setTaskFields, deleteTask, taskCreation,
      cancelCreation
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
              onChange={setTaskFields("taskHeader")} 
              name="taskHeader" 
              value={taskHeader}
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
              onChange={setTaskFields("taskDescr")}
              value={taskDescr}
            />            

            <div className={classes.datePicker}>
              <Typography className={classes.pickDate} variant='subheading'>
                Pick Day / Time
              </Typography>
              <DateTimePicker
                value={taskDate}
                isCalendarOpen={false}
                disableClock={true}
                calendarIcon={null}
                clearIcon={null}
                view={null}
                className={classes.dateInput}
              />
              {/* <TextValidator 
                className={classes.date}
                fullWidth
                name="date" 
                margin="normal" 
                validators={['badDateFormat']}
                errorMessages={['bad date format']}
                type="datetime-local" 
                value={this.formatDate(taskDate)}              
                onChange={setTaskFields("taskDate")}
              /> */}
            </div>
            
            <div className={classes.selectionsWrap}>
              <div className={classes.selectWrap}>
                <Typography variant='subheading'>Remind me</Typography>
                <Switch
                  // checked={this.state.checkedA}
                  // onChange={this.handleChange('checkedA')}
                  value="checkedA"
                  color="primary"
                />
              </div>

              <div className={classes.selectWrap}>
                <Typography variant='subheading' className={classes.repeat}>Repeat Task</Typography>
                <Cached className={classes.repeatIcon}/>
              </div>

              <div className={classes.selectWrap}>
                <Typography variant='subheading'>Priority</Typography>
                <div className={classes.grey}></div>
                <div className={classes.yellow}></div>
              </div>
            </div>
            
            <div className={classes.buttonsWrap}>
              <Button 
                type="submit"
                variant="contained" 
                color="primary" 
                type="submit"
                disabled={false}
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

export default withStyles(styles)(TaskDrawer)