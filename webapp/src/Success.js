import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import React from 'react';

import { Copyright } from './App';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
  }
}));

export default function Success(props) {
  const { page } = props;

  const classes = useStyles();

  const msg = (page) => {
    switch (page) {
      case "finishSubscribe":
        return "订阅完成！您将收到一条来自企业微信的确认消息。";
      case "finishUnsubscribe":
        return "退订成功，感谢您的支持！";
      default:
        return "";
    }
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CheckCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          罗德外卖
        </Typography>
        <Box mt={5}>
          <Typography variant="body1">
            {msg(page)}
        </Typography>
        </Box>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
