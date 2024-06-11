type GetURI = (uri: string, username: string, password: string) => string;
const getUri: GetURI = (uri, username, password) => {
	uri.replace("<username>", username);
	uri.replace("<password>", password);
	return uri;
};

export default getUri;
