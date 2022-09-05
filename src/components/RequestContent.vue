<template>
  <div>
    <el-row>
      <el-col :span="2">
        <el-select v-model="selectHttpMethod" placeholder="Select">
          <el-option v-for="item in HttpMethod" :key="item" :label="item" :value="item" />
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select v-model="selectBaseUrl" placeholder="Select BaseUrl">
          <el-option v-for="item in baseUrls" :key="item" :label="item" :value="item" />
        </el-select>
      </el-col>
      <el-col :span="15">
        <el-input v-model="input3" placeholder="Please input"> </el-input>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button type="primary">Send</el-button>
      </el-col>
    </el-row>
    <el-scrollbar class="scrollbarHeight">
      <el-tabs v-model="activeName" class="min-height" @tab-click="handleClick">
        <el-tab-pane label="Headers" name="Headers">
          <Code />
        </el-tab-pane>
        <el-tab-pane label="Params" name="Params">Config</el-tab-pane>
        <el-tab-pane label="Body" name="Body">Role</el-tab-pane>
      </el-tabs>
      <Response />
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import Response from '@/components/Response.vue'
import Code from '@/components/Code.vue'
import { computed, ref } from 'vue'
import { HttpMethod } from '@/enums/HttpMethod'
import { useStore } from '@/store'
const input3 = ref('')
const selectHttpMethod = ref(HttpMethod.GET)
const selectBaseUrl = ref('')
const activeName = ref('Headers')
const store = useStore()
const baseUrls = computed(() => {
  return store.state.baseUrls
})
</script>

<style scoped lang="scss">
.min-height {
  min-height: 350px;
}
.scrollbarHeight {
  height: calc(100% - 72px);
}
</style>
