import * as React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = createStyles({
  root: {
    flexGrow: 1,
  },
  Toolbar: {
    padding: '0!important'
  },
  grow: {
    flexGrow: 1,
    padding: '15px',
    'border-left': '10px solid black'
  },
});

interface Props extends WithStyles<typeof styles> {}

function ButtonAppBar(props: Props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.Toolbar}>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            News
          </Typography>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            News
          </Typography>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            News
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(ButtonAppBar);