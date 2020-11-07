import React, { useState } from "react";
import moment from "moment";
import PadlockIcon from "../../components/icons/PadlockIcon";
import TextInput from "../../components/commons/TextInput";

import { saveUser, getUser, updateUser } from "./../../services/userService";

const emptyUser = {
  email: "",
  password: "",
};

const TIME = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

const STATUS = {
  INITIAL: "INITIAL",
  SUBMITTING: "SUBMITTING",
  SUBMITTED: "SUBMITTED",
  COMPLETED: "COMPLETED",
};

const Login = () => {
  const [user, setUser] = useState(emptyUser);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(STATUS.INITIAL);
  const [time, setTime] = useState(TIME);

  const onChange = (event) => {
    setUser((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    setStatus(STATUS.SUBMITTING);

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
    } catch (error) {}
  };

  function onLogOut() {
    setUser(emptyUser);
    setStatus(STATUS.INITIAL);
    setTime(TIME);
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

  return (
    <div className='container'>
      {user.email && status === STATUS.COMPLETED ? (
        <div>
          <h1>Welcome!</h1>
          <p>the last time you, {user.email} accesed was:</p>
          <p>days: {time.days}</p>
          <p>hours: {time.hours}</p>
          <p>minutes: {time.minutes}</p>
          <p>seconds: {time.seconds}</p>
          <button onClick={onLogOut}>LOGOUT</button>
        </div>
      ) : (
        <div className='form'>
          <PadlockIcon />
          <form onSubmit={onSubmit}>
            <TextInput
              htmlFor='email'
              name='email'
              id='email'
              type='text'
              placeholder='Email'
              value={user.email}
              onChange={onChange}
            />
            <TextInput
              htmlFor='password'
              name='password'
              id='password'
              type='password'
              placeholder='Password'
              value={user.password}
              onChange={onChange}
            />
            <button disabled={status === STATUS.SUBMITTING}>Log in</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
