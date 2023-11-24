<script setup>
import { ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { store } from "@/store/store"

import { uploadJsonFile } from './info'

const uploadRef = ref()

const fileString = ref('')
function readFile(file, files) {
    store.inputDisable = true
    const reader = new FileReader()
    reader.readAsText(file.raw, 'UTF-8')
    reader.onload = async fileReader => {
        fileString.value = reader.result
        store.inputDisable = false
    }
}
async function submitInfo() {
    store.inputDisable = true
    const ret = await uploadJsonFile(fileString.value)
    ElMessage({
        message: "上传成功",
        type: "success"
    })
    uploadRef.value.clearFiles()
    store.inputDisable = false
}
</script>
<template>
    <div>仅保留用于调试</div>
        <!-- :http-request="handleRequest" -->
    <el-upload
        drag
        ref="uploadRef"
        :action="store.baseUrl + '/api/info'"
        accept=".json"
        :auto-upload="false"
        :limit="1"
        :disabled="store.inputDisable"
        :on-change="readFile"
    >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
        拖拽文件到这里或<em>点击这里上传</em>
        </div>
        <template #tip>
        <div>
            只允许上传 Json 文件
        </div>
        </template>
    </el-upload>
    <!-- @click="submitUpload" -->
    <el-button class="ml-3" type="primary" :disabled="store.inputDisable" @click="submitInfo">
        上传
    </el-button>
</template>