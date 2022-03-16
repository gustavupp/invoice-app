import React, { useContext, useState } from 'react'
import { AppContext } from '../Context'
import { useAuth0 } from '@auth0/auth0-react'

const Pagination = () => {
  const [page, setPage] = useState(0)
  //auth0 stuff. Grab userId from auth0
  const { user: { sub: userId } = {} } = useAuth0()
  const { getInvoices, amountOfPages } = useContext(AppContext)

  const handleClick = (index) => {
    //setIsPaginationLoading(true)
    if (index > amountOfPages) return
    getInvoices(userId, index).then(() => setPage(index))
  }
  console.log(page)
  return (
    <div className="d-flex flex-column align-items-center">
      <nav aria-label="Page navigation ">
        <ul className="pagination">
          <li
            className={page + 1 !== 1 ? 'page-item' : 'page-item disabled'}
            onClick={() => (page + 1 > 1 ? handleClick(page - 1) : null)}
          >
            <button className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </button>
          </li>

          {Array.from({ length: amountOfPages }).map((_, index) => {
            return (
              <li
                className={page === index ? 'page-item active' : 'page-item'}
                key={index}
              >
                <button
                  className="page-link"
                  onClick={() => handleClick(index)}
                >
                  {index + 1}
                </button>
              </li>
            )
          })}
          <li
            className={
              page + 1 < amountOfPages ? 'page-item' : 'page-item disabled'
            }
            onClick={() =>
              page + 1 < amountOfPages ? handleClick(page + 1) : null
            }
          >
            <button className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Pagination
