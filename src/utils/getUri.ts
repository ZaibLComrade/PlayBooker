type GetURI = (uri: string, username: string, password: string) => string;
// Gets main uri from uri demo string, db username and password
const getUri: GetURI = (uri, username, password) => {
	let newUri = uri;
	newUri = newUri.replace("<username>", username);
	newUri = newUri.replace("<password>", password);
	return newUri;
};

export default getUri;
