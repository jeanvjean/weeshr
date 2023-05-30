/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
export const notification = {
  port: 40003,
  host:
		process.env.NODE_ENV === 'development' ?
		  'api.staging.zeedas.com' :
		  'api.prod.zeedas.com'
};

export const users = {
  port: 40002,
  host: process.env.NODE_ENV === 'development' ? '0.0.0.0' : '0.0.0.0'
};

export const billing = {
  port: 40001,
  host:
		process.env.NODE_ENV === 'development' ?
		  'api.staging.zeedas.com' :
		  'api.prod.zeedas.com'
};

export const project = {
  port: 40005,
  host:
		process.env.NODE_ENV === 'development' ?
		  'api.staging.zeedas.com' :
		  'api.prod.zeedas.com'
};
