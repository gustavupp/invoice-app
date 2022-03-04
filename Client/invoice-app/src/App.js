import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { InvoiceTemplate } from './components/InvoiceTemplate'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MainPage from './pages/MainPage'
import NewInvoicePage from './pages/NewInvoicePage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/invoice/:invoiceId" element={<NewInvoicePage />} />
        <Route path="/invoices/:invoiceId" element={<InvoiceTemplate />} />
        {/* <Route path="/invoices/new" element={<InvoiceTemplate />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
