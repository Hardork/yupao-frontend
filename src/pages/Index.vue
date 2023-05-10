<template>
    <van-cell center title="心动模式">
        <template #right-icon>
            <van-switch v-model="isMatchMode" size="24" />
        </template>
    </van-cell>
    <UserCardList :user-list="userList" :loading="loading"></UserCardList>
  <van-empty v-if="!userList || userList.length < 1" description="数据为空"></van-empty>
</template>

<script setup>
import {onMounted, ref, watchEffect} from 'vue';
import myAxios from "../plugings/myAxios.ts";
import UserCardList from "../components/UserCardList.vue";
import {Toast} from "vant";

//加载
const loading = ref(true);
//用户信息
const userList = ref([])
//是否开启推荐用户模式
const isMatchMode = ref(false);

const loadData =  (async () => {
    let userListData;
    loading.value = true;
    if(isMatchMode.value){//心动模式
        console.log('我来喽')
        const num = 4;
        userListData = await myAxios.get('/user/match',{
            params: {
                num,
            }
        }).then(function (response){
            console.log('/user/match succeed', response);
            return response?.data;
        }).catch(function (error){
            console.error('/user/match error', error);
            Toast.fail('请求失败');
        })
    }else{
        userListData = await myAxios.get('/user/recommend', {
                params: {
                    pageSize: 10,
                    pageNum: 1
                },
            }
        )
            .then(function (response) {
                // 处理成功情况
                console.log('/user/recommend success', response.data.records);
                return response?.data?.records;
            })
            .catch(function (error) {
                // 处理错误情况
                console.log('/user/recommend error', error);
                Toast.fail('请求失败');
            });
    }
    if(userListData){
        userListData.forEach(user => {
            if(user.tags){
                user.tags = JSON.parse(user.tags);
                console.log(user.tags)
            }
        })
        userList.value = userListData;
        console.log(userList.value)
    }
    loading.value = false;
})


watchEffect(() => {
    loadData();
})

</script>

<style scoped>

</style>