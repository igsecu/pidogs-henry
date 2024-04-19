const LastDogs = ({ dogs }) => {
  return (
    <div className="list-group me-0 me-lg-0 me-md-2 mb-2 rounded-0">
      <p className="list-group-item border-0 border-bottom border-danger border-2 px-0 fw-bold">
        Last Dogs
      </p>
      {dogs.map((d) => (
        <a
          key={d.id}
          href="/"
          className="list-group-item list-group-item-action border-0 border-bottom pb-0"
        >
          <div className="d-flex">
            <img
              src={d.image}
              alt=""
              className="rounded-circle"
              style={{ width: "30px", height: "30px" }}
            />
            <div className="ms-2">
              <p>{d.name}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default LastDogs;
