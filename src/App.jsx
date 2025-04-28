import './App.css'
import React from 'react';
import { useState } from 'react'
import DarkBg from '/images/bg-desktop-dark.jpg'
import LightBg from '/images/bg-desktop-light.jpg'
function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isDark, setIsDark] = useState(true);
  const [deleteAll, setDeleteAll] = useState(false);

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
  const handleDelete = () => {
    setTasks((prevTasks) => prevTasks.filter((item) => item.isDone === false));
  }
  const activeAll = () => {
    setTasks((prevTasks) => prevTasks.map((item) => ({ ...item, isDone: true })));
  }
  return (
   <main className={`min-h-[100vh] min-w-screen
    shadow-xl
    ${isDark ? 'bg-[#171823]' : 'bg-[#FAFAFA]'}
    bg-no-repeat bg-[length:100%_45%]
    flex flex-col items-center justify-center box-border font-sans
  `}
   style={{ backgroundImage: `url(${isDark ? DarkBg : LightBg})` }}>
    <div className="w-[327px] sm:w-[540px] h-[439px]">

      <div id='wrap-head' className='w-full flex flex-row justify-between items-center relative '>
      <h1 className='text-[#FFF] text-[40px] mb-[72px] block'>TODO</h1>
      <img className='cursor-pointer mb-2 block' onClick={() => setIsDark(!isDark)} src={isDark ?'/images/combined-shape.svg':'/images/icon-moon.svg'}/>
      </div>
     
      <input value={inputValue} type="text" 
      placeholder="Create a new todo…" 
      className={`w-[100%] h-[50px]  ${ isDark ?'bg-[#25273C]': 'bg-white'} ${isDark ? 'text-[#FFF]': 'text-[#9495A5]'} rounded-[5px] block px-4 text-center`}
      id='input'
      onKeyDown={(event) => {
        if (event.key === "Enter" && inputValue.trim().length > 0) {
          handleAdd();
        }
      }
   
    }
      onChange={(event) =>
         setInputValue(event.target.value)}
         />
   
    <div className='flex flex-col gap-0.5'>
      <ul className='flex flex-col gap-0.5'>
        {tasks.map((item) => (
          <li key={item.id}  className={`flex flex-row  w-full h-[50px] ${isDark ?' bg-[#25273C]':'bg-white'} rounded-[5px] px-4 
             text-[18px] cursor-pointer  items-center gap-[24px]
             ${isDark ? "text-[#C8CBE7]": "text-[#272a3b]"}
            ${item.isDone ? "line-through text-[#4D5067]" : "text-[#C8CBE7]"}`}> 
         
            <input type='checkbox' id='inputd' className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:bg-purple-500 cursor-pointer text-center]"  checked={item.isDone} onChange={(event) => handleCheck(event, item.id)} />
            {item.text}
          </li>
        ))}
      </ul>
     <div className={`flex flex-row items-center justify-around w-[100%] h-[50px] ${isDark ? 'bg-[#25273D]':'white'} rounded-[5px] px-4 mb-4`}> 
     <span className='text-[#5B5E7E]'>{tasks.filter((item) => item.isDone === false).length} items left</span>

     <div className='flex flex-row items-center gap-4 justify-self-center '> 
     <button className="cursor-pointer text-[#3A7CFD]" onClick={() => setTasks([])}>All</button>
     <button className="cursor-pointer text-[#5B5E7E]" onClick={() => activeAll()}>Active</button>
     <button className="cursor-pointer text-[#5B5E7E]" onClick={inputValue.trim().length > 0 ? handleAdd : null}>Add</button>
     </div>

     <button className="cursor-pointer text-[#5B5E7E]" onClick={() => handleDelete()}>Clear Completed</button>

     </div>
      </div>
      </div>
      </main>
  )
}

export default App
