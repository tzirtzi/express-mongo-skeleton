
module.exports = (mongoose) => {
    
    const uri = process.env.MONGO_CONNECTION_URI || 'mongodb://root:secret@localhost:27017'; 
    const options =  { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        dbName:  process.env.MONGO_DB_NAME || 'test' 
    };
    mongoose.Promise = global.Promise;

    mongoose.connect( 
        uri, 
        options
    ).then( () => { 
        console.log('Connected to mongodb!'); 
    }).catch( err => {
        console.log('Error connecting database', err);
    });

}