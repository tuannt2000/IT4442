import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useThemes } from './style';
import Form from './Form';
import Message from '../../components/Message';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoginLeft from '../login/LoginLeft';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { putChangePassword } from '../../redux/actions/password';
import { TITLE_CHANGE_PASSWORD } from "../../constants/listTitle";

const ChangePassword = () => {
  const classes = useThemes();
  const history = useHistory();
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState({
    isOpen: false,
    message: '',
    status: ''
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
      newPasswordConfirm: ''
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, 'Must have at least 6 characters!')
        .required("Old password cannot be blank!"),
      newPassword: Yup.string()
        .min(6, 'Must have at least 6 characters!')
        .required("New password cannot be blank!"),
      newPasswordConfirm: Yup.string()
        .when('newPassword', {
          is: val => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf([Yup.ref("newPassword")], 'Incorrect, please check again!')
        })
        .required("Please new password confirmation!"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      const newValue = {
        password: values.password,
        new_password: values.newPassword,
        new_password_confirmation: values.newPasswordConfirm
      };
      dispatch(
        putChangePassword(
          newValue,
          (message) => onSuccess(message),
          (message) => onError(message)
        )
      );
    }
  });

  useEffect(() => {
    document.title = TITLE_CHANGE_PASSWORD;
  }, [])

  const handleClose = () => {
    setInfoMessage({ isOpen: false });
  };

  const goback = () => {
    history.goBack();
  };

  const onSuccess = (message) => {
    setInfoMessage({
      isOpen: true,
      message: message,
      status: 'success'
    });
    setLoading(false);
  };

  const onError = (message) => {
    setInfoMessage({
      isOpen: true,
      message: message,
      status: 'error'
    });
    setLoading(false);
  };

  return (
    <>
      <Grid className={classes.root} container>
        <Grid item xs={6}>
          <LoginLeft />
        </Grid>
        <Grid item xs={6} className={classes.rightPadding}>
          <Form
            value={formik.values}
            onChange={formik.handleChange}
            errorComfirm={formik.errors.newPasswordConfirm}
            errorPassword={formik.errors.password}
            errorNewPassword={formik.errors.newPassword}
            handleClick={formik.handleSubmit}
            isLoading={isLoading}
            handleBack={goback}
            touchedPassword={formik.touched.password}
            touchednewPassword={formik.touched.newPassword}
            touchedConfirm={formik.touched.newPasswordConfirm}
          />
        </Grid>
        <Message
          open={infoMessage.isOpen}
          handleClose={handleClose}
          title={infoMessage.message}
          status={infoMessage.status}
        />
      </Grid>
    </>
  )
}

export default ChangePassword;
