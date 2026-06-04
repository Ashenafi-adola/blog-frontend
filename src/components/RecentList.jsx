

export default function RecentList(){
    return (
        <>
        <li className="d-flex mb-3">
            <a href="{% url 'viewpost' recent.id %}" className="d-flex text-decoration-none text-dark w-100">
                <img src="{{ recent.photo.url }}" alt="" className="rounded-circle me-2" width="48" height="48"/>
                <div>
                    <div className="fw-bold">posttitle</div>
                    <small className="text-muted">@postauthor - </small>
                </div>
            </a>
        </li>
        </>
    )
}