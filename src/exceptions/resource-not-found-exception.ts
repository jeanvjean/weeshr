import {ResourceNotFoundExceptionCode} from './codes';
import Exception from './exception';

class ResourceNotFoundException extends Exception {
	public type: string | undefined

	public constructor(message?: string, type?: string) {
	  super(message);
	  Object.setPrototypeOf(this, new.target.prototype);
	  this.name = ResourceNotFoundException.name;
	  this.code = ResourceNotFoundExceptionCode;
	  this.type = type;
	}
}

export default ResourceNotFoundException;
