<template>
  <div
      id="teamCardList"
  >
    <van-card
        v-for="team in props.teamList"
        :thumb="team.teamAvatarUrl ? team.teamAvatarUrl : defaultTeamPicture"
        :desc="team.description"
        :title="`${team.name}`"
        @click="showTeam(team.id)"
    >
      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
          {{teamStatusEnum[team.status]}}
        </van-tag>
        <van-tag plain style="color: #756bf5;margin-right: 8px; margin-top: 8px" type="primary">
          队长：{{ team.user.username }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          <div>队伍人数:  {{ team.userSet.length}} / {{team.maxNum}} 人
            <van-circle id="circle"
              :current-rate="(team.hasJoinNum / team.maxNum * 100).toFixed(1)"
              :stroke-width="200"
              size="22px"
          />
          </div>
          <van-progress :percentage="(team.hasJoinNum / team.maxNum * 100).toFixed(1)" color="#f2826a" pivot-text="" />
        </div>
        <div>
          {{ '过期时间 :  ' + format(team.expireTime, 'yyyy-MM-dd HH:mm:ss').toString() }}
        </div>
        <div>
          {{ '创建时间 : ' + format(team.createTime, 'yyyy-MM-dd HH:mm:ss').toString() }}
        </div>
      </template>
      <template #footer>
        <div
            v-if="currentUser?.id===team.user?.id ||currentUser.userRole===1"
            style="margin-left: 7px">
        <span v-for="user of team.userSet.slice(0, 5)">
          <img :alt="user.username" :src="user.avatarUrl ? user.avatarUrl : defaultPicture"
               class="usersImgUrl">
        </span>
          <span v-if="team.userSet.length>5" class="omit">
               ...
          </span>
        </div>
        <van-button size="small" type="primary" v-if="team.userId !== currentUser?.id && !team.hasJoin" plain
                    @click="preJoinTeam(team)">加入队伍
        </van-button>
        <van-button v-if="team.userId === currentUser?.id" size="small" plain
                    @click="doUpdateTeam(team.id)">更新队伍
        </van-button>
        <!-- 仅加入队伍可见 -->
        <van-button v-if="team.userId !== currentUser?.id && team.hasJoin" size="small" plain
                    @click="doQuitTeam(team.id)">退出队伍
        </van-button>
        <van-button v-if="team.userId === currentUser?.id" size="small" type="danger" plain
                    @click="doDeleteTeam(team.id)">解散队伍
        </van-button>
      </template>
    </van-card>
    <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam"
                @cancel="doJoinCancel">
      <van-field v-model="password" placeholder="请输入密码"/>
    </van-dialog>
  </div>

</template>

<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";
import {useRouter} from "vue-router";
import {format} from "date-fns";
import {defaultPicture, defaultTeamPicture} from "../common/userCommon.ts";

interface TeamCardListProps {
  teamList: TeamType[];
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  // @ts-ignore
  teamList: [] as TeamType[],
});

const showPasswordDialog = ref(false);
const password = ref('');
const joinTeamId = ref(0);
const currentUser = ref();

const router = useRouter();

onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

const preJoinTeam = (team: TeamType) => {
  joinTeamId.value = team.id;
  if (team.status === 0) {
    doJoinTeam()
  } else {
    showPasswordDialog.value = true;
  }
}

const doJoinCancel = () => {
  joinTeamId.value = 0;
  password.value = '';
}

/**
 * 加入队伍
 */
const doJoinTeam = async () => {
  if (!joinTeamId.value) {
    return;
  }
  const res = await myAxios.post('/team/join', {
    teamId: joinTeamId.value,
    password: password.value
  });
  if (res?.code === 20000) {
    showSuccessToast('加入成功');
    doJoinCancel();
    router.go(0);
  } else {
    showFailToast('加入失败' + (res.description ? `，${res.description}` : ''));
  }
}

/**
 * 跳转至更新队伍页
 * @param id
 */
const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  })
}

/**
 * 退出队伍
 * @param id
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post('/team/quit', {
    teamId: id
  });
  if (res?.code === 20000) {
    showSuccessToast('退出成功');
    router.go(0);
  } else {
    showFailToast('操作失败' + (res.description ? `，${res.description}` : ''));
  }
}

/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post('/team/delete', {
    id,
  });
  if (res?.code === 20000) {
    showSuccessToast('操作成功');
    router.go(0);
  } else {
    showFailToast('操作失败' + (res.description ? `，${res.description}` : ''));
  }
}

const showTeam = (id: number) => {
  router.push({
    path: '/team/show',
    query: {
      teamId: id
    }
  })
}

</script>

<style scoped>
@import "../assets/css/teamList.css";
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}
</style>
