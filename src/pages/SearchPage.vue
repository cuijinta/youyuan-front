<template>
  <form action="/">
    <van-search
        v-model="searchText"
        shape="round"
        background="#81c995"
        show-action
        placeholder="请输入想搜索的标签"
        @search="onSearch"
        @cancel="onCancel"/>
  </form>
  <van-divider :style="{ color: '#81c995', borderColor: '#81c995', padding: '0 16px' }">已选标签</van-divider>
  <div v-if="activeIds.length === 0">选择要搜索的标签</div>
  <van-row gutter="16">
    <van-col v-for="tag in activeIds">
      <van-tag closeable size="small" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>
  <van-divider :style="{ color: '#ee675c', borderColor: '#ee675c', padding: '0 16px' }">
    为你推荐
  </van-divider>
  <van-tag color="#996ac7" :show="activeIds.length === 0" closeable size="medium" type="primary">
    标签列表
  </van-tag>
  <van-tree-select v-model:active-id="activeIds" v-model:main-active-index="activeIndex" :items="tagList"/>
  <van-button round color="#81c995" size="large" loading-text="搜索中" type="success" @click="doSearchResult">搜有缘人
  </van-button>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from "vue-router";

const router = useRouter()

const searchText = ref('');

const originTagList = [{
  text: '性别',
  children: [
    {text: '男', id: '男'},
    {text: '女', id: '女'},
  ],
},
  {
    text: '年纪',
    children: [
      {text: '大一', id: '大一'},
      {text: '大二', id: '大二'},
      {text: '大三', id: '大三'},
      {text: '大四', id: '大四'},
      {text: '大', id: '大五'},
      {text: '大四', id: '大6'},
      {text: '大四', id: '大7'},
      {text: '大四', id: '大8'},
      {text: '大四', id: '大9'},
    ],
  },
]

let tagList = ref(originTagList);


//标签列表
const onSearch = (val) => {
  tagList.value = originTagList
      .map(parentTag => {
        const tempChildren = [...parentTag.children];
        const tempParentTag = {...parentTag};
        tempParentTag.children = tempChildren
            .filter(item => item.text.includes(searchText.value))
        return tempParentTag;
      });
}
//清空内容
const onCancel = () => {
  searchText.value = '';
  activeIds.value = [];
  tagList.value = originTagList;
};

//已选中的标签
const activeIds = ref([]);
const activeIndex = ref(0);

// 移除标签
const doClose = (tag) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag;
  })
}

//执行搜索
const doSearchResult = () => {
  router.push({
    path:'/user/list',
    query:{
      tags: activeIds.value
    }
  })
}
</script>

<style>

</style>