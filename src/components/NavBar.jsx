

const NavBar = () => {
    return(
        <>
        <nav>
            <div className="container-fluid d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <h1 className="me-3 mb-0"><a href="{% url 'home' %}">BLOG</a></h1>
                        <small className="me-3">username</small>
                    <div className="links">
                        <a href="{% url 'home' %}">HOME</a>
                        <a href="{% url 'post' %}">ADD POST</a>
                       
                            <a href="{% url 'signin' %}">Sign in</a>
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