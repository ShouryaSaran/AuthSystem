import axios from "axios"

const normalizeApiBaseUrl = (baseUrl) => {
    const trimmedUrl = baseUrl.replace(/\/+$/, "")
    return trimmedUrl.endsWith("/api/v1") ? trimmedUrl : `${trimmedUrl}/api/v1`
}

const API_BASE_URL = normalizeApiBaseUrl(
    import.meta.env.VITE_API_BASE_URL || "https://authsystem-production-b97f.up.railway.app/api/v1"
)

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
})

const getErrorMessage = (error) => {
    if (error?.response?.data?.details?.length) {
        return error.response.data.details.map((detail) => detail.message).join(" ")
    }

    return error?.response?.data?.message || "Request failed. Please try again."
}

export async function register({username , email , password}){

    try{
        const response = await api.post('/auth/register',{
            username,email,password
        })

        return response.data
    }
    catch(error){
        throw new Error(getErrorMessage(error))
    }
}

export async function login({email,password}) {
    
    try{
        const response = await api.post('/auth/login',{
            email,password
        })

        return response.data
    }
    catch(error){
        throw new Error(getErrorMessage(error))
    }
}

export async function logout(){

    try{
        const response = await api.post('/auth/logout')

        return response.data
    }
    catch(error){
        throw new Error(getErrorMessage(error))
    }
}

export async function getMe() {
    try{
        const response = await api.get('/auth/me')
        return response.data
    }
    catch(error){
        throw new Error(getErrorMessage(error))
    }
}