import React from 'react'
import TextField from '@material-ui/core/TextField'
import { TextValidator} from 'react-material-ui-form-validator'

const TextFields = ({ header, desc, setTaskTextFields }) => (
  <React.Fragment>
    <TextValidator 
      margin="normal" 
      label="Task Name"
      fullWidth
      onChange={setTaskTextFields("header")} 
      name="header" 
      value={header}
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
      value={desc}
    />           
  </React.Fragment>
)

export default TextFields