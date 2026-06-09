import { useParams } from "react-router-dom"
import { Navigate } from "react-router-dom"

function Tunel()  {
    const { id } = useParams();
    return <>
        <Navigate to={`/view-post/${id}`} />
    </>
}

export default Tunel;