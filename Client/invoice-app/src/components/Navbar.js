import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import '../styles/navbar.css'

const Navbar = () => {
  //auth0 stuff
  const {
    logout,
    loginWithRedirect,
    isAuthenticated,
    user: { picture = '', nickname = '' } = {},
  } = useAuth0()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">
        InvoiceApp
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="mr-1 nav-item active">
            <Link to="/" className="nav-link">
              Dashboard <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="mr-1 nav-item">
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
          {isAuthenticated ? (
            <li className="mr-1 nav-item">
              <Link to="/settings" className="nav-link">
                Settings
              </Link>
            </li>
          ) : null}
          <li className="mr-1 nav-item">
            <button
              className="nav-link btn btn-primary"
              style={{ cursor: 'pointer' }}
              onClick={isAuthenticated ? logout : loginWithRedirect}
            >
              {isAuthenticated ? 'Logout' : 'Login'}
            </button>
          </li>
        </ul>
        {isAuthenticated ? (
          <div className="text-white d-flex">
            <p>Welcome {nickname} !</p>
            <img
              src={picture}
              alt="profile"
              width="50px"
              style={{ borderRadius: '50%', margin: '0 15px' }}
            />
          </div>
        ) : null}
      </div>
    </nav>
  )
}

export default Navbar
