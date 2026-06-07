import { useParams, Link } from "react-router-dom"
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function AuthPage(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("")

    const navigate = useNavigate();
    const { page } = useParams();
    let name = page == "login" ? "Log In" : "Sign Up";

    const ACCESS_TOKEN = "access";
    const REFRESH_TOKEN = "refresh";

    const usernameChangeHandler = (e) => {
        setUsername(e.target.value);
    }

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    }

    const passwordConfirmationChangeHandler = (e) =>{
        setPasswordConfirmation(e.target.value)
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            if (page === 'signup'){
                if (password !== passwordConfirmation){
                    alert("Your passwords are not the same!")
                    return
                }
                localStorage.clear();
                const res = await api.post('/accounts/create-account/', {username, password})
                navigate('/auth/login')
            }else{
                const res = await api.post('/api/token/', {username, password});
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/add-post");
            }
        }catch(error){
            alert(error)
        }
    }
   
    return (
        <form onSubmit={submitHandler} className="auth-form card" style={{width:400, alignSelf:"center"}}>
            <div className="card-body">
            <h2>{ name }</h2>
            <div className="mb-3 mt-3">
                <label for="username" className="form-label">Username:</label>
                <input type="text" className="form-control" onChange={usernameChangeHandler} placeholder="Username"/>
            </div>
            <div className="mb-3">
                <label for="pwd" className="form-label">Password:</label>
                <input type="password" className="form-control" onChange={passwordChangeHandler} placeholder="Enter password" name="password1"/>
            </div>
            {
                page=='signup'?(
                    <div className="mb-3">
                        <label for="pwd" className="form-label">Password Confirmation:</label>
                        <input type="password" className="form-control" id="pwd2" placeholder="Confirm password" onChange={passwordConfirmationChangeHandler}/>
                    </div>
                ):null
            }
            <button type="submit" className="btn btn-primary">{name}</button>
            <p className="mt-2">{ page=='login'?"Don't Have an account? Create ": "Already Have an account? Login " } <Link to={page=="login"?'/auth/signup':'/auth/login'} >Here!</Link></p>
            </div>
        </form>
    )
}
