<template>
  <div>
    <el-row>
      <el-col :span="2">
        <el-select v-model="select" placeholder="Select">
          <el-option label="Restaurant" value="1" />
          <el-option label="Order No." value="2" />
          <el-option label="Tel" value="3" />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="select" placeholder="Select">
          <el-option label="Restaurant" value="1" />
          <el-option label="Order No." value="2" />
          <el-option label="Tel" value="3" />
        </el-select>
      </el-col>
      <el-col :span="15"
        ><el-input v-model="input3" placeholder="Please input"> </el-input
      ></el-col>
      <el-col :span="2" :offset="1">
        <el-button type="primary">Send</el-button></el-col
      >
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const input3 = ref('')
const select = ref('')
</script>

