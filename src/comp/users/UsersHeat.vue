<script setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue'
import { Get } from "@/web/comm"
import { ElMessage } from 'element-plus'
const users_heat = ref('')
const users_id = ref('')
const input_str = ref('')
const disable_input = ref(false)
async function getHeat() {
    disable_input.value = true
    try {
        const response = await new Get()
            .url("api", "user", input_str.value)
            .send()
        users_heat.value = response.score.toString()
        users_id.value = input_str.value
    } catch (error) {
        ElMessage.error(error.toString())
    }
    disable_input.value = false
}
</script>
<template>
    <span>
        用户ID：
        <el-input
            placeholder="请输入查询用户ID"
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
        用户{{ users_id }}的热度值为：{{ users_heat }}
    </span>
</template>