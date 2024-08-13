import React, { useState } from 'react'
import { useToDo } from '../context/todoContext'

const InputBox = () => {
    const [todoInput,setToDoInput]=useState('')
    const {addTodo}=useToDo()

    const add=(e)=>{
        // e.preventDefault()
        if(!todoInput) return

        addTodo({todoInput,completed:false})
        setToDoInput("")
    }
  return (
    <>
    <input className="w-full p-3 rounded-tl-lg rounded-bl-lg text-balance bg-white/25  text-white text-xl border-none outline-none"type="text" placeholder="Write Todo..." value={todoInput} onChange={(e)=>setToDoInput(e.target.value)} onKeyDown={(e) => {
          if (e.key === "Enter") {
            add();
          }
        }}/>
    <button className="px-4 py-[14px] bg-purple-700 text-white text-[16px] cursor-pointer rounded-tr-lg rounded-br-lg -ml-2 font-semibold" onClick={add}>Add</button>
    </>
  )
}

export default InputBox
