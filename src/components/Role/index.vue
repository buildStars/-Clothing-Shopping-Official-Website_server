<template>
	<div id="client">
		<div class="room-filter">

			<div class="filter-text">
				手机：
			</div>
			<div class="code-box">
				<el-input v-model="phone" size="default" />
			</div>

		</div>
		<div class="client-box">
			<el-table :data="allAccounts" style="width: 100%">
				<el-table-column prop="name" label="姓名" />
				<el-table-column prop="sex" label="性别" />
				<el-table-column label="头像" prop="user_image">
					<template #default="scope">
						<div class="img-box">
							<img class="auto-img" :src="scope.row.user_image == '' ? '':baseHost+scope.row.user_image" alt="">
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="personal_code" label="身份证" />
				<el-table-column prop="phone" label="电话" />
				<el-table-column fixed="right" label="操作" width="120">
					<template #default="scope2">
						<el-button link type="primary" size="small" @click.prevent="editRole(scope2.$index)">
							权限
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-drawer :open-delay="0" v-model="drawerShow" @close="isCheck = false" title="修改权限" direction="rtl" size="40%">
			<div class="edit-inner">
				<div class="role-item">
					房间权限：
					<el-switch v-model="nowManager.role_room" class="ml-2"
						style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
				</div>
				<div class="role-item">
					住户权限：
					<el-switch v-model="nowManager.role_client" class="ml-2"
						style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
				</div>
				<div class="role-item">
					账单权限：
					<el-switch v-model="nowManager.role_order" class="ml-2"
						style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
				</div>
				<div class="role-item">
					系统管理员权限：
					<el-switch v-model="nowManager.role_power" class="ml-2"
						style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
				</div>
				<el-button type="primary" @click="submitForm()" :disabled="isCheck">修改</el-button>

			</div>
		</el-drawer>
	</div>
</template>

<script lang="ts" setup>
import { computed, defineComponent, ref, reactive, onMounted } from "vue";
import { useManagerStore } from "@/store/manager";
import { useHomeTypeStore } from "@/store/HomeType";
import { useRoomStore } from "@/store/Room";
import { useClientStore } from "@/store/Client";
import { useOrderStore } from "@/store/Order";
import { host, port } from "@/config/host.js";

import { Plus } from "@element-plus/icons-vue";
import type { FormInstance, UploadProps } from "element-plus";
import { ElMessage } from "element-plus";
import { constant } from "lodash";
import { ru } from "element-plus/es/locale";
import { is } from "@babel/types";

const ruleFormRef = ref<FormInstance>();
const managerStore = useManagerStore();

const isCheck = ref(false);
const phone = ref("");
const filter = ref(false);
const drawerShow = ref(false);
const baseHost = ref(host + ":" + port);
const nowManager: any = reactive({});

const token = computed(() => {
	return managerStore.token;
});
const selfMsg: any = computed(() => {
	return managerStore.selfMsg;
});
const allAccounts: any = computed(() => {
	let allAccount2 = managerStore.allAccount.filter((item: any) => {
		return item.role_power == 0;
	});
	if (phone.value.length > 0) {
		return allAccount2.filter((item: any) => {
			return item.phone == phone.value;
		});
	} else {
		return allAccount2;
	}
});

onMounted(() => {
	managerStore.getAllAccount({
		token: token.value,
	});
});
const editRole = (id: any) => {
	drawerShow.value = true;
	nowManager.role_room = allAccounts.value[id].role_room == 1 ? true : false;
	nowManager.role_client =
		allAccounts.value[id].role_client == 1 ? true : false;
	nowManager.role_order = allAccounts.value[id].role_order == 1 ? true : false;
	nowManager.role_power = allAccounts.value[id].role_power == 1 ? true : false;
	nowManager.mid = allAccounts.value[id].mid;
};
const validateCode = (rule: any, value: any, callback: any) => {
	if (value.length < 1) {
		callback(new Error("不能为空"));
	} else {
		callback();
	}
};

const submitForm = () => {
	isCheck.value = true;
	managerStore
		.modifyRole({
			token: token.value,
			role_room: nowManager.role_room == true ? 1 : 0,
			role_client: nowManager.role_client == true ? 1 : 0,
			role_order: nowManager.role_order == true ? 1 : 0,
			role_power: nowManager.role_power == true ? 1 : 0,
			mid: nowManager.mid,
		})
		.then((res: any) => {
			if (res.code == "r2000") {
				managerStore.getAllAccount({
					token: token.value,
				});
				ElMessage({
					message: res.msg,
					type: "success",
					offset: 0,
					duration: 1000,
					onClose: () => {},
				});
				drawerShow.value = false;
				isCheck.value = false;
			} else {
				ElMessage({
					message: "修改失败",
					type: "error",
					offset: 0,
					duration: 1000,
					onClose: () => {},
				});

				isCheck.value = false;
			}
		});
	isCheck.value = false;
};
</script>

<style lang="less">
#client {
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 20px;
	min-width: 315px;
	margin: 40px 30px;
	padding: 40px;
	background-color: #fff;
	border-radius: 30px;

	.room-filter {
		width: 100%;
		display: flex;
		align-items: center;
		height: 50px;
		.filter-text {
			height: 50px;
			font-size: 18px;
			line-height: 50px;
		}

		.code-box {
			display: flex;
			align-items: center;
			width: 200px;
			margin-right: 10px;
		}

		.btn-add {
			margin-left: auto;
		}
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
	.client-box {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.role-item {
		display: flex;
		justify-content: center;

		align-items: center;
		gap: 10px;
		font-size: 18px;
		margin-bottom: 10px;
	}
}
</style>