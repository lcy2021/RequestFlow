<template>
  <div class="code-main">
    <el-row class="row" v-for="(item,index) in rows" :key="item.key">
      <el-col :span="1">
        <div style="width:30px;" contenteditable="false">
          {{index+1}}
        </div>
      </el-col>
      <el-col :span="23">
        <div contenteditable="true"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const rows = ref([
  { key: '1', value: '1', cursor: false },
  { key: '2', value: '2', cursor: false }
])
</script>

<style lang="scss" scoped>
.code-main {
  height: 100%;
  background-color: #303133;
  min-height: 350px;
  border: 1px solid;
}
.row {
  height: 30px;
  line-height: 30px;
  font-size: 25px;
  color: #fff;
}
.row:focus {
  outline: none;
  border-top: white dotted 1px;
  border-bottom: white dotted 1px;
}
</style>
