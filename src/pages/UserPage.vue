<template>
  <template v-if="user">
    <van-cell title="头像" is-link to="/user/edit">
      <img height="48px" :src="user.avatarUrl">
    </van-cell>
    <van-cell title="昵称" is-link to="/user/edit" :value="user.username"  @click="toEdit('username', '昵称', user.username)"/>
    <van-cell title="账号" is-link to="/user/edit" :value="user.userAccount"  @click="toEdit('userAccount', '账号', user.userAccount)"/>
    <van-cell title="性别" is-link to="/user/edit" :value="user.gender" @click="toEdit('gender', '性别', user.gender)" />
    <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone', '电话', user.phone)"/>
    <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email', '邮箱', user.email)"/>
    <van-cell title="个人简介" is-link to="/user/edit" :value="user.profile" @click="toEdit('profile', '个人简介', user.profile)"/>
    <van-cell title="编号" :value="user.code"/>
    <van-cell title="注册时间" :value="user.createTime"/>
  </template>
</template>


<script setup lang="ts">
import {useRouter} from "vue-router";
import {showFailToast, showSuccessToast} from "vant";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../api/user.ts";
import {formatDateString} from "../plugins/DateFormat.ts";

const router = useRouter();

const user = ref();

onMounted(async () =>{
  const res = await getCurrentUser();
  // if (res.code === 20000){
  //   user.value = res.data;
  //   showSuccessToast('获取用户信息成功');
  if(res) {
      user.value = res;
    showSuccessToast('获取用户信息成功');

    user.value.createTime = formatDateString(user.value.createTime, 'yyyy-MM-dd HH:mm:ss');
  } else {
    showFailToast('登录过期')
    await router.push('/user/login');
  }
})

//修改信息方法
const toEdit = (editKey: string, editName:string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query:{
      editKey,
      editName,
      currentValue,
    }
  })
}

</script>



<style scoped>

</style>