import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';

const Movie = (props) => {
  const {movie} = props;

  const [details, setDetails] = useState();
  const [releaseDate, setReleaseDate] = useState("");

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  useEffect(() => {
    var d = new Date(movie.release_date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setReleaseDate(d.toLocaleDateString('fr-FR', options));

    async function fetchMovieDetails() {
      const response = await fetch("https://api.themoviedb.org/3/movie/" + movie.id + "?api_key=03b15855d9c2c237c0e16bc97e529523&language=fr-FR");
      if (!response.ok) {
        if (response.status === 401)
          throw new Error("You do not have the rights to access to this data.");
        if (response.status === 404)
          throw new Error("Movie details not found.");
        throw new Error("Bad response from server");
      }
      const json = await response.json();
      setDetails(json);
    }

    fetchMovieDetails();
  }, [movie.id, movie.release_date])

  return (
    <>
      <Card className="movie-card bg-color">
        <div className="movie-card-image-wrapper">
          <Card.Img variant="top" src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={"Affiche de " + movie.title} className="movie-card-image pointer" onClick={handleShow} />
        </div>
        <Card.Body className="movie-card-body">
          <Card.Text className="pointer movie-card-text" onClick={handleShow}>{movie.vote_average * 10}% des utilisateurs ont aimé ce film</Card.Text>
          <Card.Title className="h6 pointer movie-card-title" onClick={handleShow}>{movie.title}</Card.Title>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleShow} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>Détails du film</Modal.Title>
        </Modal.Header>
        <Modal.Body className="container movie-modal-body" style={{ backgroundImage: "linear-gradient(to right, rgba(14.12%, 14.51%, 16.86%, 1.00) 150px, rgba(22.35%, 22.35%, 22.35%, 0.84) 100%), url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces" + movie.backdrop_path + ")" }}>
          <div className="row">
            <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={"Affiche de " + movie.title} className="col-sm-3" />
            <div className="col-sm-9">
              <h2 className="mb-1">{movie.title}</h2>
              {details ? details.genres.map((genre, i) => <span key={i}>{i > 0 && ", "} {genre.name}</span>) : "Genres non précisés"}
              <p className="movie-card-text mb-3">Sorti le {releaseDate}</p>

              <h5>Synopsis : </h5>{movie.overview || "Pas de synopsis disponible pour ce film."}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Movie;