import axios from './axios';

export const getRequest = async (url) => {
	try {
		console.log(url);
		let response = await axios.get(url);
		return generateSuccessOutput(response);
	} catch (error) {
		return generateErrorOutput(error);
	}
};

export const postRequest = async (url, data) => {
	try {
		console.log(url, data);
		let response = await axios.post(url, data);
		return generateSuccessOutput(response);
	} catch (error) {
		return generateErrorOutput(error);
	}
};

export const putRequest = async (url, data) => {
	try {
		let response = (data) ? await axios.put(url, data) : await axios.put(url);
		return generateSuccessOutput(response);
	} catch (error) {
		return generateErrorOutput(error);
	}
};

export const deleteRequest = async (url) => {
	try {
		let response = await axios.delete(url);
		return generateSuccessOutput(response);
	} catch (error) {
		return generateErrorOutput(error);
	}
};

const generateSuccessOutput = (response) => {
	console.log(response);
	return  {
		data: response.data.results,
		message: response.data.message,
	}
}

const generateErrorOutput = (error) => {
	if (error.message = "Network Error")
		return {
			error: error,
			message: error.message
		}
	else
		return {
			error: error,
			message: error.response.data.message
		}
}