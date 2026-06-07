import { useParams, Link } from "react-router-dom"


export default function AuthPage(){
    const { page } = useParams();
    let name = page == "login" ? "Log In" : "Sign Up"
   
    return (
        <form action="" method="post" className="auth-form card" style={{width:400, alignSelf:"center"}}>
            <div className="card-body">
            <h2>{ name }</h2>
            <div className="mb-3 mt-3">
                <label for="username" className="form-label">Username:</label>
                <input type="text" className="form-control" id="email" name="username" placeholder="Username"/>
            </div>
            <div className="mb-3">
                <label for="pwd" className="form-label">Password:</label>
                <input type="password" className="form-control" id="pwd1" placeholder="Enter password" name="password1"/>
            </div>
            {
                page=='signup'?(
                    <div className="mb-3">
                        <label for="pwd" className="form-label">Password Confirmation:</label>
                        <input type="password" className="form-control" id="pwd2" placeholder="Confirm password" name="password1"/>
                    </div>
                ):null
            }
            <button type="submit" className="btn btn-primary">{name}</button>
            <p className="mt-2">{ page=='login'?"Don't Have an account? Create ": "Already Have an account? Login " } <Link to={page=="login"?'/auth/signup':'/auth/login'} >Here!</Link></p>
            </div>
        </form>
    )
}
