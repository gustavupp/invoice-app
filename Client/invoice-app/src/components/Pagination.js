import React, { useContext } from 'react'
import { AppContext } from '../Context'
import { useAuth0 } from '@auth0/auth0-react'

const Pagination = () => {
  //auth0 stuff. Grab userId from auth0
  const { user: { sub: userId } = {} } = useAuth0()
  const { getInvoices, amountOfPages } = useContext(AppContext)

  return (
    <div className="d-flex flex-column align-items-center">
      <nav aria-label="Page navigation ">
        <ul className="pagination">
          {/* <li className="page-item">
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </a>
        </li> */}

          {Array.from({ length: amountOfPages }).map((_, index) => {
            return (
              <li className="page-item" key={index}>
                <button
                  className="page-link"
                  onClick={() => getInvoices(userId, index)}
                >
                  {index + 1}
                </button>
              </li>
            )
          })}

          {/* <li className="page-item">
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </a>
        </li> */}
        </ul>
      </nav>
    </div>
  )
}

export default Pagination
