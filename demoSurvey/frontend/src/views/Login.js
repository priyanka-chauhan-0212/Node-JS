/* eslint-disable keyword-spacing */
/* eslint-disable eqeqeq */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable multiline-ternary */
/* eslint-disable semi */
/* eslint-disable no-duplicate-imports */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable no-tabs */
import React from "react";
import "./LoginPage.css";
import PathBg from "../assets/pathLogo.png";
import AnnaLogo from "../assets/annaLogo.png";
import FieldLogo from "../assets/fieldLogo.png";
import EduPlannerLogo from "../assets/educationPlanner.jpg";
import edPlanner from "../assets/edPlanner.png";
import Background from "../assets/mainBG.jpg";
import mainBg from "../assets/mainBG.jpg";
import esparzaBg from "../assets/esparzaBg.png";

// new logo
import EducationPlannerLogo from "../assets/EducationPlanner.svg";
import EsparzaLogo from "../assets/esparzaLogo.png";

import { useSkin } from "@hooks/useSkin";
import { Fragment, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Facebook, Twitter, Mail, GitHub } from "react-feather";
import InputPasswordToggle from "@components/input-password-toggle";
import { toast } from "react-toastify";
import { ChevronRight } from "react-feather";
import LoginBg from "../assets/loginBackground.png";

import {
  Row,
  Col,
  CardTitle,
  CardText,
  FormFeedback,
  Form,
  Label,
  Input,
  Button,
  Card,
} from "reactstrap";
import "@styles/react/pages/page-authentication.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { signIn } from "../redux/actions";
import * as types from "../redux/constants/actionTypes";
import axios from "axios";
import { useDispatch } from "react-redux";
import Avatar from "@components/avatar";
import Spinner from "../@core/components/spinner/Fallback-spinner";
import {
  ErrorToast,
  SuccessToast,
} from "../container/components/ToastComponent";
import {
  ROUTE_FORGOT_PASSWORD,
  ROUTE_OVERVIEW,
  ROUTE_REGISTER,
  ROUTE_SIGN_IN,
  ROUTE_SURVEYPAGE,
} from "../router/routes";
import axiosInstance from "../container/utils/axiosInstance";
import { SIGN_IN_API_PATH } from "../ApiRoutes/ApiRoutes";

const SignupSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid e-mail.")
    .required("Please enter e-mail"),

  password: yup
    .string()
    .matches(/^\S*$/, "Whitespace is not allowed")
    .test(
      "len",
      "Password must be  minimum 8 character.",
      (val) => val.length >= 8
    )
    .required("Please enter password."),
});

