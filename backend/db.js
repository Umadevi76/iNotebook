const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/inotebook"

const connectToMongo = async () =>{
    try{
    await mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully");
    }
    catch(err){
                 console.log(err);
        
               }

}
module.exports = connectToMongo;

// function connectToMongo(){
//     mongoose.connect("mongodb://127.0.0.1:27017/inotebook").then(
//         (data)=>{
//             console.log(`connected successfully `)
//         }
//     ).catch(
//         (err)=>{
//             console.log(err)

//         }
//     )
// }
// module.exports= connectToMongo;