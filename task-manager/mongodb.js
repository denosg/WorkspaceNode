// CRUD OPERATIONS

// const mongodb = require("mongodb")
// const MongoClient = mongodb.MongoClient

const dbName = 'task-manager'
const url = 'mongodb://127.0.0.1:27017'
const  {MongoClient, ObjectId} = require("mongodb")

const client = new MongoClient(url)
const id = new ObjectId()
console.log(id)
console.log(id.getTimestamp())

async function main() {
    await client.connect()
    console.log('Connected successfully to server')
    const db = client.db(dbName)

    await db.collection('users').insertOne({
        _id: id,
        name: "Vickstar",
        age: 28,
    }).then((res) => {
        return console.log(res)
    }).catch(console.error);

    // await db.collection('users').insertOne({
    //     name: "Denis",
    //     age: 21,
    // }).then((res) => {
    //     return console.log(res)
    // }).catch(console.error);

    // await db.collection('users').insertMany([
    //     {
    //         name: "Suge-o",
    //         age: 40,
    //     }, {
    //         name: "Casian",
    //         age: 17,
    //     }
    // ]).then((res) => {
    //     console.log(`Users added. Res: ${res}`)
    // }).catch((err) => {
    //     console.log(`Err: ${err}`)
    // }).finally(() => {
    //     console.log("Added users succesfully.")
    // })

    // await db.collection('tasks').insertMany([
    //     {
    //         description: "Suge-o te rog",
    //         completed: true,
    //     },
    //     {
    //         description: "N-ai subto...",
    //         completed: false,
    //     }
    // ]).then((res) => {
    //     console.log("Ai subto cu success. Res: " + toString(res))
    // })
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());