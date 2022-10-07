<template>
	<div id="find">
		<div class="logo-title">
			<div class="logo-img">
				<img class="auto-img" src="@/assets/logo.png" alt="">
			</div>
			<div class="big-title">My客栈管理系统</div>

		</div>
		<div class="find-box">
			<div class="find-title">
				<div class="title">找回密码</div>
				<div class="sub-title">
					Find
				</div>
			</div>
			<el-row>
				<el-col :span="24">
					<el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
						:disabled="isCheck" class="demo-ruleForm">
						<el-form-item label="手机号" prop="phone" label-width="80px">
							<el-input v-model="ruleForm.phone" type="text" autocomplete="off" />
						</el-form-item>
						<el-form-item label="密码" prop="pass" label-width="80px">
							<el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
						</el-form-item>
						<div class="reg-find">
							<el-button type="plain" size="small" @click="router.push('/login')">去登陆</el-button>
						</div>
						<el-form-item>
							<el-button round size="large" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
						</el-form-item>
					</el-form>
				</el-col>

			</el-row>
		</div>

	</div>
</template>

<script setup  lang="ts">
import { ElMessage } from "element-plus";
import { useManagerStore } from "@/store/manager";
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import { useRouter } from "vue-router";
const managerStore = useManagerStore();
const ruleFormRef = ref<FormInstance>();
const router = useRouter();

let isCheck = ref(false);
const validatePass = (rule: any, value: any, callback: any) => {
	if (!/^\w{6,16}$/.test(value)) {
		callback(new Error("请输入6-16位英文字母、数字或下划线组合的字符串"));
	} else {
		callback();
	}
};
const validatePhone = (rule: any, value: any, callback: any) => {
	if (
		/^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/.test(
			value
		)
	) {
		callback();
	} else {
		callback(new Error("手机号格式不正确"));
	}
};

const ruleForm = reactive({
	pass: "",
	phone: "",
});

const rules = reactive({
	pass: [{ validator: validatePass, trigger: "blur" }],
	phone: [{ validator: validatePhone, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			isCheck.value = true;
			managerStore
				.find({
					phone: ruleForm.phone,
					password: ruleForm.pass,
				})
				.then(
					(res: any) => {
						console.log("submit!", res);
						if (res.code == "L2000") {
							ElMessage({
								message: res.msg,
								type: "success",
								customClass: "elmsg",
								offset: 0,
								duration: 1500,
								onClose: () => {
									isCheck.value = false;
									router.push("/home/index");
								},
							});
						} else if (res.code == "L5002") {
							ElMessage({
								message: res.msg,
								type: "error",
								customClass: "elmsg",
								offset: 0,
								duration: 1500,
							});
							isCheck.value = false;
						} else if (res.code == "L5001") {
							ElMessage({
								message: res.msg,
								type: "warning",
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
.el-message--error {
	background-color: rgb(233, 53, 29);
}

.el-message--success {
	background-color: rgb(21, 224, 65);
}

.el-message--warning {
	background-color: rgb(230, 131, 18);
}
.elmsg {
	position: absolute;

	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 20px;
	width: 100%;
	height: 30px;
	color: white;

	z-index: 9999;
}
#find {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	height: 100%;
	background-color: #242323;
	min-width: 375px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	overflow: auto;

	.el-form-item__content {
		justify-content: center;
		margin: 0% !important;
	}
	.logo-title {
		display: flex;
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
			color: #fff;
		}
	}

	.find-box {
		padding: 20px;
		max-width: 600px;
		width: 50%;
		min-width: 360px;
		background-color: #ffffff;
		border-radius: 30px;

		.find-title {
			display: flex;
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

		.reg-find {
			display: flex;
			justify-content: end;
			margin-bottom: 10px;
		}
	}
}
</style>