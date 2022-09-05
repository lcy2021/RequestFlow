<template>
  <el-tabs v-model="select" type="card" editable class="main-right" @edit="handleTabsEdit">
    <el-tab-pane v-for="item in requets" :key="item.id" :label="item.title" :name="item.name">
      <template #label>
        <span>{{ item.name }}</span>
      </template>
      <RequestContent />
    </el-tab-pane>
  </el-tabs>
</template>
  
<script setup lang="ts">
import RequestContent from './RequestContent.vue'
import { defineProps, ref } from 'vue'
import RequestModel from '@/models/RequestModel'
import { useStore } from '@/store'
import { computed } from 'vue'
import { MutaionEnum } from '@/enums/MutationEnum'
import { Guid } from 'guid-typescript'

const parent = defineProps<{ parentId: string }>()

const store = useStore()
const requets = computed<Array<RequestModel>>(() => {
  return store.getters[MutaionEnum.GET_RequestByGroup](parent.parentId)
})
const select = ref(requets.value[0].name)

const handleTabsEdit = (targetName: string, action: 'remove' | 'add') => {
  if (action === 'add') {
    const newRequest: RequestModel = {
      id: Guid.create().toString(),
      parentId: parent.parentId,
      name: `Request-${requets.value.length + 1}`,
      title: `Request-${requets.value.length + 1}`
    }
    store.commit(MutaionEnum.SET_Request, newRequest)
  } else if (action === 'remove') {
    // const tabs = editableTabs.value
    // let activeName = editableTabsValue.value
    // if (activeName === targetName) {
    //   tabs.forEach((tab, index) => {
    //     if (tab.name === targetName) {
    //       const nextTab = tabs[index + 1] || tabs[index - 1]
    //       if (nextTab) {
    //         activeName = nextTab.name
    //       }
    //     }
    //   })
    // }
    // editableTabsValue.value = activeName
    // editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
  }
}
</script>
