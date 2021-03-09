import { postRequest, putRequest, deleteRequest } from "./utils";

const BASE_URL = "users";
const URL = "recommendations";

export const submitRecommendation = (userId, data) => postRequest(`${BASE_URL}/${userId}/${URL}`, data);
