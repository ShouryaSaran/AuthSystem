import { createContext, useState } from "react";


export const authcontext = createContext()

export const AuthProvider = ({ children }) => {
    const [user,setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [authChecking, setAuthChecking] = useState(true)
    
    return (
        <authcontext.Provider value={{user,setUser,loading,setLoading,authChecking,setAuthChecking}}>
            {children}
        </authcontext.Provider>
    )
}