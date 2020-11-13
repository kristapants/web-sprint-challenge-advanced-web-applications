import React, { cloneElement, useState } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const initialBubble = {
  color: '',
  code: { hex: '' },
}

export default function BubbleForm({
  bubble,
  updateBubble,
  editBubble,
  saveUpdate,
  deleteBubble,
}) {

  const [bubbleToUpdate, setBubbleToUpdate] = useState(initialBubble)

  const editBubble = (bubble) => {
    setBubbleToUpdate(bubble)
  }

  const saveUpdate = (e) => {
    e.preventDefault()
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${bubbleToUpdate.id}`, bubbleToUpdate)
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => console.log(err.response))
  }

  const deleteBubble = (bubble) => {
    axiosWithAuth()
      .delete(`/colors/${bubble.id}`, bubbleToUpdate)
      .then((res) => {
        console.log(res)
        // updatebubbles(bubbles.filter((item) => item.id !== bubble.id))
				// if the server has filter in .delete() then this is not needed
      })
      .catch((err) => console.log(err.response))
  }

  return (
    <div>
      <ul>
        {bubbles.map((bubble) => (
          <li
            key={bubble.name}
            onClick={() => editbubble(bubble)}
            className='edit-bubbles'
          >
            <span>
              <span
                onClick={(e) => {
                  e.stopPropagation()
                  deletebubble(bubble)
                }}
              >
                X
              </span>{' '}
              {bubble.name}
            </span>
          </li>
        ))}
      </ul>
      {updating && (
        <form onSubmit={saveUpdate}>
          <legend>Update bubble</legend>
          <label>
            Name:
            <input
              onChange={(e) =>
                setBubbleToUpdate({ ...bubbleToUpdate, name: e.target.value })
              }
              value={bubbleToUpdate.name}
            />
          </label>
          <label>
            Sound:
            <input
              onChange={(e) =>
                setBubbleToUpdate({ ...bubbleToUpdate, sound: e.target.value })
              }
              value={bubbleToUpdate.sound}
            />
          </label>
          <label>
            Classification:
            <input
              onChange={(e) =>
                setBubbleToUpdate({
                  ...bubbleToUpdate,
                  classification: { species: e.target.value },
                })
              }
              value={bubbleToUpdate.classification.species}
            />
          </label>
          <div>
            <button type='submit'>Update</button>
            <button>Cancel</button>
          </div>
        </form>
      )}
    </div>
  )
}