const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
app.use(bodyParser())

const router = new Router()

let next_id = 2 

const tasklist = [
    {task: 'oi',
    completed: false,
    position: 1 },
    {task: 'ola',
    completed: true,
    position: 2},
    {task: 'olazin',
    completed: true,
    position: 3}
]

const tasklist_completed = [
]

const tasklist_notcompleted = [
]

router.get('/', (ctx, next) => {
    ctx.body = 'Hello World'
})

router.get('/tasklist', (ctx, next) => {
    ctx.body = Object.values(tasklist)
    .filter(x => x)
})

router.get('/completed', (ctx, next) => {
    var j = 0
    for (var i=j; i<tasklist.length; i++){
        if(tasklist[i].completed===true){
            tasklist_completed[i] = tasklist[i].task
        }
        else{
        ctx.status = 404
        ctx.body = "Not Found"
         }
    }
    ctx.body = Object.values(tasklist_completed)
    .filter(x => x)
})

router.get('/notcompleted', (ctx, next) => {
    var j = 0
    for (var i=j; i<tasklist.length; i++){
        if(tasklist[i].completed===false){
            tasklist_notcompleted[i] = tasklist[i].task
        }
        else{
        ctx.status = 404
        ctx.body = "Not Found"
         }
    }
    ctx.body = Object.values(tasklist_notcompleted)
    .filter(x => x)
})

router.get('/tasklist/:id', (ctx, next) => {
    const id = ctx.params.id-1
    if(tasklist[id]){
        ctx.body = tasklist[ctx.params.id-1]
    }
    else{
        ctx.status = 404
        ctx.body = "Not Found"
    }
})

router.post('/tasklist', (ctx, next) => {
    const new_task = ctx.request.body
    const id = tasklist.length
    tasklist[id] = new_task
    ctx.body =  tasklist[id]            
    ctx.status = 201
})

router.put('/tasklist/:id', (ctx, next) => {
    const id = ctx.params.id-1
    if (tasklist[id]) {
        const edit_task = ctx.request.body
        const A_task = tasklist[id]
        Object.assign(A_task, edit_task)
        ctx.body = A_task
    } 
    else {
        ctx.body = 'Not found'
        ctx.status = 404
    }
})

/*
router.put('/priority/:id', (ctx, next) => {
    const id = ctx.params.id-1
    if (tasklist[id]) {
        const pos = ctx.request.body
        const A_task2 = tasklist[pos]
        const A_task = tasklist[id]
        Object.assign(A_task, A_task2)
        Object.assign(A_task2, A_task)
        ctx.body = A_task
    } 
    else {
        ctx.body = 'Not found'
        ctx.status = 404
    }
})
*/

router.delete('/tasklist/:id', (ctx, next) => {
    const id = ctx.params.id-1
    if(tasklist[id]){
        tasklist[id] = undefined
        ctx.body = ''
        ctx.status = 204
    }
    else{
        ctx.body = 'Not found'
        ctx.status = 404        
    }
}) 

router.delete('/delete', (ctx, next) => {
    var j = 0
    for (var i=j; i<tasklist.length; i++){
        tasklist[i] = ''
    }
        ctx.body = ''
        ctx.status = 204
})  

router.get('/outro', (ctx, next) => {
    ctx.body = 'Estou em outro'
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)