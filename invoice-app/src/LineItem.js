import React, { useEffect, useRef, useContext } from 'react'
import { AppContext } from './Context'

const LineItem = ({ handleChange, index }) => {
  const { invoiceTotal } = useContext(AppContext)
  const quantity = useRef(null)
  const rate = useRef(null)

  return (
    <>
      <tr>
        <th scope="row">1</th>
        <td>
          <input
            type="text"
            name={`service${index}`}
            onChange={(e) => handleChange(e)}
            placeholder=" Description of service..."
          />
        </td>
        <td>
          <input
            ref={quantity}
            type="number"
            name={`quantity${index}`}
            onChange={(e) => handleChange(e)}
            placeholder=" Quantity"
          />
        </td>
        <td>
          <input
            ref={rate}
            type="number"
            name={`rate${index}`}
            onChange={(e) => handleChange(e)}
            placeholder=" $"
          />
        </td>
        <td>
          {quantity.current && rate.current
            ? '$' + (quantity.current.value * rate.current.value).toFixed(2)
            : '$' + 0}
        </td>
      </tr>
    </>
  )
}

export default LineItem
