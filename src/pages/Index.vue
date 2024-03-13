<template>
  <user-card-list :user-list="userList"/>
  <van-empty v-if="!userList || userList.length < 1"
             image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVWsm8-OWBvS7sumNvb9APNobyW6J6A18ObQ&usqp=CAU"
             image-size="200"
             description="数据为空~"
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

onMounted(async () => {
  const userListData = await myAxios.get('/user/recommend', {
    params: {
      pageSize: 8,
      pageNum: 1,
    },
    paramsSerializer: params => {
      return qs.stringify(params, {indices: false})
    }
  }).then(function (response) {
    console.log('/user/recommend succeed', response);
    console.log(response);
    showSuccessToast('获取列表成功');
    console.log(response.data)
    return response?.data?.records; //响应拦截器里面处理了响应，这里的响应已经是data了
  }).catch(function (error) {
    console.log('/user/recommend error', error);
    showFailToast('请求失败');
  });

  if(userListData) {
    console.log('userListData', userListData);
    userListData.forEach(user => {
      if(user.tags) { //数据库中的标签是json数组，我们在前端处理
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
    console.log('userList', userList);
  }
})
</script>

<style>

:root {
  --van-card-background: rgb(117, 107, 245);
  /*--van-card-thumb-radius: 1px;*/
}
</style>