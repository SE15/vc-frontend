import { postRequest, putRequest, deleteRequest } from "./utils";

const BASE_URL = "users";
const URL = "connections";

export const addConnection = (userId, data) => postRequest(`${BASE_URL}/${userId}/${URL}`, data);

export const respondConnection = (userId, recipientId, data) => putRequest(`${BASE_URL}/${userId}/${URL}/${recipientId}`, data);

export const deleteConnection = (userId, recipientId) => deleteRequest(`${BASE_URL}/${userId}/${URL}/${recipientId}`);