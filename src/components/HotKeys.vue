<template>
<el-dialog :title="$t('message.hotkey')" :visible.sync="visible" custom-class='hotkey-tips-dialog' append-to-body>
  <el-table :data='keys'>
    <el-table-column
      prop="key"
      width="180"
      label="Key">
    </el-table-column>
    <el-table-column
      prop="desc"
      label="Description">
    </el-table-column>
  </el-table>
</el-dialog>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    keys() {
      return [
        {key: 'Ctrl + n / ⌘ + n', desc: this.$t('message.new_connection')},
        {key: 'Ctrl + , / ⌘ + ,', desc: this.$t('message.settings')},
        {key: 'Ctrl + g / ⌘ + g', desc: '模板管理'},
        {key: 'Ctrl + w / ⌘ + w', desc: this.$t('message.close') + ' Tab'},
        {key: '⌘ + h', desc: this.$t('message.hide_window')},
        {key: 'Ctrl + [h/m] / ⌘ + m', desc: this.$t('message.minimize_window')},
        {key: 'Ctrl + Enter / ⌘ + Enter', desc: this.$t('message.maximize_window')},
        {key: 'Ctrl / ⌘ + click key', desc: this.$t('message.open_new_tab')},
        {key: 'Ctrl + ? / ⌘ + ?', desc: this.$t('message.hotkey') + ' Tips'},
      ];
    }
  },
  methods: {
    show() {
      this.visible = true;
    },
  },
  mounted() {
    this.$shortcut.bind('ctrl+/, ⌘+/', () => {
      this.show();
      return false;
    });
  }
};
</script>

