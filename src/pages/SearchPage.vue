<template>
  <form action="/">
    <van-search
        v-model="newTagSearch"
        shape="round"
        background="#81c995"
        show-action
        placeholder="请输入想搜索的标签"
        @search="onSearch"
        @cancel="onCancel"/>
  </form>
  <div id="tage" :class="{ 'has-border': existedTagSearchList.length > 0 }">
    <div v-if="existedTagSearchList.length<=0">
      <van-empty :image-size="[35, 20]" description="未选择标签"/>
    </div>
    <div v-else class="span_tag">
      <span v-for="tage in existedTagSearchList">
    <van-tag :show="show" class="van_tag" closeable size="large" type="primary"
             @close="close(tage)">{{ tage }}</van-tag>
    </span>
    </div>
  </div>

<!--  <van-divider :style="{ color: '#81c995', borderColor: '#81c995', padding: '0 16px' }">已选标签</van-divider>-->
<!--  <div v-if="activeIds.length === 0">选择要搜索的标签</div>-->
<!--  <van-row gutter="16">-->
<!--    <van-col v-for="tag in activeIds">-->
<!--      <van-tag closeable size="small" type="primary" @close="doClose(tag)">-->
<!--        {{ tag }}-->
<!--      </van-tag>-->
<!--    </van-col>-->
<!--  </van-row>-->
<!--  <van-divider :style="{ color: '#ee675c', borderColor: '#ee675c', padding: '0 16px' }">-->
<!--    为你推荐-->
<!--  </van-divider>-->
<!--  <van-tag color="#996ac7" :show="activeIds.length === 0" closeable size="medium" type="primary">-->
<!--    标签列表-->
<!--  </van-tag>-->
<!--  <van-tree-select v-model:active-id="activeIds" v-model:main-active-index="activeIndex" :items="tagList"/>-->
<!--  <van-button round color="#81c995" size="large" loading-text="搜索中" type="success" @click="doSearchResult">搜有缘人</van-button>-->
  <van-tree-select
      v-model:active-id="existedTagSearchList"
      v-model:main-active-index="activeIndex"
      :items="userTagsList"
  />
  <van-divider/>
  <van-space direction="vertical" fill>
    <van-button v-if="userId" block type="primary" @click="updateTag">修改
    </van-button>
    <van-button block v-else type="primary" @click="doSearchResult">搜索</van-button>
  </van-space>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue';
import {useRoute, useRouter} from "vue-router";
import userTagsList from "../constants/UserTagsList.ts";
import {showFailToast, showSuccessToast} from "vant";
import myAxios from "../plugins/myAxios.ts";
import getCurrent from "../services/currentUser.ts";

const router = useRouter();
const route = useRoute();
const existedTagSearchList = ref([]);
const activeIndex = ref(0);
const newTagSearch = ref('');
const show = ref(true);
const userId = ref();
const userTags = ref([]);

// const originTagList = [{
//   text: '性别',
//   children: [
//     {text: '男', id: '男'},
//     {text: '女', id: '女'},
//   ],
// },
//   {
//     text: '年纪',
//     children: [
//       {text: '大一', id: '大一'},
//       {text: '大二', id: '大二'},
//       {text: '大三', id: '大三'},
//       {text: '大四', id: '大四'},
//       {text: '大', id: '大五'},
//       {text: '大四', id: '大6'},
//       {text: '大四', id: '大7'},
//       {text: '大四', id: '大8'},
//       {text: '大四', id: '大9'},
//     ],
//   },
// ]
//
// let tagList = ref(originTagList);


//标签列表
// const onSearch = (val) => {
//   tagList.value = originTagList
//       .map(parentTag => {
//         const tempChildren = [...parentTag.children];
//         const tempParentTag = {...parentTag};
//         tempParentTag.children = tempChildren
//             .filter(item => item.text.includes(searchText.value))
//         return tempParentTag;
//       });
// }
const onSearch = () => {
  const newTagUpperCase = newTagSearch.value.charAt(0).toUpperCase() + newTagSearch.value.slice(1)
  const existedTagSearchListUpperCase = existedTagSearchList.value.map(tag => tag.charAt(0).toUpperCase() + tag.slice(1));
  if (toUpperCaseTags.includes(newTagUpperCase) && !existedTagSearchListUpperCase.includes(newTagUpperCase)) {
    existedTagSearchList.value.push(newTagUpperCase)
  } else if (existedTagSearchListUpperCase.includes(newTagUpperCase)) {
    showSuccessToast("该标签已选择")
  } else {
    showSuccessToast("不存在该标签")
  }
}
const close = (tag) => {
  existedTagSearchList.value = existedTagSearchList.value.filter((tage) => tage !== tag);
};

//清空内容
const onCancel = () => {
  // searchText.value = '';
  // activeIds.value = [];
  // tagList.value = originTagList;
  existedTagSearchList.value = []
};

const updateTag = async () => {
  const res = await myAxios.post("/user/update/tags", {
    id: userId.value,
    tagList: existedTagSearchList.value
  })
  const update = res.data
  if (update && update >= 1) {
    showSuccessToast("修改成功")
    await router.push("/user")
  }
}

onMounted(() => {
  const {id, tags} = route.query
  if (id && tags) {
    userId.value = id;
    userTags.value = tags
    existedTagSearchList.value = tags
  }
  getCurrent()
})
watch(existedTagSearchList, (newList) => {
  if (newList.length > 12) {
    showFailToast("最多只能选择12个标签")
    existedTagSearchList.value = existedTagSearchList.value.slice(0, 12)
  }
});

//已选中的标签
// const activeIds = ref([]);

// 移除标签
// const doClose = (tag) => {
//   activeIds.value = activeIds.value.filter(item => {
//     return item !== tag;
//   })
// }

//执行搜索
const doSearchResult = () => {
  router.push({
    path:'/user/list',
    query:{
      tags: existedTagSearchList.value
    }
  })
}
</script>

<style>

</style>