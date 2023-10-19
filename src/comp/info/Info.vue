<script setup>
import { ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { store } from "@/store/store"
import { Post } from "@/web/comm"
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
        // const fileData = fileReader.target.result;
        // console.log(JSON.parse(fileData));
        // console.log(JSON.parse(reader.result));
        try {
            const response = await new Post()
                .url("api","info")
                .bodyObject(JSON.parse(reader.result))
                .send()
            ElMessage({
                message: "上传成功",
                type: "success"
            })
        } catch (error) {
            ElMessage.error(error.toString())
        }
        uploadRef.value.clearFiles()
        disable_upload.value = false
    }
}
</script>
<template>
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
            文件限制提示，记得改
        </div>
        </template>
    </el-upload>
    <el-button class="ml-3" type="primary" @click="submitUpload">
        上传
    </el-button>
</template>