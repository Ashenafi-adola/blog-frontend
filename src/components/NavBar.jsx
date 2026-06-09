import { Link } from 'react-router-dom';

const NavBar = () => {
    return(
        <>
           
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
                    <div className="container-fluid">
                        <Link className="navbar-brand mb-0 h1" to="/home">BLOG</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/home">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/add-post">Add Post</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/auth/login">Sign in</Link>
                                </li>
                            </ul>

                            <span className="navbar-text me-3">username</span>

                            <form className="d-flex" role="search">
                                <input className="form-control form-control-sm me-2" type="search" placeholder="Search posts" aria-label="Search" />
                                <button className="btn btn-sm btn-light" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </nav>
            
        </>
    )
}

export default NavBar;