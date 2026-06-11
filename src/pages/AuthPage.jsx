import { useParams, Link } from "react-router-dom"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function AuthPage(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [isLoading, setIsLoading] = useState(false)

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
    if(page === 'logout'){
        localStorage.clear();
        navigate("/home")
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            if (page === 'signup'){
                setIsLoading(true)
                if (password !== passwordConfirmation){
                    alert("Your passwords are not the same!")
                    return
                }
                localStorage.clear();
                const res = await api.post('/accounts/create-account/', {username, password})
                navigate('/auth/login')
            }else if(page === 'login'){
                setIsLoading(true)
                const res = await api.post('/api/token/', {username, password});
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/home");
            }
        }catch(error){
            console.log(error)
        }      
    }
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-5">
                    <form onSubmit={submitHandler} className="card shadow-sm">
                        <div className="card-body p-4">
                            <h3 className="card-title text-center mb-3">{name}</h3>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input id="username" type="text" className="form-control" value={username} onChange={usernameChangeHandler} placeholder="Username" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pwd" className="form-label">Password</label>
                                <input id="pwd" type="password" className="form-control" value={password} onChange={passwordChangeHandler} placeholder="Enter password" />
                            </div>
                            {page === 'signup' ? (
                                <div className="mb-3">
                                    <label htmlFor="pwd2" className="form-label">Password Confirmation</label>
                                    <input id="pwd2" type="password" className="form-control" value={passwordConfirmation} onChange={passwordConfirmationChangeHandler} placeholder="Confirm password" />
                                </div>
                            ) : null}
                            {isLoading ? <div className="mb-3 text-center">Loading...</div> : null}
                            <div className="d-grid mb-2">
                                <button type="submit" className="btn btn-primary">{name}</button>
                            </div>
                            <p className="text-center mb-0">{page === 'login' ? "Don't have an account? " : "Already have an account? "}<Link to={page === 'login' ? '/auth/signup' : '/auth/login'}>Here!</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
