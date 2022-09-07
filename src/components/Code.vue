<template>
  <div class="code-main">
    <el-row class="row" v-for="(item, index) in rows" :key="item.key">
      <el-col :span="1">
        <div style="width: 30px">
          {{ index + 1 }}
        </div>
      </el-col>
      <el-col :span="23">
        <div
          ref="lines"
          contenteditable="true"
          class="row-item"
          v-text="item.value"
          @input="changeValue(item, $event)"
          @keydown.enter.stop.prevent="addNewRow"
          @keyup.delete="deleteRow(item, index)"
        ></div>
      </el-col>
    </el-row>
    <div class="tip" :style="{ left: tipOffset + 'px' }">
      <el-card class="box-card">
        <div v-for="tip in tips" :key="tip" class="text-item">
          {{ tip }}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import HeaderUtil from '@/utils/HeaderUtil'
interface Header {
  key: string
  value: string
}
const rows = ref<Array<Header>>([
  { key: '1', value: '1' },
  { key: '2', value: '2' }
])
const tips = ref<Array<string>>([])
const tipOffset = ref(0)
const lines = ref()

const addNewRow = async () => {
  const newRow = { key: Math.random().toString(), value: '' }
  rows.value.push(newRow)
  await nextTick()
  lines.value[rows.value.length - 1].focus()
}
const deleteRow = (item: Header, index: number) => {
  if (!item.value) {
    rows.value.splice(index, 1)
    lines.value[rows.value.length - 1].focus()
  }
}
const changeValue = async (item: Header, event: Event) => {
  item.value = event.target?.innerText
  const tipVaules = HeaderUtil.getInstance().searchPrefix(item.value)
  const sel = document.getSelection() as Selection
  const offset = sel.focusOffset
  tipOffset.value = offset * 2 + 30
  console.log(tipOffset.value)
  tips.value = tipVaules
}
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
  font-size: 20px;
  color: #fff;
}
.row-item {
  outline: none;
}

.tip {
  position: absolute;
}

.text-item {
  cursor: pointer;
}
.text-item:hover {
  background-color: rgb(174, 174, 179);
}
::v-deep .el-card__body {
  padding: 0;
}
</style>
