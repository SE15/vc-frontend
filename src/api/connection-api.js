import { postRequest, putRequest, deleteRequest, getRequest } from "./utils";

const BASE_URL = "users";
const URL = "connections";

export const getConnectionRequests  = (userId) => getRequest(`${BASE_URL}/${userId}/${URL}`);

export const addConnection = (userId) => postRequest(`${BASE_URL}/${userId}/${URL}`);

export const getConnectionState  = (userId, recipientId) => getRequest(`${BASE_URL}/${userId}/${URL}/${recipientId}`);

export const respondConnection = (userId, recipientId, data) => putRequest(`${BASE_URL}/${userId}/${URL}/${recipientId}`, data);

export const deleteConnection = (userId, recipientId) => deleteRequest(`${BASE_URL}/${userId}/${URL}/${recipientId}`);