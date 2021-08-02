import { Errors } from './types';

const handleErrors = (
  errMessage: string = '',
  setErrors: any,
  deleteErr: boolean = false
) => {
  setErrors((oldErrors: Errors) => {
    const errMessages = oldErrors.messages;

    if (deleteErr && errMessages.includes(errMessage)) {
      errMessages.splice(errMessages.indexOf(errMessage), 1);

      return { messages: errMessages };
    } else if (!errMessages.includes(errMessage) && !deleteErr) {
      return {
        messages: [...errMessages, errMessage],
      };
    }
    return oldErrors;
  });
};

export default handleErrors;
