<template>
  <van-nav-bar
      :title="title"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>
  <div id="content">
    <router-view/>
  </div>

  <van-tabbar route>
    <van-tabbar-item to="/" icon="wap-home" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="friends" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="manager" name="user">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import {ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
const title = ref('');
const router = useRouter();
const route = useRoute();
watch(route, () => {
  if (route.meta.title) {
    console.log(route.meta.title)
    title.value = route.meta.title;
  }
}, { immediate: true }); // immediate: true 表示立即执行一次 watch 函数
//监听点击事件与路由冲突
// const onChange = (index) => {
//   Toast(`标签 ${index}`);
// }
const onClickLeft = () => {
  router.back();
};
const onClickRight = () => {
  router.push('/search')
};

</script>

<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}

#content {
  padding-bottom: 50px;
}
</style>