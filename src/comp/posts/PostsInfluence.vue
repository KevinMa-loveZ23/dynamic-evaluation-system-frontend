<script setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue'
// import { Get } from "@/web/comm"
// import { ElMessage } from 'element-plus'

import { store } from '@/store/store'
import { getTopNPosts, PostInfo } from './posts';
import { strIsInt } from '@/comp/check'

// const shortcuts = [
//     {
//         text: '今天',
//         value: new Date(),
//     },
//     {
//         text: '昨天',
//         value: () => {
//             const date = new Date()
//             date.setTime(date.getTime() - 3600 * 1000 * 24)
//             return date
//         },
//     },
//     {
//         text: '一周前',
//         value: () => {
//             const date = new Date()
//             date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
//             return date
//         },
//     },
// ]
const timestamp = ref(1)
const disable_date_input = ref(false)

const field_str = ref('')
// const disable_field_input = ref(false)
const range_number = ref(1)
// const disable_range_input = ref(false)

const stamped_time = ref('time')
const field_id = ref('type')
const range = ref('n')
const result_list = ref([])

/**
 * @throws {Error} - customized error
 */
async function getTopN() {
    // disable_field_input.value = true
    // disable_range_input.value = true
    // try {
    //     const response = await new Get()
    //         .url("api", "post", "sort")
    //         .query("n", range_number.value)
    //         .query("type", field_str.value)
    //         .addQuery()
    //         .send()
    //     result_list.value = response
    //     result_list.value.sort((a, b) => {return b.score - a.score})
    //     field_id.value = field_str.value
    //     range.value = range_number.value.toString()
    // } catch (error) {
    //     ElMessage.error(error.toString())
    // }
    // disable_field_input.value = false
    // disable_range_input.value = false
    store.inputDisable = true
    if (!strIsInt(field_str.value)) {
        // field_str.value = ''
        throw new Error(store.error_messages.get('illegalInputError'))
    }
    refreshCard(await getTopNPosts(range_number.value, parseInt(field_str.value), disable_date_input.value ? null : timestamp.value))
    store.inputDisable = false
}
/**
 * 
 * @param {Array<PostInfo>} postInfoList - list of posts' info
 */
function refreshCard(postInfoList) {
    stamped_time.value = disable_date_input.value ? "当前" : timestamp.value
    field_id.value = field_str.value
    range.value = range_number.value
    result_list.value = postInfoList
    result_list.value.sort((a, b) => {return b.score - a.score})
}
</script>
<template>
    <div>
        <!-- <span>于</span>
        <el-date-picker
            v-model="timestamp"
            type="datetime"
            placeholder="选择日期和时间"
            :shortcuts="shortcuts"
            :disabled="disable_date_input"
        />
        <span>以前</span> -->
        <span>于</span>
        <el-input-number
            placeholder="N"
            v-model="timestamp"
            :min="1"
            :disabled="store.inputDisable || disable_date_input"
        />
        <span>以前 <el-checkbox v-model="disable_date_input" label="不提交时间节点（最新）"/></span>
    </div>
    <span>
        领域ID：
        <el-input
            placeholder="请输入查询领域ID"
            v-model="field_str"
            :disabled="store.inputDisable"
        />
    </span>
    <br/>
    <span>
        热度值前
        <el-input-number
            placeholder="N"
            v-model="range_number"
            :min="1"
            :disabled="store.inputDisable"
        >
        </el-input-number>
        名<el-button :icon="Search" @click="getTopN" />
    </span>
    <br/>
    <span>
        于 {{ stamped_time }} 以前领域 {{ field_id }} 热度值前 {{ range }} 的帖子：
        <el-table
            :data="result_list"
            :default-sort="{prop: 'score', order: 'descending'}"
            max-height="30vh" width="50vw"
        >
            <el-table-column
                label="序号"
                type="index"
                :index="(index) => {return index}"
            />
            <el-table-column
                prop="postId"
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