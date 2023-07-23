/* eslint-disable no-tabs */
/**
 * General app configuration
 * @category Configurations
 */
class App {
	public static appName = 'weeshr'

	public static port = parseInt(`${process.env.PORT}` || '3200')

	public static env = `${process.env.NODE_ENV}` || 'development'

	static clientBodyLimit = '50mb'
}

export default App;
