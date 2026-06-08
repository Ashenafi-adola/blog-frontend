import { Navigate } from "react-router-dom";
import api, { ACCESS_TOKEN } from "../api/api";
import { useState, useEffect } from "react";

// Small JWT parser to avoid importing `jwt-decode` (ESM default export issues)
function parseJwt(token){
    try{
        const base64 = token.split('.')[1];
        const padded = base64.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(base64.length / 4) * 4, '=');
        const json = atob(padded);
        return JSON.parse(json);
    }catch(e){
        return null;
    }
}

const REFRESH_TOKEN = 'refresh';

function ProtectedRoute({children}){
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(()=>{
        auth().catch(() => setIsAuthorized(false));
    },[])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try{
            const res = await api.post('/api/token/refresh/',{refresh: refreshToken});
            if (res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true);
            }
        }catch(error){
            setIsAuthorized(false)
            console.log(error)
        }
    }

    const auth = async () =>{
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(!token){
            setIsAuthorized(false)
            return
        }
        const decoded = parseJwt(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now()/1000;
        if ( tokenExpiration < now){
            await refreshToken()
        }else setIsAuthorized(true)
    }
    if (isAuthorized == null){
        return <div>Loading...</div>
    }
    return isAuthorized ? children : <Navigate to="/auth/login"/>
}

export default ProtectedRoute;