// CRUD OPERATIONS

// const mongodb = require("mongodb")
// const MongoClient = mongodb.MongoClient

const dbName = 'task-manager'
const url = 'mongodb://127.0.0.1:27017'
const { MongoClient, ObjectId } = require("mongodb")

const client = new MongoClient(url)
const id = new ObjectId()
console.log(id)
console.log(id.getTimestamp())

async function main() {
    await client.connect()
    console.log('Connected successfully to server')
    const db = client.db(dbName)

    await db.collection('users').updateOne({ _id: new ObjectId("6559ffe662da3532a0a55834") }, {
        // $set: {
        //     name: "Andrei"
        // }
        $inc: {
            age: 1
        }
    }).then((res) => {
        console.log(`Updated succesfully. Res: ${res.modifiedCount}`)
    }).catch((err) => {
        console.log(`Err: ${err}`)
    })

}

main().finally(() => client.close());

// const user = await db.collection('users').findOne({ _id: new ObjectId("655a046a7d34634f13cddcde") })
// if (user) {
//     console.log(user.name)
// }

// const users = await db.collection('users').find({ age: { $gte: 21 } }).toArray();
// if (users) {
//     console.log(users);
// } else {
//     console.log('No users found with age greater than 21');
// }

// await db.collection('users').insertOne({
//     _id: id,
//     name: "Vickstar",
//     age: 28,
// }).then((res) => {
//     return console.log(res)
// }).catch(console.error);

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