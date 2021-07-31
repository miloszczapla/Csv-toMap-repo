import { Errors } from './types';

const handleErrors = (
  errMessage: string = '',
  setErrors: any,
  deleteErr: boolean = false
) => {
  setErrors((oldErrors: Errors) => {
    const errHook = oldErrors.messages;
    if (deleteErr) {
      errHook.splice(errHook.indexOf(errMessage), 1);
      return { messages: errHook };
    }
    if (!errHook.includes(errMessage)) {
      return {
        messages: [...errHook, errMessage],
      };
    }
    return oldErrors;
  });
};

export default handleErrors;
