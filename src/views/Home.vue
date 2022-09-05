<template>
  <div style="height: 100%">
    <div class="main-header">
      <el-icon class="setting" title="设置" :size="20">
        <Setting />
      </el-icon>
      <el-icon class="setting" title="基础地址管理" :size="20">
        <Link />
      </el-icon>
    </div>
    <div class="main">
      <el-menu class="main-left" :router="true">
        <el-input v-model="search" class="w-50 m-2" size="large" placeholder="查询" :suffix-icon="Search" />
        <el-button type="primary" :icon="Plus" :text="true" @click="addFlow">添加流程</el-button>
        <Group />
      </el-menu>
      <router-view class="main-right-padding" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Group from '@/components/Group.vue'
import Request from '@/components/Request.vue'
import { ref } from 'vue'
import { Setting, Link, Search, Plus } from '@element-plus/icons-vue'
import { useStore } from '@/store'
import { MutaionEnum } from '@/enums/MutationEnum'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import NavModel from '@/models/NavModel'
import { Guid } from 'guid-typescript'
import RequestModel from '@/models/RequestModel'

const search = ref('')
const store = useStore()
const router = useRouter()

//Handle new flow button
const addFlow = () => {
  ElMessageBox.prompt('请输入分组名称', '新建分组', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel'
  })
    .then(({ value }) => {
      ElMessage({
        type: 'success',
        message: `创建成功:${value}`
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
      store.commit(MutaionEnum.SET_Group, newNav)

      const defaultRequest: RequestModel = {
        id: Guid.create().toString(),
        name: 'Request-1',
        title: 'Request-1',
        parentId: newNav.id
      }
      store.commit(MutaionEnum.SET_Request, defaultRequest)

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

<style lang="scss" scoped>
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
.main-right-padding {
  padding: 10px;
}
.setting {
  cursor: pointer;
  margin: 10px;
}
</style>
