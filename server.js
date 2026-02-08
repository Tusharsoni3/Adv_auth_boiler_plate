import app from './src/app.js'
import { configDotenv } from 'dotenv';


configDotenv({quiet:true});

app.listen(process.env.PORT,() =>{
        console.log("server is running at port 3000")
})