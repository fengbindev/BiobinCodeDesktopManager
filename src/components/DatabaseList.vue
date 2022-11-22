<template>
  <div>
      <RightClickMenu
        :items='rightMenus'
        :clickValue='key'
        :key='key.toString()'
        v-for='key of databaseList'
        >
        <el-menu-item :index="key" > 
        <!-- <li class='key-item' :title='key'  @click='clickKey(key, $event)'>{{$util.bufToString(key)}}</li> -->
        <div class="menu-left">
            <i class="fa fa-database"></i>
            <span class="title">{{key}}</span>
        </div>
        </el-menu-item>
      </RightClickMenu>
  </div>
</template>

<script type="text/javascript">
import storage from '@/storage.js';
import RightClickMenu from '@/components/RightClickMenu';
export default {
  data() {
    return {
      databaseList: [],
      rightMenus: [
        {
          name: '删除DB',
          click: (clickValue, event) => {
            this.$confirm(
              '确认删除？',
              { type: 'warning' },
            ).then(() => {
               this.removeKeyFromKeyList(clickValue);
            }).catch(() => {});
           
          },
        },
        {
          name: this.$t('message.open'),
          click: (clickValue, event) => {
            this.clickKey(clickValue, event, false);
          },
        }
      ],
    };
  },
  props: ['client', 'config', 'globalSettings'],
  components: {RightClickMenu},
  created() {
    // add or remove key from key list directly
    this.$bus.$on('refreshDatabaseList', (db, key = '', type = 'del') => {
      // refresh only self connection key list
      if (db !== this.client) {
        return;
      }
      // refresh directly
      if (!key) {
        return this.refreshDatabaseList();
      }
      (type == 'del') && this.removeKeyFromKeyList(key);
      (type == 'add') && this.addKeyToKeyList(db, key);
    });
  },
  methods: {
    initShow() {
      this.refreshDatabaseList();
    },
    clickKey(key, event = null, newTab = false) {
      this.$bus.$emit('clicDatabase', this.client, key, newTab);
    },
    refreshDatabaseList(searchVal, searchExact=false) {
      if(!searchVal) {
        this.databaseList = this.client.databases;
        return
      }
      this.databaseList = []
      let listData = this.client.databases || [];
      this.databaseList = searchExact ? listData.filter(item=>item == searchVal) : listData.filter(item=>item.indexOf(searchVal)>=0);
    },
    getMatchMode(fillStar = true) {
      let match = this.$parent.$parent.$parent.$refs.operateItem.searchMatch;

      match = match || '*';

      if (fillStar && !match.match(/\*/)) {
        match = (`*${match}*`);
      }

      return match;
    },
    removeKeyFromKeyList(key) {
      if (!this.databaseList) {
        return false;
      }
      for (let i in this.databaseList) {
        if (this.databaseList[i] == key) {
          this.databaseList.splice(i, 1);
          break;
        }
      }
      this.client.databases = this.databaseList || []
      storage.editConnectionByKey(this.client) 
    },
    addKeyToKeyList(dbConnection, key) {
      if (!this.databaseList) {
        return false;
      }
      for (let i in this.databaseList) {
        if (this.databaseList[i] == key) {
          // exists already
          return;
        }
      }
      this.databaseList.push(key);
      dbConnection.databases = this.databaseList || []
      storage.editConnectionByKey(dbConnection) 
    },
  },
  watch: {
    globalSettings(newSetting, oldSetting) {
      if (!this.client) {
        return;
      }
      // keys number changed, reload scan streams
      if (newSetting.keysPageSize != oldSetting.keysPageSize) {
        this.refreshDatabaseList();
      }
    },
  },
}
</script>

<style type="text/css">
  .keys-load-more-wrapper {
    display: flex;
  }
  .keys-load-more-wrapper .load-more-keys {
    margin: 10px 5px;
    padding: 0;
    display: block;
    height: 22px;
    width: 100%;
    font-size: 75%;
  }

  .menu-left .title {
    margin-left: 4px;
  }

</style>
