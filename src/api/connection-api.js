import { postRequest, putRequest, deleteRequest, getRequest } from "./utils";

const BASE_URL = "users";
const URL = "connections";

export const getConnectionRequests  = (userId) => getRequest(`${BASE_URL}/${userId}/${URL}`);

export const addConnection = (userId, data) => postRequest(`${BASE_URL}/${userId}/${URL}`, data);

export const getConnectionState  = (userId, recipientId) => getRequest(`${BASE_URL}/${userId}/${URL}/${recipientId}`);

export const respondConnection = (userId, recipientId, data) => putRequest(`${BASE_URL}/${userId}/${URL}/${recipientId}`, data);

export const deleteConnection = (userId, recipientId) => deleteRequest(`${BASE_URL}/${userId}/${URL}/${recipientId}`);