import redis from 'redis'

export const connectToRedis=async()=>{
try {
    await redis.createClient({
        socket:{
            host: 'localhost',
            port:6379,
        },
        password:''
    }).on('error', err => {
        console.log('Error ' + err);
    })
    console.log("connected to redis")
    return true
} catch (error) {
    console.log(error);
    throw "COULD NOT CONNECT TO  redis DB"; 
}
}