const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      console.log(`Attempting to connect to db: ${db.s.url}`);
      if (db) {
        console.log(`Selecting db: ${process.env.DB_NAME}`)
        _db = db.db(process.env.DB_NAME);
      }
      return callback(err);
    });
  },
 
  getDb: function () {
    return _db;
  },
};