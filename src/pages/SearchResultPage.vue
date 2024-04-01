<template>
  <user-card-list :user-list="userList" :loading="loading"/>
  <van-empty v-if="!userList || userList.length < 1"
             image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVWsm8-OWBvS7sumNvb9APNobyW6J6A18ObQ&usqp=CAU"
             image-size="200"
    description="没找到这样的同学~"
/>

</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import qs from 'qs';
import {showFailToast, showSuccessToast} from "vant";
import UserCardList from "../components/UserCardList.vue";

const route = useRoute()
const {tags} = route.query;
const userList = ref([]);
const loading = ref(false);

onMounted(async () => {
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: params => {
      return qs.stringify(params, {indices: false})
    }
  }).then(function (response) {
    console.log('/user/search/tags succeed', response);
    console.log(response);
    showSuccessToast('获取成功');
    console.log(response.data)
    return response?.data; //响应拦截器里面处理了响应，这里的返回值已经是data了
  }).catch(function (error) {
    console.log('/user/search/tags error', error);
    showFailToast('获取失败');
  });

  if(userListData) {
    console.log('userListData', userListData);
    userListData.forEach(user => {
      if(user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
    console.log('userList', userList);
  }
})
</script>

<style>

</style>