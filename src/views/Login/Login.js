import React, { useState } from "react";
import moment from "moment";
import PadlockIcon from "../../components/icons/PadlockIcon";
import TextInput from "../../components/commons/TextInput";
import Spinner from "../../components/commons/Spinner";
import Welcome from "../Welcome";

import { saveUser, getUser, updateUser } from "./../../services/userService";
import FeedbackInline from "../../components/commons/FeedbackInline";

import { emailFormat, passwordFormat } from "./../../../src/utils/utils";
import { emptyUser, TIME, STATUS } from "./../../components/commons/constants";

const Login = () => {
  const [user, setUser] = useState(emptyUser);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(STATUS.INITIAL);
  const [time, setTime] = useState(TIME);
  const [touched, setTouched] = useState({});
  const [validation, setValidation] = useState({});

  const errorsForm = getErrorForm(user);
  const errorsValidation = getValidationErrors(user);
  const isValid =
    Object.keys(errorsForm).length === 0 &&
    Object.keys(errorsValidation).length === 0;

  const handleBlur = (event) => {
    event.persist();
    setTouched((prevState) => {
      return {
        ...prevState,
        [event.target.name]: true,
      };
    });
  };

  const handleChange = (event) => {
    event.persist();
    setUser((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
    setValidation((prevState) => {
      return {
        ...prevState,
        [event.target.name]:
          event.target.name === "email"
            ? validationEmail(event.target.value)
            : validationPassword(event.target.value),
      };
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus(STATUS.SUBMITTING);

    if (isValid) {
      setLoading(true);

      try {
        const response = await getUser(user.email, user.password);
        if (response.length) {
          const { timestamp } = response[0];
          const data = await updateUser(response[0]);

          getDifferenceTime(data, timestamp);

          setStatus(STATUS.COMPLETED);
        } else {
          await saveUser(user);
          setStatus(STATUS.COMPLETED);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    } else {
      setStatus(STATUS.SUBMITTED);
    }
  };

  function validationEmail(email) {
    return emailFormat.test(email);
  }
  function validationPassword(password) {
    return passwordFormat.test(password);
  }

  function onLogOut() {
    setUser(emptyUser);
    setStatus(STATUS.INITIAL);
    setTime(TIME);
    setTouched({});
  }

  function getDifferenceTime(data, timestamp) {
    const difference = data.timestamp - timestamp;

    setTime((prevState) => {
      const days = moment.duration(difference).days();
      const hours = moment.duration(difference).hours();
      const minutes = moment.duration(difference).minutes();
      const seconds = moment.duration(difference).seconds();

      return {
        ...prevState,
        days: days < 10 ? `0${days}` : days,
        hours: hours < 10 ? `0${hours}` : hours,
        minutes: minutes < 10 ? `0${minutes}` : minutes,
        seconds: seconds < 10 ? `0${seconds}` : seconds,
      };
    });
  }

  function getErrorForm() {
    const result = {};
    if (!user.email) result.email = "email is required";
    if (!user.password) result.password = "password is required";
    return result;
  }

  function getValidationErrors() {
    const result = {};
    if (!validation.email) result.email = "email format is incorrect";
    if (!validation.password) result.password = "password format is incorrect";
    return result;
  }

  if (error) throw error;
  if (loading) return <Spinner />;

  return (
    <div className='container'>
      {user.email && status === STATUS.COMPLETED ? (
        <Welcome user={user} time={time} onLogOut={onLogOut} />
      ) : (
        <div className='form'>
          <PadlockIcon />
          <form onSubmit={onSubmit}>
            <TextInput
              htmlFor='email'
              id='email'
              name='email'
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder='Email'
              type='text'
              value={user.email}
            />
            {(touched.email || status === STATUS.SUBMITTED) && (
              <FeedbackInline
                error={errorsForm.email}
                validation={errorsValidation.email}
              />
            )}
            <TextInput
              htmlFor='password'
              id='password'
              name='password'
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder='Password'
              type='password'
              value={user.password}
            />
            {(touched.password || status === STATUS.SUBMITTED) && (
              <FeedbackInline
                error={errorsForm.password}
                validation={errorsValidation.password}
              />
            )}
            <button type='submit' disabled={!isValid}>
              Log in
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
