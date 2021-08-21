import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'

export default function Add({ value }) {
  const [name, setName] = useState("")

  const [selectValue, setSelectValue] = useState('holiday')

  const [additionalInfo, setAdditionalInfo] = useState({})

  // const [currentEvents, setCurrentEvents] = useState(JSON.parse(localStorage.getItem(value.toDateString())))

  let history = useHistory()

  function GoBack() {
    history.push("/")
  }

  function Save() {
    let currentEvents = JSON.parse(localStorage.getItem(value.toDateString()))
    const values = { name, selectValue, additionalInfo }
    console.log(currentEvents, typeof (currentEvents))
    if (currentEvents) {
      currentEvents.push(values)
      localStorage.setItem(
        value.toDateString(),
        JSON.stringify(currentEvents)
      )
    }
    else localStorage.setItem(value.toDateString(), JSON.stringify([values]))
    history.push("/")
  }

  return (
    <div>
      <p>Название События</p>
      <input type="text" placeholder="Название мероприятия" value={name} onChange={(e) => setName(e.target.value)} />
      <p>Тип события</p>
      <select onChange={(e) => { setSelectValue(e.target.value) }}>
        <option defaultValue vlaue="holiday">Правздничные дни</option>
        <option value="event">Мероприятия</option>
        <option value="other">Пометки / Другое</option>
      </select>
      <SelectSwitch value={selectValue} info={additionalInfo} setInfo={setAdditionalInfo} />
      <button onClick={GoBack}>Отмена</button>
      <button onClick={Save}>Сохранить</button>
    </div>
  )
}

function SelectSwitch({ value, info, setInfo }) {
  const jsx = useRef(null)
  useEffect(() => {
    switch (value) {
      case 'holiday':
        setInfo({ number: 0 })
        jsx.current = (<>
          <p>Бюджет</p>
          <input type="number" placeholder="Бюджет" value={info.number} onChange={(e) => setInfo({ number: e.target.value })} />
        </>
        )
        break;
      case 'event':
        setInfo({ place: "", time: "" })
        jsx.current = (
          <>
            <p>Куда?</p>
            <input type="text" placeholder='Место' value={info.place} onChange={(e) => setInfo({ time: info.time, place: e.target.value })} />
            <p>Во сколько?</p>
            <input type="text" placeholder='Время' value={info.time} onChange={(e) => setInfo({ place: info.place, time: e.target.value })} />
          </>
        )
        break
      case 'other':
        setInfo({ info: "" })
        jsx.current = (<>
          <p>Доп. информация</p>
          <input type="text" placeholder='Доп. поле' value={info.info} onChange={(e) => setInfo({ info: e.target.value })} />
        </>
        )
        break
      default:
        jsx.current = null
    }
  }, [value])

  return jsx.current
}