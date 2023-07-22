// const { MongoClient } = require('mongodb');

// let dbRows = [];
// const mysql = require('mysql')
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '12345',
//   database: 'school'
// })

// connection.connect()

// connection.query('SELECT * FROM student', (err, rows, fields) => {
//   if (err) throw err

//   // console.log('The solution is: ', rows)
//   displayRows(rows);
//   dbRows = rows;
// })

// const displayRows = (rowObj) => {
//     for(let row of rowObj){
//       for(let key of Object.keys(row)){
//         console.log(row[key]);
//       }
//     }
// }

// connection.end()

// // Connection URL
// const url = 'mongodb+srv://mauryaakash2000:akash@cluster0.6idnxdc.mongodb.net/BackMe?retryWrites=true&w=majority';
// const client = new MongoClient(url);

// // Database Name
// const dbName = 'projectdemo';

// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db();
//   const collection = db.collection('documents');
//   // await collection.insertMany(dbRows);
//   await collection.insertOne({text : 'value'});

//   // the following code examples can be pasted here...

//   return 'done.';
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());

const getMySQLData = ({host, username, password, database, table}, cb) => {
  let dbRows = [];
  const mysql = require('mysql')
  const connection = mysql.createConnection({
    host,
    user: username,
    password,
    database
  })

  connection.connect()

  connection.query(`SELECT * FROM ${table}`, (err, rows, fields) => {
    if (err) throw err

    // displayRows(rows);
    dbRows = rows;
    cb(rows);

  })
};

const storeMongoData = async ({uri}, data) => {
  console.log('storing mongo data...');
  const { MongoClient } = require('mongodb');
  const client = new MongoClient(uri);

  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db();
  const collection = db.collection('documents');
  // await collection.insertMany(dbRows);
  await collection.insertMany(data);
  console.log('mongodata stored');
}

const getMongoData = async ({ uri, collectionName }, cb) => {
  const { MongoClient } = require("mongodb");
  const client = new MongoClient(uri);
  console.log('connecting');
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db();
  const collection = db.collection(collectionName);

  collection.find({}).toArray((err, data) => {
    if (err) throw err;
    client.close();
    cb(data);
  });
};

const storeMySQLData = (
  { host, username, password, database, table },
  data
) => {
  const mysql = require("mysql");
  const connection = mysql.createConnection({
    host,
    user: username,
    password,
    database,
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected successfully to MySQL");

    const values = data.map((item) => Object.values(item));
    const query = `INSERT INTO ${table} VALUES ?`;

    connection.query(query, [values], (err, result) => {
      if (err) throw err;

      console.log(`Inserted ${result.affectedRows} rows into MySQL table`);

      connection.end();
    });
  });
};

module.exports = { getMongoData, storeMySQLData, getMySQLData, storeMongoData };

// getMongoData({
//   uri: "mongodb+srv://mauryaakash2000:akash@cluster0.6idnxdc.mongodb.net/BackMe?retryWrites=true&w=majority",
//   collectionName: "users",
// }, (data) => {
//   console.log(data);
// }).then(data => {
//   console.log(data);
// })
