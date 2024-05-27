import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import _ from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const [photos, setPhotos] = React.useState([]);
  const [filteredPhotos, setfilteredPhotos] = React.useState([]);

  const handleOnChange = _.debounce((e) => {
    const { value } = e.target;

    if (!!value.trim()) {
      const newPhotos = photos.filter(({ title }) =>
        title.includes(value.toLowerCase().trim())
      );
      setfilteredPhotos(newPhotos);
    } else {
      setfilteredPhotos(photos);
    }
  }, 2000);

  const fetchData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/photos");
    const photo = await res.json();

    if (photo?.length !== 0) {
      setPhotos(photo);
      setfilteredPhotos(photo);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="container my-5">
        <div className="search-section">
          <input
            className="form-control"
            placeholder="Search"
            onChange={handleOnChange}
          />
        </div>

        <div className="photo-section">
          <InfiniteScroll
            dataLength={filteredPhotos.length}
            next={fetchData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {filteredPhotos?.map((photo) => (
              <div key={photo.id} className="card">
                <img src={photo?.url} className="card-img-top" alt="" />
                <div className="card-body">
                  <h5 className="card-title">{photo?.title}</h5>
                </div>
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export default App;
