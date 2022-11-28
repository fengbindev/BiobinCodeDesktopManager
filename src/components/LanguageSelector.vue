<template>
  <!-- language select -->
  <el-select v-model="selectedLang" @change="changeLang" placeholder="Language">
    <el-option
      v-for="item in langItems"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      selectedLang: 'cn',
      langItems: [
        { value: 'cn', label: '简体中文' },
        { value: 'en', label: 'English' },
      ],
    };
  },
  methods: {
    changeLang(lang) {
      localStorage.lang = this.selectedLang;
      this.$i18n.locale = this.selectedLang;
    },
  },
  mounted() {
    this.selectedLang = localStorage.lang || this.selectedLang;
  },
};
</script>
