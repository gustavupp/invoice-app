import React from 'react'

const Footer = () => {
  return (
    <footer className="page-footer font-small text-white bg-dark">
      <div className="footer-copyright text-center py-3">
        © {new Date().getFullYear()} Copyright:
        <a href="https://mdbootstrap.com/"> invoiceapp.com</a>
      </div>
    </footer>
  )
}

export default Footer
