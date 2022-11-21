<template>
  <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :append-to-body='true' :close-on-click-modal='false' class='new-connection-dailog' width='90%'>
    <!-- DB connection form -->
    <el-form :model="connection" :label-position="labelPosition" :rules="rules" label-width="90px" ref="connectionForm">
      <el-row :gutter=20>
        <!-- left col -->
        <el-col :span=12>
          <el-form-item prop="name" :label="$t('message.connection_name')">
            <el-input v-model="connection.name" autocomplete="off" placeholder="localhost"></el-input>
          </el-form-item>

          <el-form-item prop="host" :label="$t('message.host')" required>
            <el-input v-model="connection.host" autocomplete="off" placeholder="127.0.0.1"></el-input>
          </el-form-item>

          <el-form-item prop="auth" :label="$t('message.password')">
            <InputPassword v-model="connection.auth" placeholder="123456"></InputPassword>
          </el-form-item>
          
        </el-col>

        <!-- right col -->
        <el-col :span=12>
          <el-form-item prop="port" :label="$t('message.port')">
            <el-input type='number' v-model="connection.port" autocomplete="off" placeholder="3306"></el-input>
          </el-form-item>

          <el-form-item prop="username" :label="$t('message.username')">
            <el-input v-model="connection.username" placeholder='root' autocomplete="off"></el-input>
          </el-form-item>

        </el-col>
      </el-row>

    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">{{ $t('el.messagebox.cancel') }}</el-button>
      <el-button type="primary" @click="editConnection">{{ $t('el.messagebox.confirm') }}</el-button>
    </div>
  </el-dialog>
</template>

<script type="text/javascript">
import storage from '@/storage';
import FileInput from '@/components/FileInput';
import InputPassword from '@/components/InputPassword';

export default {
  data() {
    return {
      dialogVisible: false,
      labelPosition: 'top',
      rules: {
        name: [
            { required: true, message: '请输入连接名称', trigger: 'blur' },
        ],
        host: [
            { required: true, message: '请输入地址', trigger: 'blur' },
        ],
        port: [
            { required: true, message: '请输入端口', trigger: 'blur' },
        ],
        auth: [
            { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
      },
      oldKey: '',
      connection: {
        host: '',
        port: '',
        auth: '',
        username: '',
        name: '',
        sshOptions: {
          host: '',
          port: 22,
          username: '',
          password: '',
          privatekey: '',
          passphrase: '',
          timeout: 30,
        },
        sslOptions: {
          key: '',
          cert: '',
          ca: '',
        },
        sentinelOptions: {
          masterName: 'mymaster',
          nodePassword: '',
        },
      },
      connectionEmpty: {},
      sshOptionsShow: false,
      sslOptionsShow: false,
      sentinelOptionsShow: false,
    }
  },
  components: {FileInput, InputPassword},
  props: {
    config: {
      default: _ => new Array,
    },
    editMode: {
      default: false,
    },
  },
  computed: {
    dialogTitle() {
      return this.editMode ? this.$t('message.edit_connection') :
                              this.$t('message.new_connection')
    },
  },
  methods: {
    show() {
      this.dialogVisible = true;
      this.resetFields();
    },
    resetFields() {
      // edit connection mode
      if (this.editMode) {
        this.sshOptionsShow = !!this.config.sshOptions
        this.sslOptionsShow = !!this.config.sslOptions
        this.sentinelOptionsShow = !!this.config.sentinelOptions
        // recovery connection before edit
        let connection = Object.assign({}, this.connectionEmpty, this.config);
        this.connection = JSON.parse(JSON.stringify(connection));
      }
      // new connection mode
      else {
        this.sshOptionsShow = false;
        this.sslOptionsShow = false;
        this.sentinelOptionsShow = false;
        this.connection = JSON.parse(JSON.stringify(this.connectionEmpty));
      }
    },
    async editConnection() {
      let validate = await this.$refs.connectionForm.validate()
      if (!validate) {
        return
      }
      const config = JSON.parse(JSON.stringify(this.connection));

      if (this.sentinelOptionsShow && config.cluster) {
        return this.$message.error('Sentinel & Cluster cannot be checked together!');
      }

      !config.host && (config.host = '127.0.0.1');
      !config.port && (config.port = 3306);

      if (!this.sshOptionsShow || !config.sshOptions.host) {
        delete config.sshOptions;
      }

      if (!this.sslOptionsShow) {
        delete config.sslOptions;
      }

      if (!this.sentinelOptionsShow || !config.sentinelOptions.masterName) {
        delete config.sentinelOptions;
      }

      const oldKey = storage.getConnectionKey(this.config);
      storage.editConnectionByKey(config, oldKey);

      this.dialogVisible = false;
      this.$emit('editConnectionFinished', config);
    },
  },
  mounted() {
    // back up the empty connection
    this.connectionEmpty = JSON.parse(JSON.stringify(this.connection));

    // edit mode
    if (this.editMode) {
      this.sslOptionsShow = !!this.config.sslOptions;
      this.sshOptionsShow = !!this.config.sshOptions;
      this.sentinelOptionsShow = !!this.config.sentinelOptions;

      this.connection = Object.assign({}, this.connection, this.config);
    }

    delete this.connection.connectionName;
  },
}
</script>

<style type="text/css">
  .new-connection-dailog .el-checkbox {
    margin-left: 0;
    margin-right: 15px;
  }

  .new-connection-dailog .el-dialog {
    max-width: 900px;
  }

  .new-connection-dailog fieldset {
    border-width: 2px 0 0 0;
    border-color: #fff;
    font-weight: bold;
    color: #bdc5ce;
    font-size: 105%;
    margin-bottom: 3px;
  }
  .dark-mode .new-connection-dailog fieldset {
    color: #416586;
    border-color: #7b95ad;
  }
</style>

