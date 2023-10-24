import express from "express"
import axois from "axois"

const app = express()
const port = 4000

app.get("/", async(req, res) =>{
    try{
        const result = await axois.get("")
        res.render("index.ejs")

    }catch(error){
        console.log(error.response.data);
        res.status(500);
    }
})

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
})