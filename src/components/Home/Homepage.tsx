import * as React from 'react';
import { Link } from 'react-router-dom';

import { withStyles, WithStyles } from '@material-ui/core/styles';

import Shop_card from './Card';

const styles = {
  container: {
    'vertical-align': 'middle'
  }
};

interface Prop extends WithStyles<typeof styles> {};

function Homepage(props: Prop) {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <Link to={'/cousin'}><Shop_card /></Link>
      <Shop_card />
      <Shop_card />
    </div>
  );
}

export default withStyles(styles)(Homepage);