import React, { useEffect, useRef, useContext } from 'react'
import { AppContext } from './Context'

const LineItem = ({ handleChange, index }) => {
  const { lineItemCount } = useContext(AppContext)
  console.log(lineItemCount)
  const quantity = useRef(null)
  const rate = useRef(null)
  const amount =
    quantity.current && rate.current
      ? parseFloat((quantity.current.value * rate.current.value).toFixed(2))
      : 0

  useEffect(() => {
    lineItemCount(amount)
  }, [amount])

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
        <td>{`$${amount}`}</td>
      </tr>
    </>
  )
}

export default LineItem
