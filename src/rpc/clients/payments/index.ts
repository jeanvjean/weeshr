/* eslint-disable @typescript-eslint/no-var-requires */
import {billing} from '@src/rpc/config';

const path = require('path');
const PROTO_PATH = path.resolve(__dirname, '../../pb/payments.proto');

const GRPCClient = require('node-grpc-client');
export const Billing = new GRPCClient(
  PROTO_PATH,
  'billingpackage',
  'Billing',
  `${billing.host}:${billing.port}`
);
