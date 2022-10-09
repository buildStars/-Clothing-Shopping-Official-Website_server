<template>
	<div id="home">
		<el-row>
			<el-col :span="24">
				<el-menu :default-active="active" class="el-menu-demo" mode="horizontal" :background-color="bgColor" router
					text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
					<div class="logo">
						<div class="logo-box">
							<div class="logo-img"><img class="auto-img" src="@/assets/logo.png" alt=""></div> 问你客栈
						</div>
					</div>
					<el-sub-menu index="bg">
						<template #title>切换主题</template>
						<el-menu-item @click.capture="bgColor = '#545c64'">黑色</el-menu-item>
						<el-menu-item @click.capture="bgColor = '#095bac'">蓝色</el-menu-item>
						<el-menu-item @click.capture="bgColor = '#8d5439'">棕色</el-menu-item>
						<el-menu-item @click.capture="bgColor = '#d67086'">粉色</el-menu-item>

					</el-sub-menu>
					<el-sub-menu index="order">
						<template #title>我的账户</template>
						<el-menu-item index="/home/self">个人信息</el-menu-item>
						<el-menu-item index="/home/modifyPwd">修改密码</el-menu-item>
						<el-menu-item index="/login" @click="logout">退出登录</el-menu-item>

					</el-sub-menu>
					<el-menu-item>
						<div class="menu-img-box">
							<div class="welcome one-line-text">
								{{selfMsg.name}}
							</div>
							<div class="img-box">
								<img class="auto-img" :src="selfMsg.user_image=='' ? '':baseHost+selfMsg.user_image" alt="">
							</div>
						</div>
					</el-menu-item>
				</el-menu>
			</el-col>
		</el-row>

		<div class="main">

			<div class="aside-menu" :style="{backgroundColor:bgColor}">
				<el-menu active-text-color="#ffd04b" :background-color="bgColor" class="el-menu-vertical-demo"
					:default-active="active" text-color="#fff" @open="handleOpen" @close="handleClose" router>
					<el-menu-item index="/home/index">

						<span>首页</span>
					</el-menu-item>
					<el-sub-menu index="/home/account">
						<template #title>

							<span>管理员管理</span>
						</template>
						<el-menu-item-group title="">
							<el-menu-item index="/home/account">所有管理员</el-menu-item>
						</el-menu-item-group>
					</el-sub-menu>
					<el-menu-item index="/home/homeType">

						<span>房型管理</span>
					</el-menu-item>
					<el-menu-item index="/home/room" :disabled="selfMsg.role_room == 1 ? false:true">
						<span>客房管理</span>
					</el-menu-item>
					<el-menu-item index="/home/client" :disabled="selfMsg.role_client == 1 ? false:true">
						<span>住户管理</span>
					</el-menu-item>
					<el-menu-item index="/home/order" :disabled="selfMsg.role_order == 1 ? false:true">
						<span>账单管理</span>
					</el-menu-item>
					<el-menu-item index="/home/role" :disabled="selfMsg.role_power == 1 ? false:true ">
						<span>权限管理</span>
					</el-menu-item>
				</el-menu>
			</div>
			<div class="main-content-box">
				<router-view />
			</div>

		</div>
	</div>
</template>

<script lang="ts" setup>
import storage from "@/utils/localStorage";
import { computed, defineComponent, onMounted } from "vue";
import axios from "axios";
import { useManagerStore } from "@/store/manager";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { host, port } from "@/config/host.js";
import { ElMessage, ElMessageBox } from "element-plus";
const router = useRouter();
const managerStore = useManagerStore();
const baseHost = ref(host + ":" + port);

//主题颜色
const bgColor = ref("#545c64");

const handleSelect = (key: string, keyPath: string[]) => {
	console.log(key, keyPath);
};
const handleOpen = (key: string, keyPath: string[]) => {
	console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
	console.log(key, keyPath);
};

const logout = () => {
	storage.removeLocal("my-hotel-2022-10-4-token");
	router.push("/login");
};
const token = computed(() => {
	return managerStore.token;
});
const selfMsg: any = computed(() => {
	return managerStore.selfMsg;
});
const active = computed(() => {
	return router.currentRoute.value.fullPath;
});
onMounted(() => {
	console.log(router.currentRoute.value.fullPath);

	managerStore.getAccount({ token: token.value });
});
</script>

<style lang="less">
#home {
	.main {
		width: 100%;
		min-width: 375px;
		display: flex;
		max-height: calc(100vh - 60px);
	}

	.logo-box {
		display: flex;
		align-items: center;
		.logo-img {
			width: 40px;
			height: 40px;
			margin-right: 10px;
		}
	}

	.sub-nav {
		display: none;
		position: absolute;
		left: 120px;
		height: 100%;
		font-size: 24px;
		font-weight: 700;
		color: white;
	}

	.aside-menu {
		width: 200px;

		height: calc(100vh - 60px);
		max-height: calc(100vh - 60px);
		overflow: auto;
	}
	.aside-menu-bg-black {
		background-color: #545c64;
	}
	.main-content-box {
		max-height: calc(100vh - 60px);
		flex: 1;
		overflow: auto;
	}
}
.el-menu--horizontal {
	position: relative;
	justify-content: end;

	.logo {
		position: absolute;
		left: 20px;
		font-size: 24px;
		font-weight: 700;
		color: white;
		height: 60px;
		line-height: 60px;
	}
}

.el-menu--horizontal .menu-img-box {
	display: flex;
	align-items: center;

	.welcome {
		max-width: 80px;
	}

	.img-box {
		display: flex;
		align-items: center;
		width: 40px;
		height: 40px;
		background-color: gray;
		margin-left: 10px;
		border-radius: 50%;
		overflow: hidden;
	}
}
</style>