
module.exports = (mongoose) => {
    
    const uri = process.env.MONGO_CONNECTION_URI || `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@localhost:27017`; 
    const options =  { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        dbName: process.env.MONGO_DB_NAME || 'test' 
    };
    mongoose.Promise = global.Promise;

    mongoose.connect( 
        uri, 
        options
    ).then( () => { 
        console.log(`Connected to mongodb, \n uri: ${uri} \n connection options: `, options); 
    }).catch( err => {
        console.log('Error connecting database', err);
    });

}