import React, { Fragment, useEffect, useRef } from 'react';
import { withAlert } from 'react-alert';
import { useAuthState, useMessage } from '../../context';

const Alerts = props => {
  const { authState } = useAuthState();

  const { errorMsg, errorStatus } = authState;

  const { message } = useMessage();

  const { alert } = props;

  // https://stackoverflow.com/a/53446665
  // https://bit.ly/32Joish
  const usePrevious = value => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const previous = usePrevious({errorMsg, message})

  useEffect(() => {
    if (errorMsg && errorMsg !== previous.errorMsg) {
      if (errorMsg.username) {
        alert.error(`Username: ${errorMsg.username.join()}`);
      }
      if (errorMsg.password) {
        alert.error(`Password: ${errorMsg.password.join()}`);
      }
      if (errorMsg.email) {
        alert.error(`Email: ${errorMsg.email.join()}`); 
      }
      if (errorMsg.non_field_errors) {
        alert.error(errorMsg.non_field_errors.join());
      }
    }

    if (Object.keys(message).length !== 0 && message !== previous.message) {
      if (message.passwordNotMatch) {
        alert.error(message.passwordNotMatch)
      }
    }
  }, [errorMsg, message])

  return (
	<Fragment />
  );
}

export default withAlert()(Alerts);