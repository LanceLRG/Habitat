import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <>
      <div
        // This div shows up in multiple locations and is styled differently
        // because it's styled differently depending on where it is used, the className
        // is passed to it from it's parents through React props
        className={props.className}
        onClick={() => dispatch({ type: 'LOGOUT' })}
      >
        <FontAwesomeIcon icon={['fas', `sign-out-alt`]} size="2x" />
        <br />
      Log Out
    </div>
    </>
  );
}

export default LogOutButton;
