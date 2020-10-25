const connection = require('./connections');
const MongoClient = require('mongodb').MongoClient;
let _db, _collection;

/** used async , app will proceed only when this call success.
 */

module.exports = {
    connectToServer: async function (callback) {
        await MongoClient.connect(connection.url, {useUnifiedTopology: true},
            function (err, client) {
                if (err)
                    return callback(err, null);
                _db = client.db(connection.db);
                _collection = _db.collection(connection.collection);
                return callback(null, client);
            });
    },

    getDb: function () {
        return _db;
    },

    getCollection: function () {
        return _collection;
    }
};
