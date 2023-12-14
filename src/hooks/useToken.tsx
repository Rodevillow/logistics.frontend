import React from "react";
import {useNavigate} from "react-router-dom";


export const useToken = () => {
    const [token, setToken] = React.useState(localStorage.getItem("token") || null)
const navigate = useNavigate()
    const setTokenAndSave = (newToken: any) => {
        setToken(newToken);
        localStorage.setItem('token', newToken)
    }


const handleLogout =() => {
    setToken(null)
    localStorage.removeItem("token")
    navigate('/auth/login')
}




    return {
        token, setTokenAndSave, handleLogout
    }

}
