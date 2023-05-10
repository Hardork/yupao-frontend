<template>
    <van-skeleton title avatar :row="3" :loading="props.loading" v-for="user in props.userList">
        <van-card
                :desc="user.profile"
                :title="`${user.username}（${user.planetCode}）`"
                :thumb="user.avatarUrl"
        >
            <template #tags>
                <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px">
                    {{ tag }}
                </van-tag>
            </template>
            <template #footer>
                <van-button size="mini" @click="contactUser(user)">联系我</van-button>
            </template>
        </van-card>
    </van-skeleton>
</template>

<script setup lang="ts">
import {UserType} from "../models/user";
import {useRouter} from "vue-router";

const router = useRouter();

interface UserCardListProps {
    loading: boolean;
    userList: UserType[];
}

const props = withDefaults(defineProps<UserCardListProps>(), {
    // @ts-ignore
    loading: true,
    // @ts-ignore
    userList: [] as UserType[],
});


const contactUser = (user) => {
    console.log(user.avatarUrl)
    router.push({
        path: '/user/info',
        query: {
            avatarUrl: user.avatarUrl,
            profile: user.profile,
            username: user.username,
            phone: user.phone,
            email: user.email
        }
    })
}

</script>

<style scoped>

</style>
