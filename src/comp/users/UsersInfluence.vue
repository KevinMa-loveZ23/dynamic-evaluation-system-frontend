<script setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue'
// import { Get } from "@/web/comm"
// import { ElMessage } from 'element-plus'

import { store } from '@/store/store'
import { getTopNUsers, UserInfo } from './users';
import { strIsInt } from '@/comp/check'

const timestamp = ref(1)
const disable_date_input = ref(false)

const field_str = ref('')
const field_id = ref('type')

const stamped_time = ref('time')
const range_number = ref(1)
// const disable_range_input = ref(false)
const range = ref('n')
const result_list = ref([])
/**
 * @throws {Error} - customized error
 */
async function getTopN() {
    // disable_range_input.value = true
    // try {
    //     const response = await new Get()
    //         .url("api", "user", "sort")
    //         .query("n", range_number.value)
    //         .addQuery()
    //         .send()
    //     result_list.value = response
    //     result_list.value.sort((a, b) => {return b.score - a.score})
    //     range.value = range_number.value.toString()
    // } catch (error) {
    //     ElMessage.error(error.toString())
    // }
    // // const response = [
    // //     {id: 114, type: parseInt(field_str.value), score: 700},
    // //     {id: 514, type: parseInt(field_str.value), score: 690},
    // //     {id: 1919, type: parseInt(field_str.value), score: 300},
    // //     {id: 810, type: parseInt(field_str.value), score: 300},
    // //     {id: 42, type: parseInt(field_str.value), score: 400}
    // // ]
    // // const sleep = (delay) => new Promise((res)=>{setTimeout(res, delay)})
    // // await sleep(1000)
    // disable_range_input.value = false
    store.inputDisable = true
    if (!strIsInt(field_str.value)) {
        // field_str.value = ''
        throw new Error(store.error_messages.get('illegalInputError'))
    }
    // refreshCard([
    //     new UserInfo(1,parseInt(field_str.value),777,504,100),
    //     new UserInfo(43,parseInt(field_str.value),7777,4500,100000),
    //     new UserInfo(56,parseInt(field_str.value),7,5,10),
    //     new UserInfo(31,parseInt(field_str.value),77,45,100),
    //     new UserInfo(13,parseInt(field_str.value),7775,45000,5100),
    //     new UserInfo(22,parseInt(field_str.value),3777,3000,3100),
    // ])
    refreshCard(await getTopNUsers(range_number.value, parseInt(field_str.value), disable_date_input.value ? null : timestamp.value))
    store.inputDisable = false
}
/**
 * 
 * @param {Array<UserInfo>} userInfoList - list of users' info
 */
function refreshCard(userInfoList) {
    stamped_time.value = disable_date_input.value ? "当前" : timestamp.value
    field_id.value = field_str.value
    range.value = range_number.value
    result_list.value = userInfoList
    result_list.value.sort((a, b) => {return b.score - a.score})
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
    <div>
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
        于 {{ stamped_time }} 以前领域 {{ field_id }} 热度值前 {{ range }} 的用户：
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
                prop="userId"
                label="用户ID"
                sortable
            />
            <el-table-column
                prop="score"
                label="热度值"
                sortable
            />
            <el-table-column
                prop="fanCount"
                label="粉丝数"
                sortable
            />
            <el-table-column
                prop="level"
                label="等级"
                sortable
            />
        </el-table>
    </span>
</template>