import React from 'react';
import { Errors } from '../helpclasses/types';

interface Props {
  errors: Errors | null;
}

const ErrorMessage = ({ errors }: Props) => {
  return <div className='text-error text-2xl'>{errors}</div>;
};

export default ErrorMessage;
