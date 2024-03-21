<template>
  <div id="teamPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.name"
            name="name"
            label="队伍名"
            placeholder="请输入队伍名"
            :rules="[{ required: true, message: '请输入队伍名' }]"
        />
        <van-field
            v-model="addTeamData.description"
            rows="4"
            autosize
            label="队伍描述"
            type="textarea"
            placeholder="请输入队伍描述"
        />
        <van-field
            is-link
            readonly
            name="datetimePicker"
            label="过期时间"
            :placeholder="addTeamData.expireTime ?? '点击选择过期时间'"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
<!--          <van-datetime-picker-->
<!--              v-model="addTeamData.expireTime"-->
<!--              @confirm="showPicker = false"-->
<!--              type="datetime"-->
<!--              title="请选择过期时间"-->
<!--              :min-date="minDate"-->
<!--          />-->
          <van-picker-group
              title="预约日期"
              :tabs="['选择日期', '选择时间']"
              @confirm="onConfirm"

          >
            <van-date-picker
                v-model="currentDate"
                :min-date="minDate"

            />
            <van-time-picker v-model="currentTime" />
          </van-picker-group>


        </van-popup>
        <van-field name="stepper" label="最大人数">
          <template #input>
            <van-stepper v-model="addTeamData.maxNum" max="10" min="3"/>
          </template>
        </van-field>
        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
            v-if="Number(addTeamData.status) === 2"
            v-model="addTeamData.password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入队伍密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter();

const initFormData = {

  "name": "",
  "description": "",
  "expireTime": "",
  "maxNum": 0,
  "password": "",
  "status": 0,
  "userId": 0
}
const addTeamData = ref({...initFormData});

// 展示日期选择器
const showPicker = ref(false);
const minDate = new Date();
const startDate = ref(['2022', '06', '01']);
const currentDate = ref(['2022', '06', '01']);
const currentTime = ref(['12', '00']);
const onConfirm = () => {
  const end=startDate.value.concat(currentTime.value)
  let aaa=''
  end.map(item=>{
    aaa+=item
  })

  console.log(startDate.value.concat(currentTime.value))

  // showToast(`${startDate.value.join('/')} ${endDate.value.join('/')}`);
};
//提交
const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status)
  }
  //todo 前端数据校验
  const res = await myAxios.post("/team/add",postData);
  if (res?.code === 20000 && res.data){
    showSuccessToast("添加成功");
    router.push({
      path:'/team',
      replace:true,
    });
  }else {
    showFailToast("添加失败")
  }
}
</script>

<style scoped>

</style>