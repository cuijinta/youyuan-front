<template>
  <template v-if="user">
    <van-cell title="头像" is-link to="/user/edit">
      <img height="48px" :src="user.avatarUrl">
    </van-cell>
    <van-cell title="昵称" is-link to="/user/edit" :value="user.username"  @click="toEdit('username', '昵称', user.username)"/>
    <van-cell title="账号" is-link to="/user/edit" :value="user.userAccount"  @click="toEdit('userAccount', '账号', user.userAccount)"/>

    <van-cell title="信息修改" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />

  </template>
</template>


<script setup lang="ts">
import {useRouter} from "vue-router";
import {showFailToast} from "vant";
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
    // showSuccessToast('获取用户信息成功');

    user.value.createTime = formatDateString(user.value.createTime, 'yyyy-MM-dd HH:mm:ss');
  }   else {
    showFailToast('登录过期')
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