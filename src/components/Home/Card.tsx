import * as React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
  container: {
    maxWidth: '80%',
    margin: '20px auto',
    '-webkit-box-shadow': '-13px 18px 8px -5px rgba(0,0,0,0.32)',
    '-moz-box-shadow': '-13px 18px 8px -5px rgba(0,0,0,0.32)',
    'box-shadow': '-13px 18px 8px -5px rgba(0,0,0,0.32)'
  },
  media: {
    height: 140, 
  },
};

interface Prop extends WithStyles<typeof styles> {};

function Shop_card(props: Prop) {
  const { classes } = props;
  return (
    <div className={classes.container}>
    <Card>
      <CardActionArea>
      <CardMedia
        className={classes.media}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          表姐紅薯粉
        </Typography>
      </CardContent>
      </CardActionArea>
    </Card>
    </div>
  );
}

export default withStyles(styles)(Shop_card);