var mysql  = require('mysql');
// import * as mysql from 'mysql';

export default {
    createConnection(host,port=3306, user, password) {
        var connection = mysql.createConnection({
            host: host,
            port: port,
            user: user,
            password: password
        });
       return connection;
    },
    createConnection(host,port=3306, user, password, database) {
        var connection = mysql.createConnection({
            host: host,
            port: port,
            user: user,
            password: password,
            database: database 
        });
       return connection;
    }
}