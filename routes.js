const express = require('express')
const router=express.Router()
const sqlite3=require('sqlite3').verbose()
const db=new sqlite3.Database('./todos.db')
db.run('CREATE TABLE IF NOT EXISTS todos(id INTEGER PRIMARY KEY AUTOINCREMENT,task TEXT)')

//add a todo task into db
router.post('/todos',(req,res)=>{
    const task=req.body.task
    
    db.run('INSERT INTO todos (task) VALUES (?)',[task],function (err){
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        res.json({id:this.lastID,task})
    })
})
//get all existing todos in a db
router.get('/todos',(req,res)=>{
    db.all('SELECT * FROM todos',(err,rows)=>{
        if (err){
            res.status(500).json({error:err.message})
        }
        res.json(rows)
    })
})
//get specific todo
router.get('/todos/:id',(req,res)=>{
    const id=req.params.id
    db.get('SELECT * FROM todos WHERE id=?',[id],(err,row)=>{
        if (err){
            res.status(500).json({error:err.message})
            return
        }
        if(!row){
            res.status(404).json({message:'Todo not found'})
            return
        }
        res.json(row)
    })
})
//delete a todo task from db
router.delete('/todos/:id',(req,res)=>{
    const id=req.params.id
    db.run('DELETE FROM todos WHERE id=?',[id],function(err){
        if (err){
            res.status(500).json({error:err.message})
            return
        }
        if(this.changes===0){
            res.status(404).json({message:'Todo not found'})
            return
        }
        res.json({message:"Todo deleted",changes:this.changes})
    })
})
//update a todo
router.put('/todos/:id',(req,res)=>{
    const id=req.params.id
    const task=req.body.task
    if(!task){
        res.status(400).json({message:'Task is required'})
        return
    }
    db.run('UPDATE todos SET task=? WHERE   id=?',[task,id])
    res.json({id,task})
})

module.exports=router