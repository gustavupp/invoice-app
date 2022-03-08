import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { InvoiceTemplate } from './components/InvoiceTemplate'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MainPage from './pages/MainPage'
import AboutPage from './pages/AboutPage'
import NewInvoicePage from './pages/NewInvoicePage'
import UserSettingsPage from './pages/UserSettingsPage'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useContext } from 'react'
import { AppContext } from './Context'

function App() {
  const { addUserToContext, getInvoices } = useContext(AppContext)
  //auth0 stuff
  const { user: { email = '', sub: userId = '' } = {} } = useAuth0()

  //chech the database for the user id, if not in the database, add the user.
  useEffect(() => {
    if (userId) {
      checkIfUserExists(userId).then((data) => {
        if (data.length === 0) addUserToDb(email, userId)
        else {
          //addUserToContext(userId)
          getInvoices(userId)
        }
      })
    }
  }, [userId, email])

  const addUserToDb = async (email, userId) => {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({ email, userId }),
    }
    try {
      const response = await fetch(
        'http://localhost:3001/api/add-user',
        options
      )
      const data = await response.json()
    } catch (error) {
      throw error
    }
  }

  const checkIfUserExists = async (userId) => {
    const response = await fetch(`http://localhost:3001/api/user/${userId}`)
    const data = await response.json()
    return data
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/invoice/:invoiceId" element={<NewInvoicePage />} />
        <Route path="/invoices/:invoiceId" element={<InvoiceTemplate />} />
        <Route path="/settings" element={<UserSettingsPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
