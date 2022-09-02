<template>
  <el-scrollbar class="scrollbarHeight">
    <el-menu-item v-for="(item, idx) in navs" :index="item.name" :key="idx">
      <el-icon><Collection /></el-icon>
      <span>{{ item.name }}</span>
    </el-menu-item>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { Collection } from '@element-plus/icons-vue'
import { useStore } from '@/store'

const store = useStore()
const navs = store.state.navs
</script>

<style scoped lang="scss">
.scrollbarHeight {
  height: calc(100% - 72px);
}
</style>