// Crud operation
const mongodb_Insert = require('mongodb')
/*const MongoClient = mongodb_Insert.MongoClient
const ObjectId= mongodb_Insert.ObjectID*/
// shortcut for above mentioned lines
const {MongoClient, ObjectId} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectId()
console.log(id)
console.log(id.getTimestamp())


MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        console.log('-------- Mongo db database connection issue---------')
        return console.log(error)
    }
    console.log('<<<<<<<<<<<<<<<<<<------- HEY ... we have Mongo db connection ..... congrats---')
    const db = client.db(databaseName);

    console.log('-------latest record---------',db.collection(('users')).find().sort({ "_id": -1 }).limit(20).toArray((error,task)=>{
        if (error) {
            return console.log('-------- Mongo db database connection issue---------', error)
        }
        console.log('Last Task ---> ', task);
    }));

    // delete a one single documents/records

/*    db.collection('users').deleteOne({
        age:'42'
    }).then((result)=>{
        console.log('-------latest record---------',db.collection(('users')).find().sort({ "_id": -1 }).limit(20).toArray((error,task)=>{
            if (error) {
                return console.log('-------- Mongo db database connection issue---------', error)
            }
            console.log('Remaining Records ---> ', task);
        }));

    }).catch((error)=>{
        console.log('-------- Error while deleting records.......')
    })*/

    // delete multiple records/documents

    db.collection('users').deleteMany({
        age:'42'
    }).then((result)=>{
        console.log('-------latest record---------',db.collection(('users')).find().sort({ "_id": -1 }).limit(20).toArray((error,task)=>{
            if (error) {
                return console.log('-------- Mongo db database connection issue---------', error)
            }
            console.log('Remaining Records ---> ', task);
        }));

    }).catch((error)=>{
        console.log('-------- Error while deleting records.......')
    })

})

