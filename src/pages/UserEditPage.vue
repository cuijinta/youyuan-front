<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../api/user.ts";
import {getCurrentUserState} from "../states/user.ts";

const route = useRoute();
const router = useRouter(); //路由组件
const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName,
})

const onSubmit = async () => {
  //方法一：从封装的方法中获取当前用户
  // const res = await getCurrentUser();
  // if (res.code === 20000){
  //   user.value = res.data;
  //   showSuccessToast('获取用户信息成功');
  // } else if(res.code === 40100){
  //   showFailToast('请先登录')
  // }
  const currentUser = await getCurrentUserState();

  if(!currentUser) {
    showFailToast('登录已过期');
    route.push('/user/login');
    return;
  }

//   todo: 把editKey editName currentValue 提交到后台
  const res = await myAxios.post('user/update', {
    'id': currentUser.id,
    [editUser.value.editKey as string]: editUser.value.currentValue,
  })
  console.log(res);
  console.log('更新请求')
  if(res.code === 20000 && res.data > 0) {
    showSuccessToast('修改成功');
    router.back();
  } else {
    showFailToast('修改失败');
  }
};

</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :placeholder="`请输入${editUser.editName}`"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>