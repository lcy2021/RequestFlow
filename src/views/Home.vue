<template>
  <div style="height: 100%">
    <div class="main-header">
      <el-icon class="setting" title="设置" :size="20"><Setting /></el-icon>
      <el-icon class="setting" title="基础地址管理" :size="20"
        ><Link
      /></el-icon>
    </div>
    <div class="main">
      <el-menu class="main-left" :router="true">
        <el-input
          v-model="search"
          class="w-50 m-2"
          size="large"
          placeholder="查询"
          :suffix-icon="Search"
        />
        <el-button type="primary" :icon="Plus" :text="true" @click="addFlow"
          >添加流程</el-button
        >
        <FlowItem />
      </el-menu>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Setting, Link, Search, Plus } from '@element-plus/icons-vue'
import FlowItem from '@/components/FlowItem.vue'
import Request from '@/components/Request.vue'
import { useStore } from '@/store'
import { SET_Flow } from '@/enums/MutationEnum'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import NavModel from '@/models/NavModel'
import { Guid } from 'guid-typescript'

const search = ref('')
const store = useStore()
const router = useRouter()

//Handle new flow button
const addFlow = () => {
  ElMessageBox.prompt('请输入流程名称', '添加流程', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel'
  })
    .then(({ value }) => {
      ElMessage({
        type: 'success',
        message: `流程创建成功:${value}`
      })
      const newNav: NavModel = {
        id: Guid.create().toString(),
        name: value
      }
      router.addRoute('Home', {
        component: Request,
        path: `/${value}`,
        name: value,
        props: { parentId: newNav.id }
      })
      store.commit(SET_Flow, newNav)
      router.push(value)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消创建'
      })
    })
}
</script>

<style lang="scss">
.main {
  display: flex;
  height: calc(100% - 60px);
}
.main-header {
  display: flex;
  flex-direction: row-reverse;
  height: 60px;
  padding: 3px;
  align-items: center;
  background-color: #409eff;
  color: #fff;
}
.main-left {
  width: 300px;
}
.main-right {
  flex: 1;
}
.setting {
  cursor: pointer;
  margin: 10px;
}
</style>
