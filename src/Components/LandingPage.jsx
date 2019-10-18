import React from "react"
import {Link} from "react-router-dom"
import "../Style/LandingPage.css"


const LandingPage = () => {
  return(
      <div className="box">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Aiwah.id</a>
             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
             </button>
             <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                 <div className="navbar-nav">
                   <Link to="/">
                   <a className="nav-item nav-link active" href="#">Home <span className="sr-only">(current)</span></a>
                   </Link>
                     
                      <Link to="/login">
                      <a className="nav-item nav-link" href="#">Login</a>   
                      </Link>
                     <Link to="/register">
                     <a className="nav-item nav-link" href="#">Register</a>
                     </Link>
                     <Link to="/about">
                     <a className="nav-item nav-link" href="#">About</a>
                     </Link>
                     
                </div>
             </div>
         </nav>
      </div>
  )
}

export default LandingPage;