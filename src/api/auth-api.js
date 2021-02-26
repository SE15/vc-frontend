import { postRequest } from "./utils";

const URL = "auth";

export const login = (data) => postRequest(`${URL}`, data);