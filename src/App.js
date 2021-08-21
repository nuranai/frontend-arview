import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { Switch, Route, Link } from 'react-router-dom';
import Add from './routes/Add';
import List from './routes/List';
import './App.scss'

function App() {
  const [val, setVal] = useState(null)

  // let history = useHistory()

  return (
    <>
      <div className="wrapper">
        <Calendar onClickDay={(nextVal) => setVal(nextVal)} value={val} />
        {
          val &&
          <List value={val} />
        }
      </div>
      <Link to="/add">Добавить Событие</Link>
      <Switch>
        <Route path="/add">
          <Add value={val} />
        </Route>
      </Switch>
    </>
  )
}

export default App;
