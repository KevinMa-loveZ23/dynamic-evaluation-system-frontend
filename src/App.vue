<script setup>
import { ref } from 'vue';

// import PostsHeat from './comp/posts/PostsHeat.vue'
// import PostsInfluence from './comp/posts/PostsInfluence.vue';
// import UsersHeat from './comp/users/UsersHeat.vue';
// import UsersInfluence from './comp/users/UsersInfluence.vue';

import { store } from '@/store/store'

// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
const openeds = [store.list_names[0][0].path, store.list_names[1][0].path]
// const actived = store.list_names[0][1].path
// const list_names = [
//   [
//     "帖子Posts",
//     {name: "帖子热度值", path: "posts-heat"},
//     {name: "影响力前N帖子", path: "posts-influence"},
//   ],
//   [
//     "用户Users",
//     {name: "用户热度值", path: "users-heat"},
//     {name: "影响力前N用户", path: "users-influence"},
//   ],
//   [
//     "提交数据Info",
//     {name: "提交数据", path: "info"},
//   ]
// ]
// function getItemName(index) {
//   switch (index) {
//     case "posts-heat":
//       return list_names[0][1].name
//       break;
//     case "posts-influence":
//       return list_names[0][2].name
//       break;
//     case "users-heat":
//       return list_names[1][1].name
//       break;
//     case "users-influence":
//       return list_names[1][2].name
//       break;
//     case "info":
//       return list_names[2][1].name
//       break;
  
//     default:
//       break;
//   }
// }

const currentItemName = ref('')
function selectItem(index, indexPath, item, routerResult) {
  currentItemName.value = store.getItemName(index)
}
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main> -->
  <div :style="{display: 'flex', justifyContent: 'center', alignItems: 'center'}">
    <el-container :style="{
      height: '75vh', width:'75vw',
      borderRadius: 'var(--el-border-radius-base)', border: '1px solid var(--el-border-color)'
      }">
      <el-header :style="{
        height: '10%', magrin: 'auto', top: '50%',
        borderBottom: '1px solid var(--el-border-color)',
        display: 'flex', alignItems: 'center'
        }">
        <span>稳定社区影响力评估系统</span>
      </el-header>
      <el-container height="90%">
        <el-aside :style="{
          width: '20%', minWidth: '15%'
        }">
          <el-menu
            :style="{
              height: '100%'
            }"
            :default-openeds="openeds"
            :router="true"
            @open="handleOpen"
            @close="handleClose"
            @select="selectItem"
          >
          <!-- :default-active="actived" -->
            <el-sub-menu :index="store.list_names[0][0].path">
              <template #title>
                <span>{{ store.list_names[0][0].name }}</span>
              </template>
                <el-menu-item :index="store.list_names[0][1].path">{{ store.list_names[0][1].name }}</el-menu-item>
                <el-menu-item :index="store.list_names[0][2].path">{{ store.list_names[0][2].name }}</el-menu-item>
            </el-sub-menu>
            <el-sub-menu :index="store.list_names[1][0].path">
              <template #title>
                <span>{{ store.list_names[1][0].name }}</span>
              </template>
                <el-menu-item :index="store.list_names[1][1].path">{{ store.list_names[1][1].name }}</el-menu-item>
                <el-menu-item :index="store.list_names[1][2].path">{{ store.list_names[1][2].name }}</el-menu-item>
            </el-sub-menu>
            <el-menu-item :index="store.list_names[2][0].path">
              <span>{{ store.list_names[2][0].name }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <el-card>
            <template #header>{{ currentItemName }}</template>
            <!-- <PostsInfluence/> -->
            <!-- <el-scrollbar max-height="45vh"> -->
              <router-view></router-view>
            <!-- </el-scrollbar> -->
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<style scoped>
/* header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */
</style>
