/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable require-jsdoc */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable max-lines */
import {Server, loadPackageDefinition, ServerCredentials} from 'grpc';
import {loadSync} from '@grpc/proto-loader';
import {join} from 'path';
import {users} from '../config';

/**
 * RPC Server
 * @category service
 */
class RPCServer {
	private server: Server
	private readonly port: number
	private readonly host: string

	/**
	 * @constructor
	 * @param {string} host
	 * @param {number} port
	 */
	public constructor() {
	  this.port = users.port;
	  this.host = users.host;
	  this.server = new Server();
	  this.setup();
	}

	/**
	 * Start the rpc server
	 */
	public start(): void {
	  this.server.start();
	  console.log(`RPC server is live on: ${this.host}:${this.port}`);
	}

	/**
	 * Setup the server
	 */
	private setup(): void {
	  const PROTO_PATH = join(__dirname, '../pb/user.proto');
	  const credentials = ServerCredentials.createInsecure();

	  const packageDefinition = loadSync(PROTO_PATH, {
	    keepCase: true,
	    longs: String,
	    enums: String,
	    defaults: true,
	    oneofs: true
	  });
	  const protoDescriptor = loadPackageDefinition(packageDefinition);
	  const userPackage = protoDescriptor.userpackage;
	  // @ts-ignore
	  this.server.addService(userPackage.User.service, {});
	  this.server.bind(`${this.host}:${this.port}`, credentials);
	}
}

export default RPCServer;
