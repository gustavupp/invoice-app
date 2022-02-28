import React from 'react'
import { Link } from 'react-router-dom'

const MainPage = () => {
  return (
    <main>
      <h1>Main Page</h1>
      <Link to="/new-invoice" type="button" className="btn btn-primary">
        New Invoice
      </Link>
    </main>
  )
}

export default MainPage
