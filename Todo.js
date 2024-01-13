import React,{useState,useEffect} from 'react'
import axios from 'axios'

const Todo = () => {
    const [todos,setTodos]=useState([])
    const [newTask,setNewTask]=useState('')

    useEffect(()=>{
        axios.get('http://localhost:8081/todos')
        .then(res=>setTodos(res.data))
        .catch(err=>console.log(err))
    })
    const addTodo=()=>{
        axios.post('http://localhost:8081/todos',{task:newTask})
        .then(res=>setTodos([...todos,res.data]))
        .catch(err=>console.log(err))
    }
    const deleteTodo=(id)=>{
        axios.delete(`http://localhost:8081/todos/${id}`)
        .then(res=>setTodos(todos.filter(todo=>todo.id!==id)))
        .catch(err=>console.log(err))
    }
return (
    <div>
        <h1>Todo Application </h1>
        <div>
            <input 
            type='text'
            value={newTask}
            onChange={e=>setNewTask(e.target.value)}
            />
            <button onClick={addTodo}>Add Todo Tasks</button>
        </div>
        <ul>
            {todos.map(todo=>(
                <li key={todo.id}>{todo.task}{' '} 
                <button onClick={()=>deleteTodo(todo.id)}>Delete</button>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Todo