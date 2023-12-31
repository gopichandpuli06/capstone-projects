import express from "express";
import bodyParser from "body-parser";  //middleware install

const app = express();
const port = 5000
app.use(bodyParser.urlencoded({extended: true}));
var todoList = [];
//to do list
function addTodolist(req, res, next){
    var lenth = todoList.length;
    console.log(lenth)
    if(req.body["text"]){
        todoList.push({text: req.body["text"], completed: false});
        //todoList.push(req.body["text"]);
        req.body["text"] = "";
    }

    console.log(todoList);
    next();
}

app.use(addTodolist)

var worktodoList = []
//work list
function workList(req, res, next){
    if(req.body["worktext"]){
        worktodoList.push({text: req.body["worktext"], completed: false});
        req.body["worktext"] = "";
    }
    
    console.log(worktodoList)
    next();
}

app.use(workList)

app.use(express.static("public"));
app.get("/", (req,res) =>{
    res.render("index.ejs", {
        message: todoList
    });
})
app.post("/", (req,res) => {
    res.redirect("/");
    /*res.render("index.ejs",{
        message: todoList
    });*/
})
app.get("/work", (req,res) =>{
    res.render("work.ejs", {
        message: worktodoList
    });
})

app.post("/work", (req, res) =>{
    res.redirect("/work");
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});