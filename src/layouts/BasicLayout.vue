<template>
  <van-nav-bar v-if="!NOT_SHOW_NAVBAR_AND_TABBAR.includes(route.path)"
                left-text="返回"
      :title="title"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template v-if="route.path ==='/friends'|| !SHOW_SEARCH.includes(route.path)" #right>
      <van-badge :content="applyFriendsCount" v-if="applyFriendsCount>0">
        <notice/>
      </van-badge>
      <notice v-else/>
    </template>
    <template v-else #right>
      <van-icon name="search" size="22"/>
      <span style="color: rgb(25,137,250)">标签</span>
    </template>

  </van-nav-bar>


  <div id="content">
    <router-view/>
  </div>

  <van-tabbar v-model="active" v-if="!NOT_SHOW_NAVBAR_AND_TABBAR.includes(route.path)" @change="onChange"  route>
    <van-tabbar-item to="/" icon="wap-home" name="index">主页</van-tabbar-item>
    <van-tabbar-item icon="contact" name="friends" :badge="applyFriendsCount<=0?null:applyFriendsCount" replace to="/friends">联系人</van-tabbar-item>
    <van-tabbar-item icon="chat" name="chat" replace to="/public_chat">聊天厅</van-tabbar-item>
    <van-tabbar-item to="/team" icon="friends" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="manager" name="user">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import Notice from "../common/icon/Notice.vue";
import myAxios from "../plugins/myAxios";
import qs from "qs";

const title = ref('');
const router = useRouter();
const route = useRoute();
const applyFriendsCount = ref(0)
const recordId = ref([])

watch(route, () => {
  if (route.meta.title) {
    // console.log(route.meta.title)
    title.value = route.meta.title;
  }
}, { immediate: true }); // immediate: true 表示立即执行一次 watch 函数
//监听点击事件与路由冲突
// const onChange = (index) => {
//   Toast(`标签 ${index}`);
// }

const NOT_SHOW_NAVBAR_AND_TABBAR = ["/user/login", '/user/register']
const SHOW_SEARCH = ["/", '/team', '/public_chat',  '/apply']
const onClickLeft = () => {
  router.back();
};

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  if (code){
    const data = await myAxios.post("/login/loginInfo", {
      code: code
    })
  }
  if (route.path!=="/"){
    applyFriendsCount.value = await onChange()
    await getRecord()
  }
})
const active = ref('name');
const onChange = async () => {
  if (active.value === "friends") {
    await getRecord()
  }
  const resCount = await myAxios.get("/friends/getRecordCount")
  return applyFriendsCount.value = resCount.data
}

const getRecord =async () => {
  const res = await myAxios.get("/friends/getRecords")
  const records = res.data;
  records.forEach(record => {
    if (record.status == 0) {
      recordId.value.push(record.id)
    }
  })
}

const onClickRight = async () => {
  if (!SHOW_SEARCH.includes(route.path)) {
    const res = await myAxios.get("/friends/read", {
      params: {
        ids: recordId.value
      }, paramsSerializer: {
        serialize: (params) => {
          return qs.stringify(params, {indices: false})
        }
      }
    })
    const read = res.data
    if (read) {
      recordId.value.length = 0
      applyFriendsCount.value = 0
    }
    await router.push("/apply")
  } else {
    await router.push("/search")
  }
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