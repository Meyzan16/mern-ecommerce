import moongose from 'mongoose';
import colors from 'colors';

//test
const  connectToDB = async () => {
     try{
        const conn = await moongose.connect(process.env.MONGODB_URL);
        console.log(`Connect to mongodb database ${conn.connection.host}`.bgMagenta.white)
     }catch(error){
        console.log(`Error in  mongodb ${error}`. bgRed.white)
     }  
}

export default connectToDB;