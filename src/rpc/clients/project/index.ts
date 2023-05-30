/* eslint-disable @typescript-eslint/no-var-requires */
import {project} from '@src/rpc/config';

const path = require('path');
const PROTO_PATH = path.resolve(__dirname, '../../pb/project.proto');

const GRPCClient = require('node-grpc-client');
export const Project = new GRPCClient(
  PROTO_PATH,
  'projectpackage',
  'Project',
  `${project.host}:${project.port}`
);
