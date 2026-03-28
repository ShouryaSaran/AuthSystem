import { useContext, useEffect } from "react";
import { authcontext } from "../Auth.context";
import { login, logout, getMe, register } from "../Services/auth.service";


export const useAuth = () => {

    const context = useContext(authcontext);
    const { user, setUser, loading, setLoading, authChecking, setAuthChecking } = context;

    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try{
            const data = await login({ email, password })
            setUser(data.user)
            return data
        }
        catch(err){
            throw err
        }finally{
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try{
            const data = await register({ username, email, password })
            setUser(data.user)
            return data
        }
        catch(err){
            throw err
        }finally{
            setLoading(false)
        }
    }

    const handleLogout = async () =>{
        setLoading(true)
        try{
            await logout()
            setUser(null)
        }
        catch(err){
            throw err
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        const getAndSetUser = async() => {
            try {
                const data = await getMe()
                setUser(data.user)
            }
            catch(err){
                setUser(null)
            }
            finally {
                setAuthChecking(false)
            }
        }
        getAndSetUser()
    },[])

    return { user, loading, authChecking, handleLogin, handleLogout, handleRegister }

}