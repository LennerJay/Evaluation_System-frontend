import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath +  "/subjects"


export const  getAllSubjects = () => api.get(resource)
