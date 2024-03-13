<template>
<!--  <van-skeleton title avatar :row="3" :loading="props.loading" v-for="user in props.userList">-->
  <van-card
      v-for="user in userList"
      :tag="user.gender === 0 ? '♂' : user.gender === 1 ? '♀' : '未知'"
      :desc="user.profile"
      :title="user.username"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag v-for="tag in user.tags" plain type="danger" style="margin-right: 8px; margin-top: 8px; color: #996ac7">
        {{ tag }}
      </van-tag>

    </template>
    <template #footer>
      <van-button size="normal">联系我</van-button>
    </template>
  </van-card>
<!--  </van-skeleton>-->
</template>

<script setup lang="ts">
import {UserType} from "../models/user";

interface UserCardListProps {
  // loading: boolean;
  userList: UserType[];
}

const props = withDefaults(defineProps<UserCardListProps>(), {
  // loading: true,
  // @ts-ignore
  userList: [] as UserType[],
});

</script>

<style scoped>

:root {
  --van-grey: rgba(71, 73, 71, 0.85);
  --van-card-background: var(--van-grey);
}

</style>
