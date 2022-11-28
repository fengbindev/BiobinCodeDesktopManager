<template>
<div>
  <!-- auto refresh row -->
  <!-- <el-row>
    <el-col>
      <div style="float: right;">
        <el-tag type="info">
          <i class="el-icon-refresh"></i>
          {{ $t('message.auto_refresh') }}
        </el-tag>

        <el-tooltip class="item" effect="dark" :content="$t('message.auto_refresh_tip', {interval: refreshInterval / 1000})" placement="bottom">
          <el-switch v-model="autoRefresh" @change="refreshInit">
          </el-switch>
        </el-tooltip>
      </div>
    </el-col>
  </el-row> -->

  <!-- server status row -->
  <el-row :gutter="10" class="status-container status-card">
    <!-- server -->
    <el-col :span="8">
      <el-card class="box-card">
        <div slot="header">
          <i class="fa fa-server"></i>
          <span>{{ $t('message.server') }}</span>
        </div>

        <p class="server-status-tag-p">
          <el-tag class='server-status-container' type="info" size="big">
            {{ $t('message.db_version') }}:
            <span class="server-status-text">{{this.connectionStatus.version}}</span>
          </el-tag>
        </p>

        <p class="server-status-tag-p">
          <el-tag class='server-status-container' type="info" size="big">
            OS:
            <span class="server-status-text" :title="connectionStatus.os">{{this.connectionStatus.version_compile_os}} {{this.connectionStatus.version_compile_machine}}</span>
          </el-tag>
        </p>

        <p class="server-status-tag-p">
          <el-tag class='server-status-container' type="info" size="big">
            {{ $t('message.process_id') }}:
            <span class="server-status-text">{{this.connectionStatus.process_id}}</span>
          </el-tag>
        </p>
      </el-card>
    </el-col>

    <!-- memory row -->
    <el-col :span="8">
      <el-card class="box-card">
        <div slot="header">
          <i class="fa fa-microchip"></i>
          <span>{{ $t('message.memory') }}</span>
        </div>

        <p class="server-status-tag-p">
          <el-tag class='server-status-container' type="info" size="big">
            数据读总数量:
            <span class="server-status-text">{{this.connectionStatus.Innodb_data_reads}}</span>
          </el-tag>
        </p>

        <p class="server-status-tag-p">
          <el-tag class='server-status-container' type="info" size="big">
            数据写总数量:
            <span class="server-status-text">{{this.connectionStatus.Innodb_data_writes}}</span>
          </el-tag>
        </p>

        <p class="server-status-tag-p">
          <el-tag class='server-status-container' type="info" size="big">
            系统日志大小:
            <span class="server-status-text">{{Math.round(this.connectionStatus.Innodb_os_log_written / 1024)}}(KB)</span>
          </el-tag>
        </p>
      </el-card>
    </el-col>

    <!-- stats row -->
    <el-col :span="8">
      <el-card class="box-card">
        <div slot="header">
          <i class="fa fa-thermometer-three-quarters"></i>
          <span>{{ $t('message.stats') }}</span>
        </div>

        <p class="server-status-tag-p">
          <el-tag class='server-status-container' type="info" size="big">
            运行时间:
            <span class="server-status-text">{{this.connectionStatus.Uptime}}(s)</span>
          </el-tag>
        </p>

        <p class="server-status-tag-p">
          <el-tag class='server-status-container' type="info" size="big">
            {{ $t('message.connected_clients') }}:
            <span class="server-status-text">{{this.connectionStatus.Threads_connected}}</span>
          </el-tag>
        </p>

        <p class="server-status-tag-p">
          <el-tag class='server-status-container' type="info" size="big">
            运行线程数:
            <span class="server-status-text">{{this.connectionStatus.Threads_running}}</span>
          </el-tag>
        </p>
        
      </el-card>
    </el-col>
  </el-row>

  <!-- connection all info -->
  <el-row class="status-card">
    <el-col>
      <el-card class="box-card">
        <div slot="header">
          <i class="fa fa-info-circle"></i>
          <span>{{ $t('message.all_db_info') }}</span>
          <!-- search input -->
          <!-- <el-input v-model='allInfoFilter' size='mini' suffix-icon="el-icon-search" class='status-filter-input'>
          </el-input> -->
        </div>

        <el-table
          :data="dbAllStatus"
          stripe>
          <el-table-column
            prop="Variable_name"
            sortable
            label="Key">
          </el-table-column>
          <el-table-column
            prop="Value"
            :show-overflow-tooltip='true'
            label="Value">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>

  <ScrollToTop parentNum='1'></ScrollToTop>
