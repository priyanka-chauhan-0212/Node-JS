const validEmail = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.?)+\.[a-zA-Z]{2,}$/;

export const handleValidationForUserDetails = form => {
  let errors = {};
  let formIsValid = true;

  if (!form.firstName) {
    formIsValid = false;
    errors.firstName = 'The first name is required';
  }

  if (!form.lastName) {
    formIsValid = false;
    errors.lastName = 'The last name is required';
  }

  if (!form.username) {
    formIsValid = false;
    errors.username = 'The username is required';
  }

  if (!form.email) {
    formIsValid = false;
    errors.email = 'The email is required';
  } else if (!form.email.match(validEmail)) {
    formIsValid = false;
    errors.email = 'Please include a valid email address';
  }

  if (!form.mobileNo) {
    formIsValid = false;
    errors.mobileNo = 'The mobile is required';
  } else if (form.mobileNo.length !== 10) {
    formIsValid = false;
    errors.mobileNo = 'Please include a valid email address';
  }

  return { errors, formIsValid };
};
