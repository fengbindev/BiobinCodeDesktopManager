<template>
    <el-container class="main">
        <el-aside class="mainAside" width="200px">
            <div v-loading="loadingTableList">
            <!-- 表列表 -->
            <el-table :data="tables" highlight-current-row style="width: 100%">
                <el-table-column :show-overflow-tooltip='true' prop="TABLE_NAME" label="表名" width="180">
                    <template slot="header">   
                        <span>表名</span>
                    </template>
                </el-table-column>
            </el-table>
            </div>
        </el-aside>
    </el-container>

</template>

<script type="text/javascript">
import db from '@/db.js';
export default {
    props: ['client', 'database'],
    data() {
        return {
            loadingTableList: false,
            tables:[]
        }
    },
    created() {
       this.loadingTableList = true;
       let { host, port, username, auth } = this.client
       let connection = db.createConnection(host, port, username, auth, this.database)
        connection.connect();
        let sql = `
        SELECT
            table_name as TABLE_NAME,
            create_time,
            ENGINE,
            table_collation,
            table_comment as TABLE_COMMENT
        FROM
            information_schema.TABLES 
        WHERE
            table_schema = ( SELECT DATABASE ( ) ) 
        ORDER BY
            create_time DESC
        `;
        connection.query(sql,  (error, results, fields)=> {
            if (error) throw error;
            results.map(item => {
                if(item.TABLE_COMMENT) {
                    item.TABLE_NAME = item.TABLE_NAME + '(' + item.TABLE_COMMENT + ')';
                }
            });
            this.tables = results
        });
        connection.end();
        this.loadingTableList = false;
    }
}
</script>
<style scoped>
.oneLine {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>