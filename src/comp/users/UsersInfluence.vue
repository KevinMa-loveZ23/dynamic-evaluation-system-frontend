<script setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue'

import { store } from '@/store/store'
import { getTopNUsers, UserInfo } from './users';
import { strIsInt } from '@/comp/check'

const timestamp = ref(1)
const disable_date_input = ref(false)

const field_str = ref('')
const field_id_input = ref(store.field_names[0])
const field_id = ref('type')

const stamped_time = ref('time')
const range_number = ref(1)
const range = ref('n')
const result_list = ref([])
/**
 * @throws {Error} - customized error
 */
async function getTopN() {
    store.inputDisable = true
    // if (!strIsInt(field_str.value)) {
    //     // field_str.value = ''
    //     throw new Error(store.error_messages.get('illegalInputError'))
    // }
    // refreshCard(await getTopNUsers(range_number.value, parseInt(field_str.value), disable_date_input.value ? null : timestamp.value))
    if (!strIsInt(field_id_input.value.id)) {
        // field_str.value = ''
        throw new Error(store.error_messages.get('illegalInputError'))
    }
    refreshCard(await getTopNUsers(range_number.value, parseInt(field_id_input.value.id), disable_date_input.value ? null : timestamp.value))
    store.inputDisable = false
}
/**
 * 
 * @param {Array<UserInfo>} userInfoList - list of users' info
 */
function refreshCard(userInfoList) {
    stamped_time.value = disable_date_input.value ? "当前" : timestamp.value
    // field_id.value = field_str.value
    field_id.value = field_id_input.value.label
    range.value = range_number.value
    result_list.value = userInfoList
    result_list.value.sort((a, b) => {return b.score - a.score})
}
</script>
<template>
    <div class="functionalSingleLine">
        于
        <el-input-number
            placeholder="N"
            v-model="timestamp"
            :min="1"
            :disabled="store.inputDisable || disable_date_input"
        />
        以前
        <el-checkbox v-model="disable_date_input" label="不提交时间节点（最新）"/>
    </div>
    <div class="functionalSingleLine">
        领域：
        <!-- <el-input
            placeholder="请输入查询领域ID"
            v-model="field_str"
            :disabled="store.inputDisable"
        /> -->
        <el-select
            v-model="field_id_input"
            filterable
            value-key="id"
            placeholder="选择领域"
            :disabled="store.inputDisable"
        >
            <el-option
                v-for="field in store.field_names"
                :key="field.id"
                :label="field.label"
                :value="field"
            />
        </el-select>
    </div>
    <!-- <br/> -->
    <div class="functionalSingleLine">
        热度值前
        <el-input-number
            placeholder="N"
            v-model="range_number"
            :min="1"
            :disabled="store.inputDisable"
        >
        </el-input-number>
        名
    </div>
    <div class="functionalSingleLine">
        <el-button :icon="Search" @click="getTopN">搜索</el-button>
    </div>
    <!-- <br/> -->
    <div class="functionalSingleLine">
        于 {{ stamped_time }} 以前领域 {{ field_id }} 热度值前 {{ range }} 的用户：
        <el-table
            :data="result_list"
            :default-sort="{prop: 'score', order: 'descending'}"
            max-height="30vh"
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
    </div>
</template>