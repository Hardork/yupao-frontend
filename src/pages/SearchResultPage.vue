<template>
    <UserCardList :user-list="userList" :loading="loading"></UserCardList>
    <van-empty v-if="!userList || userList.length < 1" description="数据为空"></van-empty>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import { useRoute} from "vue-router";
import myAxios from "../plugings/myAxios.ts";
import qs from 'qs';
import UserCardList from "../components/UserCardList.vue";
import {Toast} from "vant";

const route = useRoute()
//标签
const { tags } = route.query;
//用户信息
const userList = ref([])
const loading = ref(true);

onMounted(async () => {
    Toast.loading({
        type: 'loading',
        duration: 0,
        message: '加载中...',
        forbidClick: true,
    });

    const userListData = await myAxios.get('/user/search/tags', {
            params: {
                tagNameList: tags
            },
            paramsSerializer: params => {
                return qs.stringify(params, {indices: false})
            }
        }
    )
        .then(function (response) {
            // 处理成功情况
            console.log('/user/search/tags success', response);
            return response?.data;
        })
        .catch(function (error) {
            // 处理错误情况
            console.log('/user/search/tags error', error);
        });
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
    Toast.clear();
})

//搜索用户列表 假数据
// const mockUser = {
//     id: 1,
//     username: '鱼皮',
//     userAccount: 'dogYupi',
//     avatarUrl: 'https://636f-codenav-8grj8px727565176-1256524210.tcb.qcloud.la/img/logo.png',
//     profile: '猛男',
//     gender: '男',
//     phone: '123112312',
//     email: '12345@qq.com',
//     planetCode: '1234',
//     createTime: new Date(),
//     tags: ['java', 'c++', 'python', '打工人']
// }

</script>

<style scoped>

</style>