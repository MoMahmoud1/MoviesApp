import React from "react";
import { Link } from "react-router-dom";
import {useRef,useState } from 'react';
import image from "./1.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Alert,Container,Row ,Col,Form} from'react-bootstrap';

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

export function AddReview({addmovies}) {
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
    <Container fluid="md" style={{backgroundColor:" #f2f2f2", borderRadius:"20px"}} >
    
          <Row >
          <Col>
              <h3> Add New Movie </h3>
              
              <Form method="post" onSubmit={submit}>
          
              <div className="form-outline">
          
                  <label className="form-label" htmlFor="formControlLg">Image</label>
                  <select ref={formPoster} id="formControlLg" className="form-control form-control-lg" >
                    <option value='t.jpg'>Termenator</option>
                    <option value='v.avif'>Venom</option>
                    <option value='u.jpg'>Uncharted</option>
                    <option value='r.jpg'>Rocky</option>
                    </select>
                    <br/><br/>
                    <br></br>
              </div>
              <div className={"form-outline"}>
                    <label className={"form-label"} htmlFor={"formControlLg"} >Title</label>
                    <input  id={"formControlLg"} className={"form-control form-control-lg"}
                      type={'text'}
                      ref={formName}
                      required
                    ></input>
              </div>      
                    <br></br>
                    <br></br>

              <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Actors</label>
                    <input className="form-control"
                      type={'text'}
                      ref={formActors}
                      required
                    ></input>
                    <br></br>
                    <br></br>
              </div>     

              <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Rate</label>
                    <select  ref={formRating} required  className="form-control" id="exampleFormControlSelect1" >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                   <br></br>
                    <br></br>
              </div>
              <div className="form-group">
                    <label htmlFor="exampleFormControlInput1" >Released</label>
                    <input className="form-control"
                      type={'date'}
                      ref={formDate}
                      required
                    ></input>
                    <br></br>
                    <br></br>
              </div>
                <Button type={"submit"} value={"sumbit"}
                style={{width: "100%",
                  backgroundColor:"#4CAF50",
                  color: "white",
                  padding:"14px 20px",
                  margin: "8px 0",
                  border: "none",
                  borderRadius:"20px",
                  cursor:"pointer"}}
                > Submit </Button>
              </Form>
              </Col>
            </Row>
    </Container>
  );
}


export function Reviews({addmovies}){
    return(
      <>
          <Button style={{backgroundColor:"aqua",width:"150px"}}>
                <Link to="/">Home</Link>
          </Button>
            < AddReview addmovies={addmovies}/>
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