import './App.css'
import { useState } from 'react'
function App() {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')
  const handleAdd = () => {
    setTasks(prevTasks => [...prevTasks, {text: inputValue, isDone: false, id: Date.now()}])
    setInputValue("")
  }
  const handleCheck = (event, id) => {
    setTasks((prevTasks) =>
      prevTasks.map((item) => {
        if (item.id === id) {
          return { ...item, isDone: event.target.checked };
        }
        return item;
      })
    )
  }
  const handleClick = (id) => {
    setTasks((prevTasks) => prevTasks.filter((item) => item.id !== id));
  }
  return (
    <>
      <input value={inputValue} type="text" placeholder="Enter a task" onChange={(event) => setInputValue(event.target.value)}/>
      <button onClick={inputValue.trim().length > 0 ? handleAdd: null} >Add</button>
      <ul>
        {tasks.map((item) => (
          <li key={item.id} className={item.isDone ? "completed" : "incomplete"}> 
          <button onClick={() => handleClick(item.id)}>Delete</button>
            <input type='checkbox' checked={item.isDone} onChange={(event) => handleCheck(event, item.id)} />
            {item.text}
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
