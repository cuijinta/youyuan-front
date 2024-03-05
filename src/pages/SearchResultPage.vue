<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入要搜索的标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">已选标签</van-divider>
  <div v-if="activeIds.length === 0">请选择标签</div>
  <van-row gutter="16">
    <van-col v-for="tag in activeIds">
      <van-tag closeable size="small" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>
  <van-divider :style="{ color: '#fa2119', borderColor: '#fa2119', padding: '0 16px' }">
    为你推荐
  </van-divider>
  <van-tag :show="show" closeable size="medium" type="primary">
    标签
  </van-tag>

  <van-tree-select v-model:active-id="activeIds" v-model:main-active-index="activeIndex" :items="tagList"/>
</template>

<script setup>
import {ref} from 'vue';

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

const searchText = ref('');
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
const onCancel = () => {
  searchText.value = ''; //清空内容
  activeIds.value = [];
  tagList.value = originTagList;
};

//已选中的标签
const activeIds = ref([]);
const activeIndex = ref(0);
//标签列表


// 移除标签
const doClose = (tag) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag;
  })
}
</script>

<style>

</style>