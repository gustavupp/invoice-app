import React from 'react'

const LineItem = ({ handleChange, index }) => {
  console.log(index)
  return (
    <>
      <tr>
        <th scope="row">1</th>
        <td>
          <input
            type="text"
            name={`service${index}`}
            onChange={(e) => handleChange(e)}
          />
        </td>
        <td>
          <input
            type="text"
            name={`hours${index}`}
            onChange={(e) => handleChange(e)}
          />
        </td>
        <td>
          <input
            type="text"
            name={`rate${index}`}
            onChange={(e) => handleChange(e)}
          />
        </td>
      </tr>
    </>
  )
}

export default LineItem
