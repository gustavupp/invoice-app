import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { InvoiceTemplate } from './components/InvoiceTemplate'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MainPage from './pages/MainPage'
import NewInvoicePage from './pages/NewInvoicePage'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'

function App() {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0()
  console.log({ isAuthenticated, user })

  // useEffect(() => {
  //   if (!isAuthenticated) return loginWithRedirect()
  // }, [isAuthenticated])

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/invoice/:invoiceId" element={<NewInvoicePage />} />
        <Route path="/invoices/:invoiceId" element={<InvoiceTemplate />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
