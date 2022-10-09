<template>
	<div id="client">
		<div class="room-filter">

			<div class="filter-text">
				身份证：
			</div>
			<div class="code-box">
				<el-input v-model="code" size="default" />
			</div>

			<div class="btn-add">
				<el-button class="button" type="primary" @click="drawerShow = true" :disabled="isCheck">添加住客
				</el-button>
			</div>
		</div>
		<div class="client-box">
			<el-table :data="allClients" style="width: 100%">
				<el-table-column prop="name" label="姓名" />
				<el-table-column prop="sex" label="性别" />
				<el-table-column prop="personal_code" label="身份证" />
				<el-table-column prop="phone" label="电话" />
				<el-table-column prop="room_type" label="房型" />
				<el-table-column prop="room_code" label="房间号" />
				<el-table-column prop="day" label="入住天数" />
				<el-table-column prop="creatAt" label="开始时间" />
				<el-table-column prop="endAt" label="结束事件" />
				<el-table-column prop="day" label="入住天数" />
				<el-table-column prop="info" label="说明" />
				<el-table-column prop="price" label="收取金额" />
				<el-table-column fixed="right" label="操作" width="120">
					<template #default="scope">
						<el-button link type="primary" size="small" @click.prevent="toOrder(scope.$index)">
							结账
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-drawer :open-delay="0" v-model="drawerShow" @close="isCheck = false" title="添加住客" direction="rtl" size="40%">
			<div class="edit-inner">
				<el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
					class="demo-ruleForm">
					<el-form-item label="房间" prop="home_code">
						<el-select v-model="ruleForm.home_code" size="large">
							<el-option v-for="room in allRooms" :key="room.id" :label="room.home_code" :value="room.home_code" />
						</el-select>
					</el-form-item>
					<el-form-item label="房型">
						{{nowRoom?.home_type}}
					</el-form-item>
					<el-form-item label="姓名" prop="name">
						<el-input v-model="ruleForm.name" />
					</el-form-item>
					<el-form-item label="性别" prop="sex">
						<el-radio-group v-model="ruleForm.sex">
							<el-radio label="男" size="large">男</el-radio>
							<el-radio label="女" size="large">女</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="电话" prop="phone">
						<el-input v-model="ruleForm.phone" />
					</el-form-item>
					<el-form-item label="身份证" prop="personal_code">
						<el-input v-model="ruleForm.personal_code" />
					</el-form-item>
					<el-form-item label="天数" prop="day">
						<el-input-number v-model="ruleForm.day" :min="1" />
					</el-form-item>
					<el-form-item label="价格">
						<el-input-number v-model="nowprice" :min="0" disabled />
					</el-form-item>
					<el-form-item label="选择日期" prop="selectTime">
						<el-date-picker value-format="YYYY-MM-DD" v-model="ruleForm.selectTime" type="date"
							placeholder="Pick a day" />
					</el-form-item>
					<el-form-item label="时间段" prop="time">
						<el-date-picker readonly type="datetimerange" range-separator="To" start-placeholder="Start date"
							end-placeholder="End date" v-model="times" />
					</el-form-item>

					<el-form-item label="描述" prop="info">
						<el-input v-model="ruleForm.info" :rows="3" type="textarea" resize="none" />
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm(ruleFormRef)" :disabled="isCheck">修改</el-button>

					</el-form-item>
				</el-form>
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

import { Plus } from "@element-plus/icons-vue";
import type { FormInstance, UploadProps } from "element-plus";
import { ElMessage } from "element-plus";
import { constant } from "lodash";
import { ru } from "element-plus/es/locale";

const ruleFormRef = ref<FormInstance>();
const homeTypeStore = useHomeTypeStore();
const roomStore = useRoomStore();
const clientStore = useClientStore();
const managerStore = useManagerStore();
const orderStore = useOrderStore();

const isCheck = ref(false);
const code = ref("");
const filter = ref(false);
const drawerShow = ref(false);
const token = computed(() => {
	return managerStore.token;
});
const selfMsg: any = computed(() => {
	return managerStore.selfMsg;
});
const allClients: any = computed(() => {
	if (code.value.length > 0) {
		return clientStore.allClients.filter((item: any) => {
			return item.personal_code == code.value;
		});
	} else {
		return clientStore.allClients;
	}
});
const times: any = computed(() => {
	if (!ruleForm.selectTime) {
		return [];
	}
	let end = new Date(
		new Date(ruleForm.selectTime.split("-").join("/") + " 12:00:00").getTime() +
			ruleForm.day * 24 * 60 * 60 * 1000
	)
		.toLocaleString()
		.split("/")
		.join("-");
	console.log(end);

	return [ruleForm.selectTime + " 12:00:00", end];
});
const allHomeTypes: any = computed(() => {
	return homeTypeStore.allHomeTypes;
});
const allRooms: any = computed(() => {
	return roomStore.allRooms.filter((item: any) => {
		return item.status == 0;
	});
});
const nowRoom: any = computed(() => {
	return roomStore.allRooms.filter((item: any) => {
		return item.home_code == ruleForm.home_code;
	})[0];
});
const nowprice: any = computed(() => {
	if (!nowRoom.value) {
		return 0;
	}
	return nowRoom.value.price * ruleForm.day;
});
onMounted(() => {
	roomStore.allRoom({
		token: token.value,
	});
	homeTypeStore.allHomeType({
		token: token.value,
	});
	clientStore.allClient({
		token: token.value,
	});
});

