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

    console.log('-------latest record---------', db.collection(('Tasks')).find().sort({"_id": -1}).limit(1).toArray((error, task) => {
        if (error) {
            return console.log('-------- Mongo db database connection issue---------', error)
        }
        console.log('Last Task ---> ', task);
    }));
    /*// update by callback function
        db.collection('Tasks').updateOne({
                _id: new ObjectId('5fea9da2d4bd737546cc81b6')
            }, {
                $set: {
                    description: 'its is not finished task !!!',
                    completed: false
                }
            },(error,response)=>{
            if (error) {
                return console.log('-------- Mongo db database connection issue---------', error)
            }
            console.log('Last Task ---> ', response);
            }
        )*/

    // update by Promise function
/*    const updatePormise = db.collection('Tasks').updateOne({
            _id: new ObjectId('5fea9da2d4bd737546cc81b6')
        }, {
            $set: {
                description: 'its is not finished task !!!!!',
                completed: false
            }
        }
    )

    updatePormise.then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })*/

    // promise statement shortcut

  /*  db.collection('Tasks').updateOne({
            _id: new ObjectId('5fea9da2d4bd737546cc81b6')
        }, {
            $set: {
                description: '!!! its is not finished task !!! ',
                completed: false
            }
        }
    ).then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
*/

    // MONGO DB update many operation

    db.collection('Tasks').updateMany({
        completed:false
    },{
        $set:{
            completed:true
        }
    }).then((result)=>{
        console.log('------------ data modified---------')
        console.log('-------latest record---------', db.collection(('Tasks')).find().sort({"_id": -1}).limit(10).toArray((error, task) => {
            if (error) {
                return console.log('-------- Mongo db database connection issue---------', error)
            }
            console.log('Last Task ---> ', task);
        }));
    }).catch((error)=>{
        console.log('------------ Error on update many---------')
    })



})

