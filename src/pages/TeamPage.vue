<template>
  <div style="margin-bottom: 16px"/>
  <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch" />
  <van-tabs v-model:active="active" @change="onTabChange">
    <van-tab icon="fire-o" title="公开" name="public" />
    <van-tab icon="lock" title="加密" name="private" />
    <van-tab icon="user-o" title="我的" name="mine" />

  </van-tabs>
  <div style="margin-bottom: 16px" />
<!--  <van-button class="add-button" type="primary" icon="plus" @click="toAddTeam" />-->
  <team-card-list :teamList="teamList" />
<!--  <van-empty v-if="!teamList || teamList.length < 1"-->
<!--             image=""-->
<!--             image-size="200"-->
<!--             description="还没有这样的队伍，快去创建一个吧~"-->
<!--  />-->
  <van-floating-bubble v-model:offset="offset" axis="xy" icon="plus" @click="toAddTeam"  />
  <van-empty v-if="!teamList || teamList.length < 1"/>

</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";

const active = ref('public')
const router = useRouter();
const searchText = ref('');
const offset = ref({ x: 300, y: 520 });
const teamList = ref([]);

// 跳转到创建队伍页
const toAddTeam = () => {
  router.push({
    path: "/team/add"
  })
}

/**
 * 搜索队伍
 * @param val
 * @param status
 * @returns {Promise<void>}
 */
const listTeam = async (val = '', status = 0) => {
  const res = await myAxios.get("/team/list", {
    params: {
      searchText: val,
      pageNum: 1,
      status,
    },
  });
  if (res?.code === 20000) {
    teamList.value = res.data;
  } else {
    showFailToast('加载队伍失败，请刷新重试');
  }
}


//页面加载时触发一次查询
onMounted(async () => {
    const res = await myAxios.get("/team/list", {
      params: {
        status: 0,
      },
    });
    if(res?.code === 20000) { //res?.code === 20000
      teamList.value = res.data;
    }else {
      showFailToast("加载失败")
    }
});

/**
 * 切换查询状态
 * @param name
 */
const onTabChange = (name) => {
  // 查公开
  if (name === 'public') {
    listTeam(searchText.value, 0);
  } else if(name === 'private') {
    // 查加密
     listTeam(searchText.value, 2);
  } else if(name === 'mine') {
    router.push('/user/team/create')
  }
}


const onSearch = (val) => {
  listTeam(val);
};

</script>

<style scoped>

</style>