<template>
	<div id="modify">
		<div class="logo-title">
			<div class="logo-img">
				<img class="auto-img" src="@/assets/logo.png" alt="">
			</div>
			<div class="big-title">My客栈管理系统</div>

		</div>
		<div class="modify-box">
			<div class="modify-title">
				<div class="title">修改密码</div>
				<div class="sub-title">
					ModifyPassword
				</div>
			</div>
			<el-row>
				<el-col :span="24">
					<el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
						:disabled="isCheck" class="demo-ruleForm">
						<el-form-item label="旧密码" prop="oldPass" label-width="80px">
							<el-input v-model="ruleForm.oldPass" type="password" autocomplete="off" />
						</el-form-item>
						<el-form-item label="新密码" prop="pass" label-width="80px">
							<el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
						</el-form-item>
						
						<el-form-item>
							<el-button round size="large" type="primary" @click="submitForm(ruleFormRef)">修改密码</el-button>
						</el-form-item>
					</el-form>
				</el-col>

			</el-row>
		</div>

	</div>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, computed } from "vue";
import axios from "axios";
import { useManagerStore } from "@/store/manager";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import { useRouter } from "vue-router";
import storage from "@/utils/localStorage";
const token = computed(() => {
	return managerStore.token;
});
const managerStore = useManagerStore();
const ruleFormRef = ref<FormInstance>();
const router = useRouter();
onMounted(() => {
	// managerStore.getAccount({ token: token.value });
});
let isCheck = ref(false);
const validatePass = (rule: any, value: any, callback: any) => {
	if (!/^\w{6,16}$/.test(value)) {
		callback(new Error("请输入6-16位英文字母、数字或下划线组合的字符串"));
	} else {
		callback();
	}
};
const validateOldPass = (rule: any, value: any, callback: any) => {
	if (!/^\w{6,16}$/.test(value)) {
		callback(new Error("请输入6-16位英文字母、数字或下划线组合的字符串"));
	} else {
		callback();
	}
};

const ruleForm = reactive({
	pass: "",
	oldPass: "",
});

const rules = reactive({
	pass: [{ validator: validatePass, trigger: "blur" }],
	oldPass: [{ validator: validateOldPass, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			isCheck.value = true;
			managerStore
				.modifyPwd({
					oldPassword: ruleForm.oldPass,
					password: ruleForm.pass,
					token:token.value
				})
				.then(
					(res: any) => {
						console.log("submit!", res);
						if (res.code == "P2000") {
							ElMessage({
								message: res.msg,
								type: "success",
								customClass: "elmsg",
								offset: 0,
								duration: 1500,
								onClose: () => {
									storage.removeLocal("my-hotel-2022-10-4-token");
									isCheck.value = false;
									router.push("/login");
								},
							});
						} else if (res.code == "P4000") {
							ElMessage({
								message: res.msg,
								type: "error",
								customClass: "elmsg",
								offset: 0,
								duration: 1500,
							});
							isCheck.value = false;
						} else {
							isCheck.value = false;
						}
					},
					(error) => {
						isCheck.value = false;
					}
				);
		} else {
			console.log("error submit!");
			return false;
		}
	});
};
</script>

<style lang="less">
.elmsg {
	position: absolute;

	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 20px;
	width: 100%;
	height: 30px;

	z-index: 9999;
}
#modify {
	display: flex;
	flex-direction: column;
	align-items: center;
	min-width: 315px;
	margin: 40px 30px;
	padding: 40px;
	background-color: #fff;
	border-radius: 30px;

	.el-form-item__content {
		justify-content: center;
		margin: 0% !important;
	}
	.logo-title {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 20px;
		margin-top: 10px;
		.logo-img {
			width: 60px;
			margin-right: 20px;
		}

		.big-title {
			font-size: 32px;
			font-weight: 700;
			color: #000;
		}
	}

	.modify-box {
		padding: 20px;
		max-width: 600px;
		width: 80%;
		background-color: #ffffff;
		border-radius: 30px;

		.modify-title {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text-align: left;
			width: 100%;
			margin-bottom: 20px;
			.title {
				font-size: 28px;
				font-weight: 700;
				margin-bottom: 10px;
			}

			.sub-title {
				font-size: 18px;
				margin-left: 10px;
			}
		}

		
	}
}
</style>