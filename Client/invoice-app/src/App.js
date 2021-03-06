import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { InvoiceTemplate } from './components/InvoiceTemplate'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MainPage from './pages/MainPage'
import NewInvoicePage from './pages/NewInvoicePage'
import UserSettingsPage from './pages/UserSettingsPage'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useContext } from 'react'
import { AppContext } from './Context'
import PrivateRoute from './pages/PrivateRoute'

function App() {
  const { addUserToContext, getInvoices, checkIfUserExists, addUserToDb } =
    useContext(AppContext)

  //auth0 stuff
  const {
    user: {
      email = '',
      sub: userId = '',
      name = '',
      picture = '',
      nickname = '',
    } = {},
  } = useAuth0()

  //chech the database for the user id, if not in the database, add the user.
  useEffect(() => {
    if (userId) {
      checkIfUserExists(userId).then((data) => {
        if (!data) {
          addUserToDb(email, userId, nickname, picture, name)
            .then(() => checkIfUserExists(userId))
            .then((data) => {
              addUserToContext(data)
              getInvoices(userId)
            })
        } else {
          addUserToContext(data)
          getInvoices(userId)
        }
      })
    }
    // eslint-disable-next-line
  }, [userId])

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />

        <Route path="/invoice/:invoiceId" element={<NewInvoicePage />} />
        <Route path="/invoice/new" element={<NewInvoicePage />} />
        <Route path="/invoices/:invoiceId" element={<InvoiceTemplate />} />
        <Route path="/settings" element={<UserSettingsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
