<script setup lang="ts">
import {useRouter} from "vue-router";

const user = {
  id: 1,
  username: 'qianye',
  userAccount: 'aaaa',
  avatarUrl: 'https://gw.alipayobjects.com/zos/bmw-prod/598d14af-4f1c-497d-b579-5ac42cd4dd1f/k7bjua9c_w132_h130.png',
  gender: '男',
  phone: '12345234522',
  createTime: new Date(),
  email: '23153411542@qq.com',
  code: '1234',
}

const router = useRouter();
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

<template>
  <van-cell title="头像" is-link to="/user/edit">
    <img height="48px" :src="user.avatarUrl">
  </van-cell>
  <van-cell title="昵称" is-link to="/user/edit" :value="user.username"/>
  <van-cell title="账号" is-link to="/user/edit" :value="user.userAccount"/>
  <van-cell title="性别" is-link to="/user/edit" :value="user.gender" @click="toEdit('gender', '性别', user.gender)" />
  <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone', '电话', user.phone)"/>
  <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('phone', '电话', user.phone)"/>
  <van-cell title="编号" :value="user.code"/>
  <van-cell title="注册时间" :value="user.createTime.toISOString()"/>
</template>

<style scoped>

</style>