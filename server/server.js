require("dotenv").config()
const connectDb = require("./src/config/db")
const app = require("./src/app")
async function startServer() {
    try{
        await connectDb()
        app.listen(process.env.PORT,()=>{
            console.log(`server is listening at port ${process.env.PORT}`)
        })
    }catch(err){
        console.log(err.message)
        process.exit(1)
    }
}
startServer()