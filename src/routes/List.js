import React, { useState, useEffect } from 'react'
import trash from '../trash_can.png'
import pencil from '../pencil.png'

export default function List({ value }) {
  const [events, setEvents] = useState(null)

  useEffect(() => {
    setEvents(JSON.parse(localStorage.getItem(value.toDateString())))
  }, [value, events])
  return (
    <div className="right">
      <ul>
        {events && events.map(((value, index) => <li key={index}>
          <div>
            <h3>{value.name}</h3>
            {Case(value)}
          </div>
          <div>
            <img className="edit" src={pencil} alt="edit" />
            <img className="remove" src={trash} alt="remove" />
          </div>
        </li>))}

      </ul>
    </div>
  )
}

function Case(value) {
  const { selectValue, additionalInfo } = value
  switch (selectValue) {
    case 'holiday':
      return <div>Бюджет: {additionalInfo.number}</div>
    case 'event':
      return <div>Адрес: {additionalInfo.place}<br />Время: {additionalInfo.time}</div>
    case 'other':
      return <div>{additionalInfo.info}</div>
    default:
      return null
  }
}