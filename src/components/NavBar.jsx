import { Link } from 'react-router-dom';

const NavBar = () => {
    return(
        <>
            <nav>
                <div className="container-fluid d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <h1 className="me-3 mb-0"><a href="">BLOG</a></h1>
                        <small className="me-3">username</small>
                        <div className="links">
                            <Link to="/home">HOME</Link>
                            <Link to="/add-post">ADD POST</Link>
                            <Link to="/signin">Sign in</Link>
                        </div>
                    </div>
                    <form action="" method="get" className="searc d-flex ms-3" role="search">
                        <input type="search" name="search" className="form-control form-control-sm me-2" placeholder="Search posts"/>
                        <button type="submit" className="btn btn-sm btn-light">Search</button>
                    </form>
                </div>
            </nav>
        </>
    )
}

export default NavBar;