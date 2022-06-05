import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { useThemes } from "./style";
import LoginLeft from "./LoginLeft";
import LoginRight from "./LoginRight";
import { useDispatch } from "react-redux";
import { postEmail, postEmailGoogle } from "../../redux/actions/login";
import Message from "../../components/Message";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createBrowserHistory } from "history";
import { TITLE_LOGIN } from "../../constants/listTitle";

const Login = () => {
  const dispatch = useDispatch();
  const classes = useThemes();
  const history = createBrowserHistory({ forceRefresh: true });

  const [infoMessage, setInfoMessage] = useState({
    isOpen: false,
    message: "",
    status: "",
  });
  const [isLoading, setLoading] = useState(null);

  useEffect(() => {
    document.title = TITLE_LOGIN;
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("No email format!")
        .required("Email cannot be blank!"),
      password: Yup.string()
        .min(6, "Must have at least 6 characters!")
        .required("Password cannot be blank!"),
    }),
    onSubmit: (values) => {
      const value = {
        email: values.email,
        password: values.password,
      };
      setLoading(true);
      dispatch(
        postEmail(
          value,
          (message) => onSuccess(message),
          (message) => onError(message)
        )
      );
    },
  });

  const responseGoogle = (response) => {
    const token = response.accessToken;
    dispatch(
      postEmailGoogle(
        { access_token: token },
        (message) => onSuccess(message),
        (message) => onError(message)
      )
    );
  };

  const handleClose = () => {
    setInfoMessage({ isOpen: false });
  };

  const onSuccess = (message) => {
    setInfoMessage({
      isOpen: true,
      status: "success",
      message: message,
    });
    history.push("/");
  };

  const onError = (message) => {
    setInfoMessage({
      isOpen: true,
      status: "error",
      message: message,
    });
    setLoading(false);
  };
  const forgotPassword = () => {};

  return (
    <Grid className={classes.root} container>
      <Grid item xs={6} className={classes.loginLeft}>
        <LoginLeft />
      </Grid>
      <Grid item xs={6} className={classes.rightPadding}>
        <LoginRight
          onSuccess={responseGoogle}
          onSubmit={formik.handleSubmit}
          valueEmail={formik.values.email}
          valuePassword={formik.values.password}
          onChangeEmail={formik.handleChange}
          onChangePassword={formik.handleChange}
          isLoading={isLoading}
          errorEmail={formik.errors.email}
          errorPassword={formik.errors.password}
          touchedEmail={formik.touched.email}
          touchedPassword={formik.touched.password}
          forgotPassword={forgotPassword}
        />
      </Grid>
      <Message
        open={infoMessage.isOpen}
        handleClose={handleClose}
        title={infoMessage.message}
        status={infoMessage.status}
      />
    </Grid>
  );
};

export default Login;
