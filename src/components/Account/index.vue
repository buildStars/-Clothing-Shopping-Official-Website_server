<template>
	<div id="account">
		<el-table :data="tableData" height="500" style="width: 100%">
			<el-table-column prop="name" label="昵称" />
			<el-table-column prop="sex" label="性别" />
			<el-table-column label="头像" prop="user_image">
				<template #default="scope">
					<div class="img-box">
						<img class="auto-img" :src="scope.row.user_image =='' ? '':baseHost+scope.row.user_image" alt="">
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="phone" label="手机" />
			<el-table-column prop="creatAt" label="创建时间" />
			<el-table-column prop="role" label="身份" />
		</el-table>
	</div>
</template>

<script lang="ts" setup>
import { computed, defineComponent, ref, reactive, onMounted } from "vue";
import { useManagerStore } from "@/store/manager";
import { host, port } from "@/config/host.js";

import axios from "axios";
import { ElMessage } from "element-plus";

const managerStore = useManagerStore();
const baseHost = ref(host + ":" + port);

const token = computed(() => {
	return managerStore.token;
});

const tableData = computed(() => {
	let res: any = managerStore.allAccount;
	res.forEach((item: any) => {
		item.role = item.role_power == 1 ? "超级管理员" : "普通管理员";
	});

	return res;
});

onMounted(() => {
	managerStore.getAllAccount({
		token: token.value,
	});
});
</script>

<style lang="less">
#account {
	display: flex;
	flex-direction: column;
	align-items: center;
	min-width: 315px;
	margin: 40px 30px;
	padding: 40px;
	background-color: #fff;
	border-radius: 30px;

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
	.super {
		color: red;
	}
}
</style>