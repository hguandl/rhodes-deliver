import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
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
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Unsubscribe(props) {
  const { handleNext } = props
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const [ errMsg, setErrMsg ] = React.useState('');
  const onSubmit = data => {
    axios.delete("api/v1/subscriptions/" + data.subscribeID)
      .then(response => {
        handleNext('finishUnsubscribe');
      })
      .catch(error => {
        if (error.response) {
          switch (error.response.status) {
            case 404:
              setErrMsg("无法找到此ID。")
              break;
            default:
              setErrMsg("服务器访问失败。")
              break;
          }
        } else {
          setErrMsg("无法连接服务器。")
        }
      });
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <DeleteForeverIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          罗德外卖
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} 
                alignItems="center">
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="订阅ID"
                name="subscribeID"
                inputRef={register({ required: true })}
              />
              {errors.subscribeID && <span>This field is required</span>}
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
            color="secondary"
            className={classes.submit}
          >
            取消订阅
          </Button>
          <Grid container justify="flex-end">
          <Grid item>
            <Link href="#" variant="body2" onClick={(ev) => {handleNext("subscribe")}}>
              返回订阅
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
