<template>

  <van-button type="primary" @click="doJoinTeam">加入队伍</van-button>
  <team-card-list :teamList="teamList"></team-card-list>
</template>

<script setup>
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";

const router = useRouter();

//跳转到加入队伍页面
const doJoinTeam = () => {
  router.push({
    path: '/team/add'
  })
}

const teamList = ref([]);
//页面加载时触发一次查询
onMounted(async () => {
    const res = myAxios.get("/team/list");
    if(res?.code === 20000) {
      teamList.value = res.data;
    }else {
      showFailToast("加载队伍失败，请刷新")
    }
});

</script>

<style scoped>

</style>