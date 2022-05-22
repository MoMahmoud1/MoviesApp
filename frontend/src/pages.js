import React from "react";
import { Link } from "react-router-dom";
import {useRef,useState } from 'react';
import image from "./2.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Container,Row ,Col,Form, Alert,Card} from'react-bootstrap';
import {FaGithub} from 'react-icons/fa'; 
import {FaLinkedin} from 'react-icons/fa'; 
import {AiOutlineMail} from 'react-icons/ai';
import {MdPictureAsPdf} from 'react-icons/md';

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
  
  
  function Main(){
    return(
      <main>
        <img  className="logo" src={image} alt="site logo " style={{borderRadius:"20px",width:"50%",height:"50%"}}/>  
      </main>
    );
  }
  
  
  function Footer(props){
    return(
    
        <footer className="page-footer font-small blue pt-4">
          <div className="container-fluid text-center text-md-left">
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="text-uppercase">MOhamed  FULL STACK DEVELOPER </h5>
                
                
                <ul className="list-unstyled">
                  <li>
                  <AiOutlineMail> Mohamed.Mahmoud70@ed.cna.nl.ca</AiOutlineMail>
                  <a>Mohamed.Mahmoud70@ed.cna.nl.ca</a>
                  </li>
                </ul>

              </div>
                  <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Links</h5>

                <ul className="list-unstyled">
                  <li>
                    <FaGithub> </FaGithub>
                    <a href="https://github.com/mohamed-baioumy">Github</a>
                  </li>
                  <li>
                    <FaLinkedin></FaLinkedin>
                    <a href="https://www.linkedin.com/in/mohamed-mahmoud-0b618112a">linkedin</a>
            
                  </li>
                  <li>
                  <MdPictureAsPdf></MdPictureAsPdf>
                    <a href=" https://acrobat.adobe.com/link/review?uri=urn:aaid:scds:US:669061e0-3a6e-3412-b598-2566204b116c">Resume</a>
            
                  </li>
                </ul>

              </div>
            </div>
          

          </div>

        <p>CopyRight {props.year}</p>
      </footer>
    );
  }

export function Home1(){
    return(
      <>
     <Container>
          <Row >
              <Header name="MO"/>
                <Button
                 style={{width: "50%",
                 backgroundColor:"#4CAF50",
                 color: "white",
                 padding:"14px 20px",
                 margin: "8px 0",
                 border: "none",
                 borderRadius:"20px",
                 cursor:"pointer"}} >
                  <Link to="/">Home</Link>
                  </Button>
                  <Button
                   style={{width: "50%",
                   backgroundColor:"#4CAF50",
                   color: "white",
                   padding:"14px 20px",
                   margin: "8px 0",
                   border: "none",
                   borderRadius:"20px",
                   cursor:"pointer"}}>
                  <Link to = "reviews"> Add Movie</Link> 
                  </Button>  
                  <Main/>     
          </Row> 
      </Container>
      </>
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

    addMovieDatabase(name, date, actors.split(','), poster, rating);
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
                  {/* <option value=''>Select Image</option> */}
                    <option value='t.jpg'>Termenator</option>
                    <option value='v.avif'>Venom</option>
                    <option value='u.jpg'>Uncharted</option>
                    <option value='r.jpg'>Rocky</option>
                    </select>
                    <br/><br/>
                    <br></br>
              </div>
              <div className={"form-outline"}>
                    <label className={"form-label"} htmlFor={"formControlLg" } >Title</label>
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
   <Container style={{width:"600px"}}>
     <Row>
        <Col>
            <header className="app-header">
              <Card className="mb-3" style={{color:"#000"}}>
                <Button className="delete" onClick={() => {  onRemove(Title);}}>
                    Remove
                </Button>
                <Card.Title>Movie Name: {Title}</Card.Title>
              
                <Card.Text> Actors :{Actors[0]} {Actors[1]} {Actors[2]}  {Actors[3]}</Card.Text>

                <Card.Text>Rating : {Rating}</Card.Text>
                <Card.Text> Released: {Released}</Card.Text>
                <div className="bg-image hover-overlay hover-zoom hover-shadow ripple">
                <Card.Img src={"./images/" + Poster} alt={Title} style={{height:"500px"}}/>
                </div>  
              </Card>    
            </header>  
        </Col>
      </Row>        
    </Container> 
    
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
    <Alert>
     <Footer year = {new Date().getFullYear()} />
    </Alert>
     </div>
      </>

    );
  }