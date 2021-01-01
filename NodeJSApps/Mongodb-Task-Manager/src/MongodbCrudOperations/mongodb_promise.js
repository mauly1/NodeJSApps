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

    /*
        // findone operation for reading one single record

        db.collection('users').findOne({name:'sunil',_id: new ObjectId("5fe985881d53e55bf92f5c89")},(error,user)=>{
            if (error) {
                return console.log('-------- Mongo db database connection issue---------', error)
            }
            //5fe985881d53e55bf92f5c89,
            console.log(user);
        })
    */

//

  /*  db.collection('users').find({name: 'sunil'}).toArray((error, user) => {
        if (error) {
            return console.log('-------- Mongo db database connection issue---------', error)
        }
        console.log(user);
    })

    db.collection('users').find({name: 'sunil'}).count((error, count) => {
        if (error) {
            return console.log('-------- Mongo db database connection issue---------', error)
        }
        console.log('record count', count);
    })*/


/*    db.collection('Tasks').find({completed: false}).toArray((error, task) => {
        console.log('-------------------------')
        console.log(task)
    })

    db.collection('Tasks').find({completed: false}).count((error, count) => {
        if (error) {
            return console.log('-------- Mongo db database connection issue---------', error)
        }
        console.log('record count', count);
    })*/

    console.log('-------latest record---------',db.collection(('Tasks')).find().sort({ "_id": -1 }).limit(1).toArray((error,task)=>{
        if (error) {
            return console.log('-------- Mongo db database connection issue---------', error)
        }
        console.log('Last Task ---> ', task);
    }));


})

