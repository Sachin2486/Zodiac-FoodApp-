const mongoose = require('mongoose') // yha we have used mongoose as mongodb is schemaless mongoose will help me to get data in schema format to display
// const mongoDbClient = require("mongodb").MongoClient
const mongoURI = 'mongodb://<!#@!#@>:"!@!@"@merncluster-shard-00-00.d1d4z.mongodb.net:27017,merncluster-shard-00-01.d1d4z.mongodb.net:27017,merncluster-shard-00-02.d1d4z.mongodb.net:27017/Customer?ssl=true&replicaSet=atlas-eusy5p-shard-0&authSource=admin&retryWrites=true&w=majority' // Customer change url to your db you created in atlas
// mongodb://<username>:<password>@merncluster-shard-00-00.d1d4z.mongodb.net:27017,merncluster-shard-00-01.d1d4z.mongodb.net:27017,merncluster-shard-00-02.d1d4z.mongodb.net:27017/?ssl=true&replicaSet=atlas-eusy5p-shard-0&authSource=admin&retryWrites=true&w=majority
module.exports = function (callback) {
    mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        // mongoDbClient.connect(mongoURI, { useNewUrlParser: true }, async(err, result) => {
        if (err) console.log("---" + err) // incase we found out server is throwing error or crashing we can print the following command
        else {
            // var database =
            console.log("connected to mongo") //while checking the function is written to check backend server 
            const foodCollection = await mongoose.connection.db.collection("food_items"); //food items is the data which i am fetching from server
            foodCollection.find({}).toArray(async function (err, data) { // empty object is defined which is used to find the data and then converted to array passed with two parameters
                const categoryCollection = await mongoose.connection.db.collection("Categories");
                categoryCollection.find({}).toArray(async function (err, Catdata) { // category data => catdata
                    callback(err, data, Catdata);  

                })
            });
            // listCollections({name: 'food_items'}).toArray(function (err, database) {
            // });
            //     module.exports.Collection = database;
            // });
        }
    })
};
