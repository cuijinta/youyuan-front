<template>
  <van-loading v-if="!loading" type="spinner" color="#0094ff" size="50px" vertical>加载中...</van-loading>
  <!-- 加载指示器 -->
  <van-tabs v-model:active="active" @change="onTabChange">
    <van-tab icon="user" title="我创建的" name="mine"/>
    <van-tab icon="user-o" title="我加入的" name="join"/>
  </van-tabs>
  <!--    <van-button type="primary" @click="doJoinTeam">创建队伍</van-button>-->

  <team-card-list :teamList="teamList"/>
  <!--  <van-empty v-if="!teamList || teamList.length < 1"-->
  <!--             :image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVWsm8-OWBvS7sumNvb9APNobyW6J6A18ObQ&usqp=CAU"-->
  <!--             image-size="200"-->
  <!--             description="还没有这样的队伍，快去创建一个吧~"-->
  <!--  />-->
  <van-empty v-if="loading && (teamList?.length < 1)" description="数据为空"/>
  <van-floating-bubble v-model:offset="offset" axis="xy" icon="plus" @click="toAddTeam"/>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast} from "vant";

const router = useRouter();
const offset = ref({x: 300, y: 520});
const teamList = ref([]);
const loading = ref(false);
const active = ref('mine')

// 跳转到创建队伍页
const toAddTeam = () => {
  router.push({
    path: "/team/add"
  })
}

/**
 * 搜索队伍
 * @param val
 * @returns {Promise<void>}
 */
const listTeam1 = async (val = '') => {
  const res = await myAxios.get("/team/list/create", {
    params: {
      searchText: val,
      pageNum: 1,
    },
  });
  loading.value = true;
  if (res?.code === 20000) {
    teamList.value = res.data;
  } else {
    showFailToast('加载队伍失败，请刷新重试');
  }
}

const listTeam2 = async (val = '') => {
  const res = await myAxios.get("/team/list/join", {
    params: {
      searchText: val,
      pageNum: 1,
    },
  });
  if (res?.code === 20000) {
    teamList.value = res.data;
  } else {
    showFailToast('加载队伍失败，请刷新重试');
  }
}
// 页面加载时只触发一次
onMounted(() => {
  listTeam1();
})

const onTabChange = (name) => {
  // 查公开
  if (name === 'mine') {
    listTeam1();
  } else if (name === 'join') {
    // 查加密
    listTeam2();
  }
}

</script>

<style scoped>

</style>
