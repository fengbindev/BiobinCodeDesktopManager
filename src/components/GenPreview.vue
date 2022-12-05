<template>
  <el-tabs v-model="activeName" type="card">
    <el-tab-pane v-for="item in data" :key="item.name" :lazy="true" :label="item.name" :name="item.name">
      <JsonEditor :content="item.content" :language="item.language"/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import JsonEditor from '@/components/JsonEditor'
export default {
  name: 'Preview',
  components: { JsonEditor },
  props: ["data", "activeName"],
  data() {
    return {
      height: ''
    }
  },
  created() {
    this.height = document.documentElement.clientHeight - 180 + 'px'
  }
}
</script>
