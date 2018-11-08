const formStyles = ({ breakpoints }) => ({
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '20px 20px 0 20px',
    margin: "30px auto",

    [breakpoints.up('xs')]: {
      width: '90vw',      
    },

    [breakpoints.up('sm')]: {
      width: '500px',      
    }
  },

  textField: {
    width: '100%'
  },

  signIn: {
    margin: '20px 0',
  }
})

export default formStyles