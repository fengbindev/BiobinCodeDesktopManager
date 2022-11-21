<template>
  <div>
     <el-menu-item :index="database" v-for="database in databaseList" :key="database"> {{database}}</el-menu-item>
  </div>
</template>

<script type="text/javascript">
import storage from '@/storage.js';

export default {
  data() {
    return {
      databaseList: []
    };
  },
  props: ['client', 'config', 'globalSettings'],
  computed: {
  },
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
    this.databaseList = this.client.databases || []
  },
  methods: {
    initShow() {
      this.refreshDatabaseList();
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
        if (this.databaseList[i].equals(key)) {
          this.databaseList.splice(i, 1);
          break;
        }
      }
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

</style>