const validateCode = (rule: any, value: any, callback: any) => {
	if (value.length < 1) {
		callback(new Error("不能为空"));
	} else {
		callback();
	}
};

const validateSelectTime = (rule: any, value: any, callback: any) => {
	if (!value) {
		callback(new Error("不能为空"));
	} else {
		callback();
	}
};

const validatePersonal_code = (rule: any, value: any, callback: any) => {
	if (
		!/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/.test(
			value
		)
	) {
		callback(new Error("身份证格式不正确"));
	} else {
		callback();
	}
};
const validateSelectPhone = (rule: any, value: any, callback: any) => {
	if (
		!/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(value)
	) {
		callback(new Error("手机号格式不正确"));
	} else {
		callback();
	}
};
const validateSelectName = (rule: any, value: any, callback: any) => {
	if (!value) {
		callback(new Error("不能为空"));
	} else {
		callback();
	}
};

let ruleForm: any = reactive({
	home_code: "",
	phone: "",
	info: "",
	personal_code: "",
	day: 1,
	selectTime: null,
	name: "",
	sex: "男",
});

const rules = reactive({
	home_code: [{ validator: validateCode, trigger: "blur" }],
	personal_code: [{ validator: validatePersonal_code, trigger: "blur" }],
	selectTime: [{ validator: validateSelectTime, trigger: "blur" }],
	phone: [{ validator: validateSelectPhone, trigger: "blur" }],
	name: [{ validator: validateSelectName, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		isCheck.value = true;
		if (valid) {
			clientStore
				.addClient({
					token: token.value,
					name: ruleForm.name,
					sex: ruleForm.sex,
					personal_code: ruleForm.personal_code,
					phone: ruleForm.phone,
					day: ruleForm.day,
					room_code: ruleForm.home_code,
					creatAt: times.value[0],
					endAt: times.value[1],
					info: ruleForm.info,
					price: nowprice.value,
					room_type: nowRoom.value.home_type,
				})
				.then(
					(res: any) => {
						if (res.code == "C2001") {
							ElMessage({
								message: res.msg,
								type: "success",
								offset: 0,
								duration: 1000,
								onClose: () => {
									isCheck.value = false;
									drawerShow.value = false;
									roomStore
										.editRoom({
											token: token.value,
											id: nowRoom.value.id,
											home_code: nowRoom.value.home_code,
											home_type: nowRoom.value.home_type,
											price: nowRoom.value.price,
											square: nowRoom.value.square,
											status: 1,
											info: nowRoom.value.info,
										})
										.then((res) => {
											clientStore.allClient({ token: token.value });
										});
								},
							});
						}
					},
					(err) => {
						isCheck.value = false;

						ElMessage({
							message: err.message,
							type: "error",
							offset: 0,
							duration: 1000,
							onClose: () => {},
						});
					}
				);
		} else {
			isCheck.value = false;
			console.log("error submit!");
			return false;
		}
	});
};

const toOrder = (i: any) => {
	isCheck.value = true;
	orderStore
		.addOrder({
			token: token.value,
			client_name: allClients.value[i].name,
			client_sex: allClients.value[i].sex,
			client_code: allClients.value[i].personal_code,
			day: allClients.value[i].day,
			client_phone: allClients.value[i].phone,
			room_code: allClients.value[i].room_code,
			price: allClients.value[i].price,
			info: allClients.value[i].info,
			comeAt: allClients.value[i].creatAt,
			endAt: allClients.value[i].endAt,
			orderAt: new Date().toLocaleString().split("/").join("-"),
			manager_name: selfMsg.value.name,
			manager_phone: selfMsg.value.phone,
			room_type: allClients.value[i].room_type,
		})
		.then((res: any) => {
			if (res.code == "O2002") {
				clientStore
					.removeClient({
						token: token.value,
						id: allClients.value[i].id,
					})
					.then((res: any) => {
						if (res.code == "C2002") {
							ElMessage({
								message: res.msg,
								type: "success",
								offset: 0,
								duration: 1000,
							});
						}
						clientStore
							.allClient({
								token: token.value,
							})
							.then((res) => {
								isCheck.value = false;
							});
						isCheck.value = false;
					});
			} else {
				ElMessage({
					message: "结账失败",
					type: "error",
					offset: 0,
					duration: 1000,
				});
				isCheck.value = false;
			}
		});
};
</script>

<style lang="less" >
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

	.client-box {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>