import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import '../styles/navbar.css'

const Navbar = () => {
  //auth0 stuff
  const { logout, loginWithRedirect, isAuthenticated } = useAuth0()

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
        {isAuthenticated ? (
          <ul className="navbar-nav">
            <li className="mr-1 nav-item active">
              <Link to="/" className="nav-link">
                Dashboard <span className="sr-only">(current)</span>
              </Link>
            </li>

            <li className="mr-1 nav-item">
              <Link to="/settings" className="nav-link">
                Settings
              </Link>
            </li>
          </ul>
        ) : null}

        <button
          className="nav-link btn btn-primary"
          style={{ cursor: 'pointer', marginRight: '40px' }}
          onClick={isAuthenticated ? logout : loginWithRedirect}
        >
          {isAuthenticated ? 'Logout' : 'Login'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
