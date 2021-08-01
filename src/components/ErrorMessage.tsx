import { Errors } from '../helpclasses/types';

interface Props {
  errors: Errors;
}

const ErrorMessage = ({ errors }: Props) => {
  return (
    <div className='text-error text-2xl'>
      {errors.messages &&
        errors.messages.map((meassage) => <div key={meassage}>{meassage}</div>)}
    </div>
  );
};

export default ErrorMessage;
