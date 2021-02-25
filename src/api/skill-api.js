import { postRequest, putRequest, deleteRequest } from "./utils";

const BASE_URL = "users";
const URL = "skills";

export const addSkill = (userId, data) => postRequest(`${BASE_URL}/${userId}/${URL}`, data);

export const validateSkill = (userId, skillId) => putRequest(`${BASE_URL}/${userId}/${URL}/${skillId}`);

export const deleteSkill = (userId, skillId) => deleteRequest(`${BASE_URL}/${userId}/${URL}/${skillId}`);