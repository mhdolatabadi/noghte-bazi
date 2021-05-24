import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    display: 'flex', //TODO set it to none value
    gridArea: 'message',
    width: '95vmin',
    height: '40px',
    backgroundColor: 'wheat',
  },
  input: {
    direction: 'rtl',
    backgroundColor: 'wheat',
    border: '2px solid wheat',
    flexGrow: 4,
    '&:focus': {
      outline: 'none',
    },
  },
  button: {
    backgroundColor: 'orange',
    border: '2px solid wheat',
    width: '50px',
    cursor: 'pointer',
    borderRadius: '10px',
  },
  icon: {
    transform: 'scaleX(-1)',
    height: '100%',
    width: '100%',
  },
}))
