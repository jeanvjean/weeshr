/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as auth from './auth.template';

const getTemplate = (type: string, data: object) => {
  switch (type) {
  case 'signup': return auth.verify_email(data);

  default: return '';
  }
};

export default getTemplate;
