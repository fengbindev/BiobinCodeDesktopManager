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
    },
    // 查询表字段数据
    queryTableColumnList(client, database, tableName) {
        return new Promise((resolve, reject) => {
            var connection = this.createConnection(client.host, client.port, client.username, client.auth, database)
            connection.connect()
            var sql = `select column_name as columnName, 
            is_nullable as isNullable, 
            data_type as dataType, 
            column_comment as columnComment, 
            column_key as columnKey,
            extra as extra
            from information_schema.columns
            where table_name = '${tableName}' and table_schema = (select database()) order by ordinal_position`;
            connection.query(sql, function (error, results, fields) {
                if (error) reject(error);
                    resolve(results)
                }
            )
            connection.end();
        })
    }
}