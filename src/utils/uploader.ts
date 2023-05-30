/* eslint-disable no-tabs */
/* eslint-disable require-jsdoc */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-mixed-spaces-and-tabs */
const cloud = require('cloudinary');
const cloudinary = cloud.v2;
class Uploader {
	// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
	// @ts-ignore
	private cloudinary
	constructor() {}

	public async upload(stream: string, path: string, override = {}) {
	  try {
	    cloudinary.config({
	      cloud_name: process.env.CLOUDINARY_NAME,
	      api_key: process.env.CLOUDINARY_API_KEY,
	      api_secret: process.env.CLOUDINARY_API_SECRET
	    });
	    const result = await cloudinary.uploader.upload(
	      stream,
	      {
	        folder: path,
	        ...override
	      },
	      () => {}
	    );
	    return result.secure_url;
	  } catch (err) {
	    console.log(err);
	    throw new Error(err);
	  }
	}

	public async destroy(file: string) {
	  try {
	    cloudinary.config({
	      cloud_name: process.env.CLOUDINARY_NAME,
	      api_key: process.env.CLOUDINARY_API_KEY,
	      api_secret: process.env.CLOUDINARY_API_SECRET
	    });
	    return await cloudinary.uploader.destroy(file);
	  } catch (err) {
	    throw new Error(err);
	  }
	}
}

export default Uploader;
