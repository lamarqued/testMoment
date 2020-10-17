import Col from 'react-bootstrap/Col'
import Movie from './Movie';
import React, { useState } from 'react';
import useInfiniteScroll from "../useInfiniteScroll";

const List = () => {
  const [, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  const [listMovies, setListMovies] = useState([]);
  const [pageCounter, setPageCounter] = useState(1);

  async function fetchMoreListItems() {
    const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=03b15855d9c2c237c0e16bc97e529523&language=fr-FR&page=" + pageCounter);
    if (!response.ok) {
      if (response.status === 401)
        throw new Error("You do not have the rights to access to this data.");
      if (response.status === 404)
        throw new Error("Movie list not found.");
      throw new Error("Bad response from server");
    }
    const json = await response.json();
    setListMovies([...listMovies, ...json.results]);
    setPageCounter(pageCounter + 1);
    setIsFetching(false);
  }

  return (
    <>
      {listMovies.map((listMovie, i) => <Col key={i}><Movie key={listMovie.id} movie={listMovie} /></Col>)}
    </>
  );
}

export default List;