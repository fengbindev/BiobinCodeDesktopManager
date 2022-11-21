<template>
  <el-menu
    ref="connectionMenu"
    :collapse-transition='false'
    :id="connectionAnchor"
    @open="openConnection()"
    @select="handleSelect"
    class="connection-menu"
    active-text-color="#ffd04b">
    <el-submenu :index="config.connectionName">
      <!-- connection menu -->
      <ConnectionMenu
        slot="title"
        :config="config"
        :client='client'
        @changeColor='setColor'
        @refreshConnection='openConnection(false, true)'>
      </ConnectionMenu>

      <!-- db search operate -->
      <OperateItem
        ref='operateItem'
        :config="config"
        :client='client'>
      </OperateItem>

      <!-- key list -->
      <DatabaseList
        ref='databaseList'
        :config="config"
        :globalSettings='globalSettings'
        :client='client'>
      </DatabaseList>
    </el-submenu>
  </el-menu>
</template>

<script type="text/javascript">
import dbClient from '@/db.js';
import DatabaseList from '@/components/DatabaseList';
import OperateItem from '@/components/OperateItem';
import ConnectionMenu from '@/components/ConnectionMenu';

export default {
  data() {
    return {
      client: null,
      pingTimer: null,
      pingInterval: 10000, // ms
      lastSelectedDb: 0,
    };
  },
  props: ['config', 'globalSettings', 'index'],
  components: {ConnectionMenu, OperateItem, DatabaseList},
  created() {
    this.$bus.$on('closeConnection', (connectionName = false) => {
      this.closeConnection(connectionName);
    });
  },
  computed: {
    connectionAnchor() {
      return `connection-anchor-${this.config.connectionName}`;
    },
  },
  methods: {
    initShow() {
      this.$nextTick(() => {
        this.$refs.databaseList.initShow();
      })
      
    },
    openConnection(callback = false, forceOpen = false) {
      // scroll to connection
      this.scrollToConnection();
      // opened, do nothing
      if (this.client) {
        return forceOpen ? this.afterOpenConnection(this.client, callback) : false;
      }
      // set searching status first
      this.$refs.operateItem.searchIcon = 'el-icon-loading';
      this.getDbClient(this.config)
      this.client = Object.assign({}, this.config)
      this.afterOpenConnection(this.client, callback);
      this.initShow()
      this.$refs.operateItem.searchIcon = 'el-icon-search';
    },
    afterOpenConnection(client, callback = false) {
        this.$bus.$emit('openStatus', client, this.config.connectionName);
        this.initShow();
        callback && callback();
    },
    closeConnection(connectionName) {
      // if connectionName is not passed, close all connections
      if (connectionName && (connectionName != this.config.connectionName)) {
        return;
      }
      this.$refs.connectionMenu &&
      this.$refs.connectionMenu.close(this.config.connectionName);
      this.$bus.$emit('removeAllTab', connectionName);

      // // clear ping interval
      // clearInterval(this.pingTimer);

      // // reset operateItem items
      // this.$refs.operateItem && this.$refs.operateItem.resetStatus();
      // // reset keyList items
      // this.$refs.keyList && this.$refs.keyList.resetKeyList(true);

      // this.client && this.client.quit && this.client.quit();
      // this.client = null;

    },
    getDbClient(configCopy) {
      let _this = this
      var connect = dbClient.createConnection(configCopy.host, configCopy.port, configCopy.username, configCopy.auth)
      connect.connect(function(err) {
        if (err) {
          _this.$message.error({
            message: 'DB Connecting On Error: ' + err,
            duration: 3000,
            customClass: 'redis-on-error-message'
          });
          this.$bus.$emit('closeConnection');
          return;
        }
      });
      connect.end();
    },
    setColor(color, save = true) {
      const ulDom = this.$refs.connectionMenu.$el;
      const className = 'menu-with-custom-color';

      // save to setting
      save && this.$storage.editConnectionItem(this.config, {color: color});

      if (!color) {
        ulDom.classList.remove(className);
      }
      else {
        ulDom.classList.add(className);
        this.$el.style.setProperty("--menu-color", color);
      }
    },
    scrollToConnection() {
      this.$nextTick(() => {
        // 300ms after menu expand animination
        setTimeout(() => {
          let scrollTop = 0;
          const menus = document.querySelectorAll('.connections-list>ul');

          // calc height sum of all above menus
          for (const menu of menus) {
            if (menu.id === this.connectionAnchor) {
              break;
            }
            scrollTop += (menu.clientHeight + 8);
          }

          document.querySelector('.connections-list').scrollTo({
            top: scrollTop, 
            behavior: 'smooth',
          });
        }, 320);
      });
    },
    handleSelect(database) {
        this.$bus.$emit('clicDatabase', this.client, database);
    }
  },
  mounted() {
    this.setColor(this.config.color, false);
  },
  beforeDestroy() {
    this.closeConnection(this.config.connectionName);
  },
}
</script>

<style type="text/css">
  /*menu ul*/
  .connection-menu {
    margin-bottom: 8px;
    padding-right: 6px;
    border-right: 0;
  }

  .connection-menu.menu-with-custom-color li.el-submenu {
    border-left: 5px solid var(--menu-color);
    border-radius: 4px 0 0 4px;
    padding-left: 3px;
  }

  /*this error shows first*/
  .redis-on-error-message {
    z-index:9999 !important;
  }
</style>
