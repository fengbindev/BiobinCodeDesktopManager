<template>
    <el-container class="main">
        <el-aside class="tableTainAside" width="200px">
            <el-input
                size="mini"
                :placeholder="$t('message.input_search_content')"
                @input="searchHandler">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <div v-loading="loadingTableList">
                <!-- 表列表 -->
                <el-table :data="tables" highlight-current-row @row-click="handleRowClickT">
                    <el-table-column :show-overflow-tooltip='true' prop="TABLE_NAME_COMMENT" label="表名">
                    </el-table-column>
                </el-table>
            </div>
        </el-aside>
        <el-main style="padding: 0px 10px">
            <GenConfig :tableName="tableName" :client="client" :database="database" />
        </el-main> 
    </el-container>

</template>

<script type="text/javascript">
import db from '@/db.js';
import GenConfig from '@/components/GenConfig.vue';
export default {
    props: ['client', 'database'],
    components: {GenConfig},
    data() {
        return {
            loadingTableList: false,
            menuIsCollapse: true,
            tableName: "",
            tableNameSearch: '',
            tables:[],
            tableTmpList: [],
        }
    },
    async created() {
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
                    item.TABLE_NAME_COMMENT = item.TABLE_NAME + '(' + item.TABLE_COMMENT + ')';
                } else {
                    item.TABLE_NAME_COMMENT = item.TABLE_NAME;
                }
            });
            this.tables = this.tableTmpList = results
        });
        connection.end();
        this.loadingTableList = false;
    },
    methods: {
        handleRowClickT(row) {
            if(row.TABLE_NAME){
                this.tableName = row.TABLE_NAME   
            }
        },
        searchHandler(searchVal) {
            console.log('searchVal', searchVal)
            this.tables = this.tableTmpList.filter(item=>item.TABLE_NAME_COMMENT.indexOf(searchVal)>=0)
        }
    }
}
</script>
<style scoped>
.oneLine {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.search-input {
    line-height: 0px;
    width: 140px;
    margin-bottom: -7px;
    margin-left: -10px;
}
.search-input .el-icon-search {
    padding-left: 8px;
}
</style>