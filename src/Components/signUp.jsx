import React from 'react'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import formStyles  from './formStyles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'


class signUp extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    disabled: true
  }

  onSubmit = e => {
    e.preventDefault()
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isPasswordMatch', 
      value => value === this.state.password)

    ValidatorForm.addValidationRule('isName', 
      value => value.length <= 24)
  }

  onChange = input => e => this.setState({ [input]: e.target.value })

  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <Paper className={classes.paper} elevation={1}>
          <ValidatorForm
            ref="form"
            onSubmit={this.onSubmit}
            onError={errors => console.log(errors)}
          >

            <Typography 
              variant="headline" 
              align="center" 
              component="h1"
            >
              Sign up to TimeLine or <Link to='/login'>log in</Link>
            </Typography>

            <TextValidator
              label="Name"
              placeholder="e.g., Landi Carl"
              margin="normal"
              className={classes.textField}
              autoFocus	
              name="name"
              onChange={this.onChange('name')}
              validators={['required', 'isName']}
              errorMessages={['this field is required', 'name must be less then 24 characters']}
              value={this.state.name}
            />

            <TextValidator
              label="Email"
              name="email"
              placeholder="e.g., carl@cloud.ci"
              onChange={this.onChange('email')}
              className={classes.textField}
              margin="normal"
              value={this.state.email}
              validators={['required', 'isEmail']}
              errorMessages={['this field is required', 'email is not valid']}
            />

            <TextValidator
              label="Password"
              type="password"
              placeholder="e.g., *******"
              onChange={this.onChange('password')}
              className={classes.textField}
              margin="normal"
              value={this.state.password}
              name="password"
              validators={['required', 'minStringLength:6', 'maxStringLength:16']}
              errorMessages={['this field is required', 'password must contain at least 6 characters', 'password must contain no more then 16 characters']}
            />

            <TextValidator
              label="Confirm password"
              type="password"
              placeholder="e.g., *******"
              margin="normal"
              name="confirmPassword"
              onChange={this.onChange('confirmPassword')}
              className={classes.textField}
              validators={['isPasswordMatch', 'required']}
              errorMessages={['password mismatch', 'this field is required']}
              value={this.state.confirmPassword}
            />

            <Button 
              fullWidth 
              variant="contained" 
              color="primary" 
              type="submit"
              className={classes.signIn}
            >
              Create New Account
            </Button>

          </ValidatorForm>
        </Paper>
      </React.Fragment>
    )
  }
}

export default withStyles(formStyles)(signUp)