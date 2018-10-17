import React from 'react'
import { withStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'

const styles = ({ palette }) => ({
  drawerWrap: {
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: '0 auto' 
  },
  
  taskFormField: {
    // padding: '20px',
    // width: '100%'
  },

  drawer: {
    width: '350px',
    paddingTop: '36px',
    backgroundColor: palette.secondary.main,
    opacity: '.97',
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
              className={classes.taskFormField} 
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
              className={classes.taskFormField} 
            />

            <TextValidator 
              fullWidth
              name="date" 
              margin="normal" 
              validators={['badDateFormat']}
              errorMessages={['bad date format']}
              type="datetime-local" 
              value={this.formatDate(taskDate)}              
              onChange={setTaskFields("taskDate")}
              className={classes.taskFormField} 
            />

            <Button type="submit">OK</Button>
            {taskCreation 
              ? <Button onClick={cancelCreation}>Cancel</Button>
              : <Button onClick={deleteTask}>Delete</Button>}
          </ValidatorForm>
        </div>
      </Drawer>
    )
  }

} 

export default withStyles(styles)(TaskDrawer)