import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useForm } from "react-hook-form";

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
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Subscribe(props) {
  const { handleNext } = props
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const [ errMsg, setErrMsg ] = React.useState('');
  const onSubmit = data => {
    axios.post(
      "api/v1/subscribe",
      data)
      .then(response => {
        handleNext('finishSubscribe');
      })
      .catch(error => {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              setErrMsg("信息填写错误。");
              break;
            case 409:
              setErrMsg("信息已存在。");
              break;
            case 500:
            default:
              setErrMsg("服务器访问失败。");
              break;
          }
        } else {
          setErrMsg("无法连接服务器。");
        }
      });
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EmailOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          罗德外卖
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} 
                alignItems="center">
            <Grid item xs={6}>
              <TextField
                name="agentid"
                variant="outlined"
                required
                fullWidth
                label="AgentId"
                autoFocus
                inputRef={register({ required: true })}
              />
              {errors.agentid && <span>This field is required</span>}
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="接收成员"
                name="touser"
                placeholder="@all"
                value="@all"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="企业ID"
                name="corpid"
                inputRef={register({ required: true })}
              />
              {errors.corpid && <span>This field is required</span>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="corpsecret"
                label="Secret"
                type="password"
                inputRef={register({ required: true })}
              />
              {errors.secret && <span>This field is required</span>}
            </Grid>
          </Grid>
          <Grid container justify="flex-start">
            <Grid item>
              {
                errMsg && (
                  <Typography variant="subtitle1" color="error">
                    { errMsg }
                  </Typography>
                )
              }
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            订阅
          </Button>
        <Grid container justify="space-between">
          <Grid item>
            <Link href="https://hguandl.com/posts/weibo-watcher-deploy/" target="_blank" variant="body2">
              图文教程
            </Link>
            <Box display="inline" m={1} />
            <Link href="#" variant="body2">
              视频教程
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2" onClick={(ev) => {handleNext("unsubscribe")}}>
              我想取消订阅
            </Link>
          </Grid>
        </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
