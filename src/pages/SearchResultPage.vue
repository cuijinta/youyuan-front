<template>
  <user-card-list :user-list="userList" :loading="loading"/>
  <van-loading v-if="!dataLoaded" type="spinner" color="#0094ff" size="50px" vertical >加载中...</van-loading> <!-- 加载指示器 -->
  <van-empty v-if="dataLoaded && (!userList || userList.length < 1)"
             :image="emptyResult"
             image-size="200"
    description="没找到这样的同学~"
/>

</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import qs from 'qs';
import emptyResult from '../assets/search_result.png'
import UserCardList from "../components/UserCardList.vue";

const route = useRoute()
const {tags} = route.query;
const userList = ref([]);
const loading = ref(false);
const dataLoaded = ref(false); //添加数据加载是否完成状态

onMounted(async () => {
  // const userListData = await myAxios.get('/user/search/tags', {
  //   params: {
  //     tagNameList: tags
  //   },
  //   paramsSerializer: params => {
  //     return qs.stringify(params, {indices: false})
  //   }
  // }).then(function (response) {
  //   console.log('/user/search/tags succeed', response);
  //   console.log(response);
  //   showSuccessToast('获取成功');
  //   console.log(response.data)
  //   return response?.data; //响应拦截器里面处理了响应，这里的返回值已经是data了
  // }).catch(function (error) {
  //   console.log('/user/search/tags error', error);
  //   showFailToast('获取失败');
  // });
  // if(userListData) {
  //   console.log('userListData', userListData);
  //   userListData.forEach(user => {
  //     if(user.tags) {
  //       user.tags = JSON.parse(user.tags);
  //     }
  //   })
  //   userList.value = userListData;
  //   console.log('userList', userList);
  // }else {
  //   dataLoaded.value = true
  // }
  try {
    const userListData = await myAxios.get('/user/search/tags', {
      params: {
        tagNameList: tags
      },
      paramsSerializer: params => {
        return qs.stringify(params, {indices: false})
      }
    });

    console.log('/user/search/tags succeed', userListData);
    // showSuccessToast('获取成功');

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
  } catch (error) {
    console.log('/user/search/tags error', error);
    // showFailToast('获取失败');
  } finally {
    dataLoaded.value = true; // 无论请求成功还是失败，都将 dataLoaded 设置为 true
  }
})
</script>

<style>

</style>