import { getRequest, postRequest, putRequest, deleteRequest } from "./utils";

const URL = "users";

export const searchUsers = (keyword) => {
    getRequest(`${URL}?keyword=${keyword}`);
}

export const searchUser = (id) => {
    getRequest(`${URL}/${id}`);
}

export const editUserProfile = (id, data) => {
    data = Object.assign({ first_name: null, last_name: null, profile_pic: null }, data);
    return putRequest(`${URL}/${id}`, data);
}

export const deleteUser = (id) => {
    deleteRequest(`${URL}/${id}`);
}

export const createUser = (data) => {
    postRequest(`${URL}`,data);
}

