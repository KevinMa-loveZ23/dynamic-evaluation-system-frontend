<script setup>
import { ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { store } from "@/store/store"

import { uploadJsonFile } from './info'

const disable_upload = ref(false)
const uploadRef = ref()
const submitUpload = () => {
    if (!uploadRef.value) {
        ElMessage({
            message: "未选择上传文件",
            type: "warning"
        })
        return
    }
    uploadRef.value.submit()
}
const handleRequest = (e) => {
    disable_upload.value = true
    const reader = new FileReader();
    reader.readAsText(e.file, 'UTF-8');
    reader.onload = async fileReader => {
        await uploadJsonFile(reader.result)
        ElMessage({
            message: "上传成功",
            type: "success"
        })
        uploadRef.value.clearFiles()
        disable_upload.value = false
    }
}
</script>
<template>
    <div>仅保留用于调试</div>
    <el-upload
        drag
        ref="uploadRef"
        :action="store.baseUrl + '/api/info'"
        :http-request="handleRequest"
        accept=".json"
        :auto-upload="false"
        :limit="1"
        :disabled="disable_upload"
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
    <el-button class="ml-3" type="primary" @click="submitUpload">
        上传
    </el-button>
</template>