<script setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue'
import { Get } from "@/web/comm"
import { ElMessage } from 'element-plus'
const field_str = ref('')
const disable_field_input = ref(false)
const range_number = ref(1)
const disable_range_input = ref(false)
const field_id = ref('ID')
const range = ref('N')
const result_list = ref([])
async function getTopN() {
    disable_field_input.value = true
    disable_range_input.value = true
    try {
        const response = await new Get()
            .url("api", "post", "sort")
            .query("n", range_number.value)
            .query("type", field_str.value)
            .addQuery()
            .send()
        result_list.value = response
        result_list.value.sort((a, b) => {return b.score - a.score})
        field_id.value = field_str.value
        range.value = range_number.value.toString()
    } catch (error) {
        ElMessage.error(error.toString())
    }
    disable_field_input.value = false
    disable_range_input.value = false
}
</script>
<template>
    <span>
        领域ID：
        <el-input
            placeholder="请输入查询领域ID"
            v-model="field_str"
            :disabled="disable_field_input"
        />
    </span>
    <br/>
    <span>
        热度值前
        <el-input-number
            placeholder="N"
            v-model="range_number"
            :min="1"
            :disabled="disable_range_input"
        >
        </el-input-number>
        名<el-button :icon="Search" @click="getTopN" />
    </span>
    <br/>
    <span>
        领域{{ field_id }}热度值前{{ range }}的帖子：
        <el-table
            :data="result_list"
            :default-sort="{prop: 'score', order: 'descending'}"
        >
            <el-table-column
                label="序号"
                type="index"
                :index="(index) => {return index}"
            />
            <el-table-column
                prop="id"
                label="帖子ID"
                sortable
            />
            <el-table-column
                prop="type"
                label="领域ID"
            />
            <el-table-column
                prop="score"
                label="热度值"
                sortable
            />
        </el-table>
    </span>
</template>