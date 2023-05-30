/* eslint-disable @typescript-eslint/no-var-requires */
import {notification} from '@src/rpc/config';

const path = require('path');
const PROTO_PATH = path.resolve(__dirname, '../../pb/notification.proto');
const url = process.env.rpc_local==='true'?'localhost':notification.host;
const GRPCClient = require('node-grpc-client');
export const Notify = new GRPCClient(
  PROTO_PATH,
  'notifypackage',
  'Notify',
  `${url}:${notification.port}`
);
