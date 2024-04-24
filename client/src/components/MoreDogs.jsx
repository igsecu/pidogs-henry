import { Link } from "react-router-dom";

const MoreDogs = ({ dogs }) => {
  return (
    <div className="list-group rounded-0">
      <p className="list-group-item border-0 border-bottom border-danger border-2 px-0 fw-bold">
        More Views
      </p>
      {dogs.map((d) => (
        <Link
          key={d.id}
          to={`/dogs/${d.id}`}
          className="list-group-item list-group-item-action border-0 border-bottom"
        >
          <div className="d-flex">
            <img
              src={d.image}
              alt=""
              className="rounded-circle"
              style={{ width: "30px", height: "30px" }}
            />
            <div className="ms-2 d-flex flex-lg-column w-100">
              <p className="mb-0">{d.name}</p>
              <span className="fw-bold ms-2 ms-lg-0">{d.views} views</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MoreDogs;