const Login = () => {
  const { skin } = useSkin();
  const history = useHistory();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    loading: false,
  });
  const [checkBox, setCheckBox] = useState(false);

  const defaultValues = {
    password: "",
    email: "",
  };

  const {
    reset,
    control,
    setError,
    getValues,
    setValue,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues,
    resolver: yupResolver(SignupSchema),
  });

  const getLocalStorage = () => {
    const rememberMe = localStorage.getItem("rememberMeCheckBox");
    const loginEmail = localStorage.getItem("loginEmail");
    const loginPassword = localStorage.getItem("loginPassword");

    console.log(rememberMe);

    {
      JSON.parse(rememberMe) === true
        ? (console.log("if", rememberMe, loginEmail, loginPassword),
          setCheckBox(JSON.parse(rememberMe)),
          setValue("email", loginEmail),
          setValue("password", loginPassword))
        : console.log("else", rememberMe, loginEmail, loginPassword);
    }
  };
  useEffect(() => {
    getLocalStorage();
  }, []);
  useEffect(() => {
    const firstError = Object.keys(errors).reduce((field, a) => {
      return !!errors[field] ? field : a;
    }, null);

    if (firstError) {
      setFocus(firstError);
    }
  }, [errors, setFocus]);

  const submitForm = (data) => {
    setState({ ...state, loading: true });

    axiosInstance.post(SIGN_IN_API_PATH, data).then((response) => {
      if (response.data.success === 1) {
        if (response.data.data.email === "ewani.v2web@gmail.com") {
          // localStorage.setItem("accessTokenNew", response.data.token);
          // localStorage.setItem(
          //   "savedGridLayout",
          //   response.data.data && response.data.data.layoutDetail
          // );

          localStorage.setItem("loginPassword", getValues("password"));
          localStorage.setItem("loginEmail", getValues("email"));
          // localStorage.setItem("rememberMeCheckBox", checkBox);

          toast.success(<SuccessToast message={response.data.message} />);

          console.log("sign in api data", response.data.data);

          dispatch({
            type: types.CURRENT_USER,
            data: response.data.data,
          });
          history.push(ROUTE_OVERVIEW);
          setState({ ...state, loading: false });
        } else if (response.data.data.email !== "ewani.v2web@gmail.com") {
          toast.success(<SuccessToast message={response.data.message} />);
          history.push(ROUTE_SURVEYPAGE);
        } else {
          toast.error(<ErrorToast message={response.data.message} />);
        }
        // localStorage.setItem("accessTokenNew", response.data.token);
        // localStorage.setItem(
        //   "savedGridLayout",
        //   response.data.data && response.data.data.layoutDetail
        // );

        // localStorage.setItem("loginPassword", getValues("password"));
        // localStorage.setItem("loginEmail", getValues("email"));
        // localStorage.setItem("rememberMeCheckBox", checkBox);

        // toast.success(<SuccessToast message={response.data.message} />);

        // console.log("sign in api data", response.data.data);

        // dispatch({
        //   type: types.CURRENT_USER,
        //   data: response.data.data,
        // });

        // history.push(ROUTE_OVERVIEW);

        // let dispatchData = {
        // 	isLoggedIn: true,
        // };

        // dispatch({
        // 	type: types.SIGN_IN,
        // 	data: dispatchData,
        // });
      } else {
        localStorage.clear();
        toast.error(<ErrorToast message={response.data.message} />);
        setState({ ...state, loading: false });
      }
    });
  };

  const illustration = skin === "dark" ? "login-v2-dark.svg" : "login-v2.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default;

  if (state.loading) {
    return <Spinner />;
  }

  return (
    <div className="wrapperLogin">
      <div className="inner-image">
        <div className="inner-content">
          <div className="inner-content-img">
            {/* <img src={EducationPlannerLogo} style={{ width: "45%" }} /> */}
            <b>
              <h1>Survey Page Demo</h1>
            </b>
          </div>
          <div className="inner-content-form">
            <h2>Login to your account</h2>

            <Form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit(submitForm)}
            >
              <div className="mb-1">
                {/* <Label
									className="form-label"
									for="login-email"
								>
									Email
								</Label> */}

                <Controller
                  control={control}
                  id="email"
                  name="email"
                  render={({ field }) => (
                    <Input
                      className="form-input-field"
                      placeholder="Email"
                      invalid={errors.email && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.email && (
                  <FormFeedback>{errors.email.message}</FormFeedback>
                )}
              </div>
              <div>
                {/* <div className="d-flex justify-content-between">
									<Label
										className="form-label"
										for="login-password"
									>
										Password
									</Label>
								</div> */}

                <Controller
                  control={control}
                  id="password"
                  name="password"
                  //   type="password"
                  render={({ field }) => (
                    <Input
                      className="form-input-field"
                      placeholder="Password"
                      type="password"
                      invalid={errors.password && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.password && (
                  <FormFeedback>{errors.password.message}</FormFeedback>
                )}
              </div>
              <div
                className="submit-area"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                // style={{
                // 	background:
                // 		'#4FBDCF 0% 0% no-repeat padding-box',
                // 	borderRadius: '14px',
                // 	padding: '10px 80px',
                // }}
                >
                  Login now <ChevronRight size={24} className="button-icon" />
                </Button>
                <div className="form-check mb-1 rememberCheckbox">
                  {/* <Input
										type="checkbox"
										id="remember-me"
									/> */}

                  <Input
                    type="checkbox"
                    id="remember-me"
                    checked={checkBox == true ? true : false}
                    onChange={() => {
                      setCheckBox(!checkBox);
                    }}
                  />
                  <Label className="form-check-label" for="remember-me">
                    Remember Me
                  </Label>
                  <div>
                    {" "}
                    <Link to={ROUTE_FORGOT_PASSWORD}>
                      <small>Forgot Password?</small>
                    </Link>
                  </div>
                </div>
              </div>
            </Form>

            <div>
              Create Account
              <Link to={ROUTE_REGISTER}>
                <b>
                  <small className="register-user"> Register User?</small>
                </b>
              </Link>
            </div>
            <br />
            <p className="terms">
              By proceeding, you agree to our Terms of Use and confirm you have
              read our <b>Privacy</b> and <b>Cookie Statement</b>.
            </p>
          </div>
          <div className="inner-bottom-content-img">
            {/* <img src={EsparzaLogo} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
