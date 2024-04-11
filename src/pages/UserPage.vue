<template>

  <div v-if="!user">
    <van-empty image="search" description="暂无数据"/>
  </div>
  <div v-else>
    <div style="padding-top: 5px"></div>
    <div class="center">
      <van-uploader :after-read="afterRead"
                    :max-count="1"
                    :max-size="5000 * 1024"
                    @oversize="onOversize">
        <div>
          <img :alt="user.username" class="img" :src="user.avatarUrl ? user.avatarUrl :defaultPicture ">
        </div>
      </van-uploader>
    </div>
    <div style="padding-top: 10px"/>
    <!--    <van-cell :value="user.username.length<10?user.username:user.username.slice(0,8)+'...'" icon="manager-o" is-link-->
    <van-cell :value="user.username" icon="manager-o" is-link
              @click="update(user.username,'昵称','username')">
      <template #title>
        <span class="custom-title">昵称</span>
      </template>
    </van-cell>
    <van-cell :value="user.userAccount" icon="user-circle-o">
      <template #title>
        <span class="custom-title">账号</span>
      </template>
    </van-cell>
    <van-cell :value="genderMap[user.gender]" is-link icon="like-o"
              @click="update(user.gender,'性别','gender')">
      <template #title>
        <span class="custom-title">性别</span>
      </template>
    </van-cell>
    <van-cell :value="user.phone" icon="comment-o" is-link
              @click="update(user.phone,'联系方式','phone')">
      <template #title>
        <span class="custom-title">联系方式</span>
      </template>
    </van-cell>
    <van-cell value="点击查看" icon="label-o" is-link
              @click="tagUpdate(user.tags,user.id,'tags')">
      <template #title>
        <span class="custom-title">我的标签</span>
      </template>
    </van-cell>
    <van-cell value="点击更新信息" icon="ellipsis" is-link
              @click="toMore">
      <template #title>
        <span class="custom-title">更多信息</span>
      </template>
    </van-cell>
    <van-cell title="简介" icon="chat-o" is-link @click="update(user.profile,'简介','profile')">
      <template #value>
        <div v-if="user.profile" class="van-multi-ellipsis--l2">
          {{ user.profile }}
        </div>
        <div v-if="!user.profile" class="van-ellipsis">
          暂无简介
        </div>
      </template>
    </van-cell>
    <van-space style="margin: 13px" direction="vertical" fill>
      <van-button type="primary" @click="loginOut" block>退出登录</van-button>
    </van-space>
  </div>
  <div class="updateAvatarUrl" v-if="updateAvatarUrl">
    <van-loading color="#0094ff" size="10">头像更新中...</van-loading>
  </div>
</template>


<script setup lang="ts">
import {useRouter} from "vue-router";
import {showFailToast, showNotify, showSuccessToast} from "vant";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../api/user.ts";
import {formatDateString} from "../plugins/DateFormat.ts";
import {UserType} from "../models/user";
import {genderMap} from "../models/userMap.ts";
import myAxios from "../plugins/myAxios.ts";
import getCurrent from "../services/currentUser.ts";

const defaultPicture = 'https://qianye-space.oss-cn-hangzhou.aliyuncs.com/boy20240304.png';
const router = useRouter();

const user = ref<UserType>();

const updateAvatarUrl = ref(false)

const afterRead = async (file: any) => {
  updateAvatarUrl.value = true
  if (updateAvatarUrl.value) {
    const fileFile = file.file
    const res = await myAxios.post("/file/upload", {
      'file': fileFile,
    }, {
      headers: {'Content-Type': 'multipart/form-data'},
    })
    const updateUserAvatarUrl = await myAxios.post("/user/update", {
      id: user.value.id,
      avatarUrl: res.data
    })
    if (updateUserAvatarUrl) {
      user.value = await getCurrent();
      showSuccessToast("更新成功")
      setTimeout(() => {
        updateAvatarUrl.value = false
      }, 1000);
    }
  }
}



const tagUpdate = (tags: string, id: number) => {
  router.push({
    path: "/search",
    query: {
      id: id,
      tags: JSON.parse(tags),
    }
  })
}

const show_UserAvatarUrl_pop = ref("true")
onMounted(async () => {
  const res = await getCurrentUser();
  // if (res.code === 20000){
  //   user.value = res.data;
  //   showSuccessToast('获取用户信息成功');
  if (res) {
    user.value = res;
    // showSuccessToast('获取用户信息成功');
    const show_updateUserAvatarUrl = sessionStorage.getItem("userAvatarUrl")
    show_UserAvatarUrl_pop.value = show_updateUserAvatarUrl ? show_updateUserAvatarUrl : show_UserAvatarUrl_pop.value
    user.value.createTime = formatDateString(user.value.createTime, 'yyyy-MM-dd HH:mm:ss');
    if (show_UserAvatarUrl_pop.value === "true") {
      showNotify({message: '点击头像可更换默认头像', type: "primary", duration: 2000});
      show_UserAvatarUrl_pop.value = "false"
      sessionStorage.setItem('userAvatarUrl', show_UserAvatarUrl_pop.value)
    }
  } else {
    showFailToast('登录过期')
  }
})

//修改信息方法
const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}

const update = (val: string, name: string, field: string) => {
  router.push({
    path: "/user/edit",
    query: {
      title: name,
      value: val,
      field: field,
      id: user.value.id
    }
  })
}

const loginOut = async () => {
  const loginOut = await myAxios.post("/user/logout", {})
  sessionStorage.clear()
  if (loginOut) {
    showSuccessToast("退出成功")
    router.replace("/user/login").catch(e => console.log(e))
  }
}

const onOversize = () => {
  showFailToast("头像上传大小不能超过500kb")
}

const toMore = () => {
  router.push("/user/more")
}
</script>
<style scoped>
@import "../assets/css/userPage.css";
@import "../assets/css/public.css";

.updateAvatarUrl {
  position: fixed;
  top: 30%;
  left: 37%;
}
</style>