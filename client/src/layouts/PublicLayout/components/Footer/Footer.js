import React from 'react';
import { Divider, Typography, Link } from '@material-ui/core';
import useStyles from './styles';

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Divider />
      <Typography className={classes.copyright} variant="body1">
        &copy; ANTHONY 2021
      </Typography>
      <Typography variant="caption">
        Created with purpose |{' '}
        <Link href="https://github.com/anthony" target="_blank" rel="noopener">
          Created with purpose | ANTHONY
        </Link>
      </Typography>
    </div>
  );
}
