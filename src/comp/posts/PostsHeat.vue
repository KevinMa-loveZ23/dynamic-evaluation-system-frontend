<script setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue'

import { store } from '@/store/store'
import { getPostInfo, PostInfo } from './posts'
import { strIsInt } from '@/comp/check'

const posts_type = ref('type')
const posts_heat = ref('heat')
const posts_id = ref('id')

const input_str = ref('')
/**
 * @throws {Error} - customized error
 */
async function getHeat() {
    store.inputDisable = true
    if (!strIsInt(input_str.value)) {
        // input_str.value = ''
        throw new Error(store.error_messages.get('illegalInputError'))
    }
    refreshCard(await getPostInfo(parseInt(input_str.value)))
    store.inputDisable = false
}
/**
 * 
 * @param {PostInfo} postInfo - post's info
 */
function refreshCard(postInfo) {
    posts_id.value = postInfo.postId
    posts_type.value = postInfo.type
    posts_heat.value = postInfo.score
}
</script>
<template>
    <span>
        帖子ID：
        <el-input
            placeholder="请输入查询帖子ID"
            v-model="input_str"
            :disabled="store.inputDisable"
            @keyup.enter.native="getHeat"
        >
            <template #append>
                <el-button :icon="Search" @click="getHeat" />
            </template>
        </el-input>
    </span>
    <br/>
    <span>
        领域 {{ posts_type }} 的帖子 {{ posts_id }} 的热度值为：{{ posts_heat }}
    </span>
</template>