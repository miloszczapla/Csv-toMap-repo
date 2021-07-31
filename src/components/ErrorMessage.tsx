import React from 'react';
import { Errors } from '../helpclasses/types';

interface Props {
  errors: Errors;
}

const ErrorMessage = ({ errors }: Props) => {
  console.log('błedy do wyświetlenia', errors);

  return (
    <div className='text-error text-2xl'>
      {errors.messages && errors.messages.map((meassage) => meassage)}
    </div>
  );
};

export default ErrorMessage;
