// Crud operation
const mongodb_Insert = require('mongodb')
/*const MongoClient = mongodb_Insert.MongoClient
const ObjectId= mongodb_Insert.ObjectID*/
// shortcut for above mentioned lines
const {MongoClient,ObjectId}=require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id =new ObjectId()
console.log(id)
console.log(id.getTimestamp())


MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        console.log('-------- Mongo db database connection issue---------')
        return console.log(error)
    }
    console.log('<<<<<<<<<<<<<<<<<<------- HEY ... we have Mongo db connection ..... congrats---')
    const db = client.db(databaseName);
        db.collection('users').insertOne({
         //   _id:id,
            name:'Vikramk',
            age:'40'
        },(error,result)=>{
            if (error) {
                console.log('-------- Mongo db database connection issue---------')
                return console.log(error)
            }
            console.log('--------result ops----',result.ops)
            console.log('--------result ops----',result.insertedCount)
        })

        const data=[{
            name:'sunilK',
            age:'35'
        },{
            name:'AmitK',
            age:'32'
        },{
            name:'AkifK',
            age:'32'
        },{
            name:'VinayK',
            age:'42'
        }]

        db.collection('users').insertMany(data,(error,result)=>{
            if (error) {
                console.log('-------- Mongo db database connection issue---------')
                return console.log(error)
            }
            console.log('--------result ops----',result.ops)
            console.log('--------result ops----',result.insertedCount)
        })

    const tasks = [{
        description: 'Last Task',
        completed: true
    }/*,
        {
            description: 'Hands on experience on Redux',
            completed: true
        },
        {
            description: 'Hands on experience on Node JS',
            completed: false
        },
        {
            description: 'Hands on experience on AWS',
            completed: false
        },{
            description: 'Hands on experience onJava Script',
            completed: false
        },{
            description: 'Hands on experience on MongoDB',
            completed: false
        }*/
    ]

    db.collection('Tasks').insertMany(tasks, (error, result) => {
        if (error) {
            return console.log('-------- Mongo db database connection issue---------', error)
        }
        console.log('---------Inserted Record count Result-------', result.insertedCount)
        console.log('--------- Result-------', result.ops)
    })

})

