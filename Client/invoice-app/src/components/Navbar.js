import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const Navbar = () => {
  //auth0 stuff
  const {
    logout,
    loginWithRedirect,
    loginWithPopup,
    isAuthenticated,
    user: { picture = '', email = '', sub: userId = '' } = {},
  } = useAuth0()

  console.log({ isAuthenticated, picture, email, userId })

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
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              Dashboard <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/settings" className="nav-link">
              Settings
            </Link>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              style={{ cursor: 'pointer' }}
              onClick={isAuthenticated ? logout : loginWithRedirect}
            >
              {isAuthenticated ? 'Logout' : 'Login'}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
