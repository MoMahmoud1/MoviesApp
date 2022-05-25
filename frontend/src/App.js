import './App.css';
import React from "react";
import {Reviews,Home2} from './pages';
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";



function App() {
  let [movies, setMovies] = useState([]);
  

  useEffect(() => {
    fetch("/api/data")
      .then((response) => response.json())
      .then(setMovies);
  }, []);
  return (

    <div className='movies'>
      <Routes>
            <Route path="/" element={<Home2 
            movies={movies} onRemoveMovie={ title => {
              const removeMovie = async () => {
                  const movieRemoved = await fetch("/api/removeMovie", 
                      {method: "post", 
                      body: JSON.stringify({Title: title}),
                      headers: {"Content-Type": "application/json"}
                      })


                 // const body = await movieRemoved.json();
                  // if (body.message !== "Unable to delete movie") {
                  //     const newMovies = movies.filter(movie => movie.Title !== title);
                  //     setMovies(newMovies);
                  // }
              }
              removeMovie();
        

            }
          }/>}
          
          />


            <Route path="/reviews" element={<Reviews addmovies ={(newmovies => {
              console.log("movie=>",newmovies);
              setMovies([...movies,newmovies])
            })} />} />
      </Routes>
          
    </div>


  );

}

export default App;
