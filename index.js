const objectId = require('mongodb').ObjectId;
const client = require('./mongo_server');


client.connectToServer((err, res) => {
    if (err)
        return console.log(err);
    console.log("connected to database ");

    /*
       insert the single documents
     */
    let insert = {name: "peter", gender: "male"};
    client.getCollection().insertOne(insert,(err,res)=> {
        if(err)
          return console.log(err);
        console.log("done");
    });

    /*
       fetch all documents wih no condition
     */
    client.getCollection().find({}).toArray(function (err1, res) {
        if (err1)
            return console.log(err1);
        console.log(res);
    });

    /*
      fetch single record on input query (find with perticular ID)
     */
    let query = {_id: objectId("5f931d782a576d042573f929")};
    client.getCollection().findOne(query,function(err1,res){
       if(err1)
          return console.log(err1);
        console.log(res);
    });

    /*
       update multiple records after filtering on basis of condition
     */
    let condition = {name:"Jonny"};
    let values = {$set:{name:"peter", gender:"male"}};
    client.getCollection().updateMany(condition, values,function(err2,res2) {
        if(err2)
            return console.log(err2);
        console.log(res2.matchedCount); // display matched record (updated)
    });

    /*
      {age:{$mod:[2,0]}}; -> to get the all even ages and sort them on basis of age
     */
    let filter = {age:{$mod:[2,0]}};
    let sort = {age:1};
    client.getCollection().find(filter).sort(sort).toArray(function (err1, res) {
        if (err1)
            return console.log(err1);
        console.log(res);
    });

    /*
      {age:{$exists:false}}; -> get all documents where age field is not present and sort them
     */
    filter = {age:{$exists:true}};
    sort = {age:1};
    client.getCollection().find(filter).sort(sort).toArray(function (err1, res) {
            if (err1)
                return console.log(err1);
            console.log(res);
        });

    /*
        Aggregate function with Group , find min Age
     */
    client.getCollection().aggregate([{
        $group:
            {
                _id: "$gender", minAge: {$min: "$age"}
            }
    }]).toArray((err1, res) => {
        if (err1)
            console.log("errro is ", err1);
        else
            console.log(res);
    });

    /*
        get all result and display all the fields except name
     */
    client.getCollection().find({}).project({name:0}).toArray(function(err1,res){
        if(err1)
            return console.log(err1);
        console.log(res);
    });


    /*
      find all documents where age is present , sort then on basis of age and display all fields except gender
     */
    client.getCollection().find({age:{$exists:true}}).sort({age:1}).project({gender:0})
            .toArray()
            .then(result => {
                console.log(" result ",result);
            })
            .catch( error => {
                console.log("error ",error);
            })
});
