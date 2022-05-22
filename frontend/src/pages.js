import React from "react";
import { Link } from "react-router-dom";
import {useRef,useState } from 'react';
import image from "./1.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Alert,Container,Row ,Col} from'react-bootstrap';

function Header(props){
    return(
      <header>
        <div id ="header">
        <h1>{props.name} Movies Reviews Website</h1>
        </div>
        <br></br>
        <br></br>
      </header>
    );
  }
  
  
  function Main(props){
    return(
      <main>
        <div id="head">
        <p>The Most {props.adjective} Movies Reviews Wepsite</p>
        </div>
        <img  className="logo" src={image} alt="site logo "/>  
      </main>
    
    );
  }
  
  
  function Footer(props){
    return(
      <footer>
        <p>CopyRight {props.year}</p>
      </footer>
    );
  }

export function Home1(){
    return(
        <div className="App">
       <Header name="MO"/>
       <div id="nav">
            <Link to="/">Home</Link>
        </div>
        <div id="nav2">
          <Link to = "reviews"> Add Movie</Link>
        </div>
          <Main adjective = "Amazing" />
        </div>

    );
}

export function Form({addmovies}) {
  const [values, setValues] = useState(null);


  const addMovieDatabase = async (name, date, actors, poster, rating) => {
    let info = {
      Title: name,
      Released: date,
      Actors: actors,
      Poster: poster,
      Rating: rating,
    };
    setValues(info);
    addmovies(info);
  };

  const formName = useRef();
  const formDate = useRef();
  const formActors = useRef();
  const formPoster = useRef();
  const formRating = useRef();
  const submit = (e) => {
    e.preventDefault();
    const name = formName.current.value;
    const date = formDate.current.value;
    const actors = formActors.current.value;
    const poster = formPoster.current.value;
    const rating = formRating.current.value;

    addMovieDatabase(name, date, actors, poster, rating);
    formName.current.value = '';
    formDate.current.value = '';
    formActors.current.value = '';
    formPoster.current.value = '';
    formRating.current.value = '';
  };

  return (
    <Container fluid>
    
          <Row  className="justify-content-center" >
              <h3> Add New Movie </h3>
              
              <form method="post" id="" onSubmit={submit}>
          
              
                  <label> Image</label>
                  <select ref={formPoster} >
                    <option value='t.jpg'>Termenator</option>
                    <option value='v.avif'>Venom</option>
                    <option value='u.jpg'>Uncharted</option>
                    <option value='r.jpg'>Rocky</option>
                    </select><br/><br/>
                    <br></br>
              
                    <label htmlFor={'name'}>Title</label>

                    <input
                      className="name1"
                      type={'text'}
                      ref={formName}
                      required
                    ></input>
                    <br></br>
              
                    <label  htmlFor={'actor'} >Actors</label>
                    <input placeholder ="@1 @2 @3 @4"
                      className="actor1"
                      type={'text'}
                      ref={formActors}
                      required
                    ></input>
                    <br></br>
                
                
                  <label className="rate1" htmlFor={'rate'}>Rate</label>
              
                    <select  ref={formRating} required >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <br></br>
              
                    <label  htmlFor={'rate'}>Released</label>
                    <input
                      className="released1"
                      type={'date'}
                      ref={formDate}
                      required
                    ></input>
                    <br></br>
                  
                  
      
                
                <Alert variant="primary" >Click to submit</Alert>
                <Button type={"submit"} value={"sumbit"}>
      
                submit
                </Button>
              </form>
            </Row>
    </Container>
  );
}


export function Reviews({addmovies}){
    return(
      <>
          <Button as={Col} variant="secondary"  className="mx-2">
                <Link to="/">Home</Link>
          </Button>
            <Form addmovies={addmovies}/>
      </>
    )
}

export default function Movie({
  Title,Poster,Released,Actors,Rating,
  onRemove = (f) => f,
}) { 
return (
    <div className="movie">
       <button className="delete"
          onClick={() => {  onRemove(Title);
          }}
        >
          Remove
        </button>
          <h2 style={{color:"blue"}}>Movie Name: {Title}</h2>
          <p>
            Actors :{Actors[0]} {Actors[1]} {Actors[2]}  {Actors[3]}

            {/* Actors: {Actors.map((actor,i)=> (actor))} */}
          </p>
          <p>Rating : {Rating}</p>
          <p> Released: {Released}</p>
          <img className="poster" src={"./images/" + Poster} alt={Title}
          width={600}
          height={500}
        />
        <p></p>
       
    </div>
    
  );
  
}
export function Home2({ movies = [], onRemoveMovie = (f) => f }){

    return(
      <>
      <Home1/>
      <div  className="display" >
        {movies.map((movie,key) =>(
          <Movie
          key={key}
          Title={movie.Title}
          Actors={movie.Actors}
          Poster={movie.Poster}
          Rating={movie.Rating}
          Released={movie.Released}
          onRemove={onRemoveMovie}
        ></Movie>
            
        ))}
      </div> 
      <div>
     <Footer year = {new Date().getFullYear()} />
     </div>
      </>

    );
  }