import React from "react";
import PropTypes from "prop-types";

const Welcome = ({ user, time, onLogOut }) => {
  return (
    <section>
      <h1>Welcome {user.email}</h1>
      <h5>the last time you accesed was:</h5>
      <div className='grid'>
        <div className='time'>
          <span className='number'>{time.days}</span>
          <span className='text-time'>days</span>
        </div>
        <div className='time'>
          <span className='number'>{time.hours}</span>
          <span className='text-time'>hours</span>
        </div>
        <div className='time'>
          <span className='number'>{time.minutes}</span>
          <span className='text-time'>minutes</span>
        </div>
        <div className='time'>
          <span className='number'>{time.seconds}</span>
          <span className='text-time'>seconds</span>
        </div>
      </div>
      <button onClick={onLogOut}>LOGOUT</button>
    </section>
  );
};

Welcome.propTypes = {
  user: PropTypes.object,
  time: PropTypes.object,
  onLogOut: PropTypes.func,
};

export default Welcome;
