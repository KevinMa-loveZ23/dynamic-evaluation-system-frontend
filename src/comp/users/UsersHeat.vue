<script setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue'
import { store } from '@/store/store'

import { getUserInfo, UserInfo, getAchvStatus } from './users'
import { strIsInt } from '@/comp/check'

const users_heat = ref('heat')
const users_id = ref('id')
const users_type = ref('type')

const users_level = ref('level')
const users_achv = ref([])

const input_str = ref('')
function test() {
    throw new Error("it's a error")
}
/**
 * @throws {Error} - customized error
 */
async function getHeat() {
    store.inputDisable = true
    if (!strIsInt(input_str.value)) {
        // input_str.value = ''
        throw new Error(store.error_messages.get('illegalInputError'))
    }
    refreshCard(await getUserInfo(parseInt(input_str.value)))
    // refreshCard(new UserInfo(parseInt(input_str.value), 5, 777, 34, 666))
    store.inputDisable = false
}
/**
 * 
 * @param {UserInfo} userInfo - user's info
 */
function refreshCard(userInfo) {
    // users_type.value = userInfo.type
    users_type.value = store.field_names.find((item) => item.id == userInfo.type).label
    users_id.value = userInfo.userId
    users_heat.value = userInfo.score
    users_level.value = userInfo.level
    users_achv.value = getAchvStatus(userInfo)
}
</script>
<template>
    <div class="functionalSingleLine">
        用户ID：
        <el-input
            placeholder="请输入查询用户ID"
            v-model="input_str"
            :disabled="store.inputDisable"
            @keyup.enter.native="getHeat"
        >
            <template #append>
                <el-button :icon="Search" @click="getHeat">搜索</el-button>
            </template>
        </el-input>
    </div>
    <div class="functionalSingleLine">
        领域 {{ users_type }} 的用户 {{ users_id }} 的热度值为：{{ users_heat }}
    </div>
    <div class="functionalSingleLine">
        <span>用户等级：{{ users_level }}</span>
        <el-table :data="users_achv" max-height="45vh" width="50vw">
            <el-table-column prop="name" label="成就" width="200" />
            <el-table-column prop="policy" label="条件" width="300" />
            <el-table-column label="状态" width="100">
                <template #default="scope">
                    <el-tag
                        :type="scope.row.status === true ? 'success' : 'info'"
                        disable-transitions
                    >{{ scope.row.status ? "已取得" : "未取得" }}
                    </el-tag>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>