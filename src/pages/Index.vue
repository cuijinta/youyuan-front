<template>
  <van-cell center title="最佳搭档">
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="24" inactive-color="rgba(61, 58, 64, 0.92)"/>
    </template>
  </van-cell>
  <user-card-list :user-list="userList" :loading="loading"/>
  <van-empty v-if="!userList || userList.length < 1"
             image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVWsm8-OWBvS7sumNvb9APNobyW6J6A18ObQ&usqp=CAU"
             image-size="200"
             description="数据为空~"
  />
</template>

<script setup lang="ts">
import {ref, watchEffect} from 'vue';
import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";
import UserCardList from "../components/UserCardList.vue";
import {UserType} from "../models/user";

const userList = ref([]);
const isMatchMode = ref<boolean>(false);
const loading = ref(true);

/**
 * 加载数据
 */
const loadData = async () => {
  let userListData;
  loading.value = true;
  // 心动模式，根据标签匹配用户
  if (isMatchMode.value) {
    const num = 10;
    userListData = await myAxios.get('/user/match', {
      params: {
        num,
      },
    })
        .then(function (response) {
          console.log('/user/match succeed', response);
          return response?.data;
        })
        .catch(function (error) {
          console.error('/user/match error', error);
          showFailToast('请求失败');
        })
  } else {
    // 普通模式，直接分页查询用户
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize: 8,
        pageNum: 1,
      },
    })
        .then(function (response) {
          console.log('/user/recommend succeed', response);
          return response?.data?.records;
        })
        .catch(function (error) {
          console.error('/user/recommend error', error);
          showFailToast('请求失败');
        })
  }
  if (userListData) {
    userListData.forEach((user: UserType) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
  loading.value = false;
}

watchEffect(() => {
  loadData();
})

</script>

<style>

:root {
  --van-card-background: rgba(117, 107, 245, 0.92);
  /*--van-card-thumb-radius: 1px;*/
}
</style>