</div>
</template>

<script>
import ScrollToTop from '@/components/ScrollToTop';
import db from '@/db.js'

export default {
  data() {
    return {
      autoRefresh: false,
      refreshTimer: null,
      refreshInterval: 2000,
      connectionStatus: {},
      statusConnection: null,
      allInfoFilter: '',
      dbAllStatus: []
    };
  },
  props: ['client', 'hotKeyScope'],
  components: { ScrollToTop },
  computed: {
    DBKeys() {
      const dbs = [];

      for (const i in this.connectionStatus) {
        if (i.startsWith('db')) {
          const item = this.connectionStatus[i];
          const array = item.split(',');

          dbs.push({
            db: i,
            keys: array[0].split('=')[1],
            expires: array[1].split('=')[1],
            avg_ttl: array[2].split('=')[1],
          });
        }
      }

      return dbs;
    },
    AllRedisInfo() {
      const infos = [];
      const filter = this.allInfoFilter.toLowerCase();

      // filter mode
      if (filter) {
        for (const i in this.connectionStatus) {
          if (i.includes(filter)) {
            infos.push({ key: i, value: this.connectionStatus[i] });
          }
        }
      }
      // all info
      else {
        for (const i in this.connectionStatus) {
          infos.push({ key: i, value: this.connectionStatus[i] });
        }
      }

      return infos;
    },
  },
  methods: {
    initShow() {
      let { host, port, username, auth } = this.client
      let connection = db.createConnection(host, port, username, auth, this.database)
      connection.connect((err) => {
          if (err) {
            this.$message.error(error)
            return;
          }
          this.connectionStatus.process_id = connection.threadId
      });
      connection.query(`show variables like 'version%'`,(error, results, fields)=> {
          if (error) {
            this.$message.error(error)
          } else {
            results.map(val=> {
              this.connectionStatus[val.Variable_name] = val.Value
            })
          }
      })

       connection.query('SHOW GLOBAL STATUS',(error, results, fields)=> {
            if (error) {
              this.$message.error(error)
            } else {
              this.dbAllStatus = results
              results.map(val=> {
               this.connectionStatus[val.Variable_name] = val.Value
              })
            }
        });

       
       connection.end();
    },
    refreshInit() {
      this.refreshTimer && clearInterval(this.refreshTimer);

      if (this.autoRefresh) {
        this.initShow();

        this.refreshTimer = setInterval(() => {
          this.initShow();
        }, this.refreshInterval);
      }
    },
    sortByKeys(a, b) {
      return a.keys - b.keys;
    },
    sortByExpires(a, b) {
      return a.expires - b.expires;
    },
    sortByTTL(a, b) {
      return a.avg_ttl - b.avg_ttl;
    },
    initStatus(content) {
      if (!content) {
        return {};
      }

      content = content.split('\n');
      const lines = {};

      for (let i of content) {
        i = i.replace(/\s/ig, '');
        if (i.startsWith('#') || !i) continue;

        const kv = i.split(':');
        lines[kv[0]] = kv[1];
      }

      return lines;
    },
    initShortcut() {
      this.$shortcut.bind('ctrl+r, ⌘+r, f5', this.hotKeyScope, () => {
        this.initShow();
        return false;
      });
    },
  },
  mounted() {
    this.initShow();
    this.refreshInit();
    this.initShortcut();
  },
  beforeDestroy() {
    // clear interval when tab is closed
    clearInterval(this.refreshTimer);
    this.$shortcut.deleteScope(this.hotKeyScope);
  },
};
</script>

<style type="text/css">
  .el-row.status-card {
    margin-top: 20px;
  }
  .server-status-tag-p {
    height: 32px;
  }
  .server-status-container{
    width: 100%;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
  .server-status-text{
    color: #43b50b;
  }
  .status-filter-input {
    float: right;
    width: 100px;
  }

  /*fix table height changes[scrollTop changes] when tab toggled*/
  .status-card .el-table__header-wrapper{
      height: 50px;
  }
  .status-card .el-table__body-wrapper{
      /*height: calc(100% - 50px) !important;*/
  }
</style>
