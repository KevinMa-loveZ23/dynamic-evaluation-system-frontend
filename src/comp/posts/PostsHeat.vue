<script setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue'
import { Get } from "@/web/comm"
import { ElMessage } from 'element-plus'
const posts_heat = ref('')
const posts_id = ref('')
const input_str = ref('')
const disable_input = ref(false)
async function getHeat() {
    disable_input.value = true
    try {
        const response = await new Get()
            .url("api", "post", input_str.value)
            .send()
        posts_heat.value = response.score.toString()
        posts_id.value = input_str.value
    } catch (error) {
        console.log(error.toString())
        ElMessage.error(error.toString())
    }
    disable_input.value = false
}
</script>
<template>
    <span>
        帖子ID：
        <el-input
            placeholder="请输入查询帖子ID"
            v-model="input_str"
            :disabled="disable_input"
        >
            <template #append>
                <el-button :icon="Search" @click="getHeat" />
            </template>
        </el-input>
    </span>
    <br/>
    <span>
        帖子{{ posts_id }}的热度值为：{{ posts_heat }}
    </span>
</template>