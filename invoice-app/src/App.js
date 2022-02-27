import { NewInvoice } from './NewInvoice'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { InvoiceTemplate } from './InvoiceTemplate'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewInvoice />} />
        <Route path="/invoice" element={<InvoiceTemplate />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
