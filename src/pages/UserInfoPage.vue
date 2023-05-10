<template>
    <div class="cover">
        <van-image
            round
            width="4rem"
            height="4rem"
            :src="user.avatarUrl"
        />
        <p>{{user.username}}</p>
    </div>
    <van-cell title="电话" :value="user.phone" />
    <van-cell title="邮件" :value="user.email" />
    <van-cell title="个人描述" :value="user.profile" />
</template>

<script setup>
import {useRoute} from "vue-router";


const route = useRoute();

const user = {
    avatarUrl: route.query.avatarUrl,
    username: route.query.username,
    profile: route.query.profile,
    email: route.query.email,
    phone: route.query.phone,
};
console.log(user.avatarUrl)
</script>

<style scoped>
.cover{
    background-color: #304352;
    padding-top: 30px;
    color: white;
    text-align: center;
    width: 100%;
}
</style>