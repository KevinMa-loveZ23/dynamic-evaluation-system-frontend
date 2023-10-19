<script setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue'
import { Get } from "@/web/comm"
import { ElMessage } from 'element-plus'
const range_number = ref(1)
const disable_range_input = ref(false)
const range = ref('N')
const result_list = ref([])
async function getTopN() {
    disable_range_input.value = true
    try {
        const response = await new Get()
            .url("api", "user", "sort")
            .query("n", range_number.value)
            .addQuery()
            .send()
        result_list.value = response
        result_list.value.sort((a, b) => {return b.score - a.score})
        range.value = range_number.value.toString()
    } catch (error) {
        ElMessage.error(error.toString())
    }
    // const response = [
    //     {id: 114, type: parseInt(field_str.value), score: 700},
    //     {id: 514, type: parseInt(field_str.value), score: 690},
    //     {id: 1919, type: parseInt(field_str.value), score: 300},
    //     {id: 810, type: parseInt(field_str.value), score: 300},
    //     {id: 42, type: parseInt(field_str.value), score: 400}
    // ]
    // const sleep = (delay) => new Promise((res)=>{setTimeout(res, delay)})
    // await sleep(1000)
    disable_range_input.value = false
}
</script>
<template>
    <!-- <span>
        用户ID：
        <el-input
            placeholder="请输入查询用户ID"
            v-model="field_str"
            :disabled="disable_field_input"
        />
    </span>
    <br/> -->
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
        热度值前{{ range }}的用户：
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
                label="用户ID"
                sortable
            />
            <el-table-column
                prop="score"
                label="热度值"
                sortable
            />
        </el-table>
    </span>
</template>