<template>
	<div id="register">
		<div class="logo-title">
			<div class="logo-img">
				<img class="auto-img" src="@/assets/logo.png" alt="">
			</div>
			<div class="big-title">问你客栈管理系统</div>

		</div>
		<div class="register-box">
			<div class="register-title">
				<div class="title">注册</div>
				<div class="sub-title">
					Register
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
						<el-form-item label="昵称" prop="name" label-width="80px">
							<el-input v-model="ruleForm.name" type="text" autocomplete="off" />
						</el-form-item>
						<el-form-item label="性别" label-width="80px">
							<el-radio-group v-model="radio1" class="ml-4">
								<el-radio label="男" size="large">男</el-radio>
								<el-radio label="女" size="large">女</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="身份证" prop="personal_code" label-width="80px">
							<el-input v-model="ruleForm.personal_code" type="text" autocomplete="off" />
						</el-form-item>
						<div class="reg-find">
							<el-button type="plain" size="small" @click="router.push('/login')">已有账号，立即登录</el-button>
						</div>
						<el-form-item>
							<el-button round size="large" type="primary" @click="submitForm(ruleFormRef)">注册</el-button>
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
const radio1 = ref("男");
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
const validateName = (rule: any, value: any, callback: any) => {
	if (value.length > 0) {
		callback();
	} else {
		callback(new Error("昵称不能为空"));
	}
};

const validatePersonal_code = (rule: any, value: any, callback: any) => {
	if (
		/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/.test(
			value
		)
	) {
		callback();
	} else {
		callback(new Error("身份证格式不正确"));
	}
};
const ruleForm = reactive({
	pass: "",
	phone: "",
	name: "",

	personal_code: "",
});

const rules = reactive({
	pass: [{ validator: validatePass, trigger: "blur" }],
	phone: [{ validator: validatePhone, trigger: "blur" }],
	name: [{ validator: validateName, trigger: "blur" }],

	personal_code: [{ validator: validatePersonal_code, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			isCheck.value = true;
			managerStore
				.register({
					phone: ruleForm.phone,
					password: ruleForm.pass,
					name: ruleForm.name,
					sex: radio1.value,
					personal_code: ruleForm.personal_code,
				})
				.then(
					(res: any) => {
						console.log("submit!", res);
						if (res.code == "R2000") {
							ElMessage({
								message: res.msg,
								type: "success",
								customClass: "elmsg",
								offset: 0,
								duration: 1500,
								onClose: () => {
									isCheck.value = false;
									router.push("/login");
								},
							});
						} else if (res.code == "R5001") {
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
#register {
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
	background: url("@/assets/bg.webp") center/cover no-repeat;

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

	.register-box {
		padding: 20px;
		max-width: 600px;
		width: 50%;
		min-width: 360px;
		background-color: #ffffff;
		border-radius: 30px;

		.register-title {
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