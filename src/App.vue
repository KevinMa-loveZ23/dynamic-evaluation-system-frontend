<script setup>
import { ref } from 'vue';

import { store } from '@/store/store'

const openeds = [store.list_names[0][0].path, store.list_names[1][0].path]

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
  <div :style="{
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    height: '90%', width:'90%',
    }"
  >
    <el-container :style="{
      height: '100%', width: '100%',
      borderRadius: 'var(--el-border-radius-base)', border: '1px solid var(--el-border-color)'
      }">
      <el-header :style="{
        height: '10%', magrin: 'auto', top: '50%',
        borderBottom: '1px solid var(--el-border-color)',
        display: 'flex', alignItems: 'center',
        fontSize: '1.25rem'
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
          <el-card :style="{
            // fontSize: '1.5rem'
            }"
            v-loading="store.inputDisable"
          >
            <template #header>{{ store.router_names.get(this.$route.path.substring(1)) }}</template>
            <!-- <PostsInfluence/> -->
            <!-- <el-scrollbar max-height="45vh"> -->
              <router-view/>
            <!-- </el-scrollbar> -->
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<style>
.functionalSingleLine + .functionalSingleLine {
  margin-top: 3px;
}
#app {
  /* font-size: larger; */
  max-width: 100vw;
  max-height: 100vh;
  border: 0;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>

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
