import mongoose from 'mongoose';


let isConnnected=false;


export const connectToDb=async()=>{
    mongoose.set('strictQuery',true)

    if(isConnnected)
    {
        console.log("MOngoDb is already COnnected");
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"share_prompt",
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })

        isConnnected=true;
         console.log("MongoDB connected")

    }catch(error)
    {
        console.log(error);
    }
}