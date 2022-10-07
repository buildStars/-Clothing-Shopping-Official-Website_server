<template>
	<div id="self">
		<el-row>
			<el-col :span="24">
				<div class="self">
					<el-descriptions class="margin-top" title="个人信息" :column="1" size="large" border>
						<template #extra>
							<el-button type="primary" @click="editMsg">编辑</el-button>
							<el-drawer v-model="drawerShow" title="编辑个人信息" direction="rtl" size="50%">
								<el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
									:disabled="isCheck" class="demo-ruleForm">
									<el-form-item label="昵称" prop="name" label-width="80px">
										<el-input v-model="ruleForm.name" type="text" autocomplete="off" />
									</el-form-item>
									<el-form-item label="性别" label-width="80px">
										<el-radio-group v-model="radio1" class="ml-4">
											<el-radio label="男" size="large">男</el-radio>
											<el-radio label="女" size="large">女</el-radio>
										</el-radio-group>
									</el-form-item>

									<el-form-item label="头像" prop="img" label-width="80px">
										<el-upload class="avatar-uploader" action="http://127.0.0.1:3001/api/manager/updateAccountImg"
											:data="{token:token}" :show-file-list="false" :on-success="handleAvatarSuccess"
											:before-upload="beforeAvatarUpload">
											<img class="auto-img avatar" v-if="imageUrl" :src="baseHost +imageUrl"  />
											<el-icon v-else class="avatar-uploader-icon">
												<Plus />
											</el-icon>
										</el-upload>

									</el-form-item>
									<el-form-item>
										<el-button round size="large" type="primary" @click="submitForm(ruleFormRef)">确认修改</el-button>
									</el-form-item>
								</el-form>
							</el-drawer>
						</template>
						<el-descriptions-item label-class-name="item-label">
							<template #label>
								<div class="cell-item">

									昵称
								</div>
							</template>
							{{selfMsg.name}}
						</el-descriptions-item>
						<el-descriptions-item label-class-name="item-label">
							<template #label>
								<div class="cell-item">

									性别
								</div>
							</template>
							{{selfMsg.sex}}
						</el-descriptions-item>
						<el-descriptions-item label-class-name="item-label">
							<template #label>
								<div class="cell-item">

									头像
								</div>
							</template>
							<div class="self-img">
								<img class="auto-img" :src="baseHost+selfMsg.user_image" alt="">
							</div>
						</el-descriptions-item>

						<el-descriptions-item label-class-name="item-label">
							<template #label>
								<div class="cell-item">

									电话
								</div>
							</template>
							{{selfMsg.phone}}
						</el-descriptions-item>
						<el-descriptions-item label-class-name="item-label">
							<template #label>
								<div class="cell-item">

									身份证
								</div>
							</template>
							{{selfMsg.personal_code}}
						</el-descriptions-item>
						<el-descriptions-item label-class-name="item-label">
							<template #label>
								<div class="cell-item">

									创建时间
								</div>
							</template>
							{{selfMsg.creatAt}}
						</el-descriptions-item>
						<el-descriptions-item label-class-name="item-label">
							<template #label>
								<div class="cell-item">

									身份
								</div>
							</template>
							{{selfMsg.role_power == 1 ? "超级管理员" : "普通管理员"}}
						</el-descriptions-item>
					</el-descriptions>
				</div>
			</el-col>
		</el-row>

	</div>
</template>

<script lang="ts" setup>
import { computed, defineComponent, ref, reactive } from "vue";
import { useManagerStore } from "@/store/manager";
import axios, { CancelToken } from "axios";
import { ElMessage } from "element-plus";
import type { FormInstance, UploadProps } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import storage from "@/utils/localStorage";
const router = useRouter();
const baseHost = ref("http://127.0.0.1:3001");

const token: any = computed(() => {
	return managerStore.token;
});

const ruleFormRef = ref<FormInstance>();
const managerStore = useManagerStore();

const drawerShow = ref(false);
const selfMsg: any = computed(() => {
	return managerStore.selfMsg;
});

const editMsg = () => {
	drawerShow.value = true;
	imageUrl.value = selfMsg.value.user_image
	console.log("edit");
};
let isCheck = ref(false);
const validateName = (rule: any, value: any, callback: any) => {
	if (value.length < 1) {
		callback(new Error("昵称不能为空！"));
	} else {
		callback();
	}
};

const radio1 = ref("男");
const imageUrl = ref("");
const ruleForm = reactive({
	name: "",
});

const rules = reactive({
	name: [{ validator: validateName, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			isCheck.value = true;
			managerStore
				.updateAccount({
					name: ruleForm.name,
					sex: radio1.value,
					token: token.value,
				})
				.then(
					(res: any) => {
						console.log("submit!", res);
						if (res.code == "U2000") {
							ElMessage({
								message: res.msg,
								type: "success",
								customClass: "elmsg",
								offset: 0,
								duration: 1500,
								onClose: () => {
									ruleForm.name = "";

									imageUrl.value = "";
									isCheck.value = false;
									drawerShow.value = false;
									managerStore.getAccount({ token: token.value });
								},
							});
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

const handleAvatarSuccess: UploadProps["onSuccess"] = (res, uploadFile) => {
	if (res.code == "I2000") {
		managerStore.getAccount({
			token: token.value,
		}).then((res)=>{
			imageUrl.value = selfMsg.value.user_image
		})

		ElMessage({
			message: res.msg,
			type: "success",
			offset: 0,
			duration: 1500,
			onClose: () => {},
		});
	}
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
	if (
		rawFile.type !== "image/jpeg" &&
		rawFile.type !== "image/png" &&
		rawFile.type !== "image/jpg"
	) {
		ElMessage.error("图片格式需为jpeg,jpg,png!");
		return false;
	} else if (rawFile.size / 1024 / 1024 > 2) {
		ElMessage.error("图片大小超过2MB!");
		return false;
	}
	return true;
};
</script>

<style lang="less">
#self {
	.self {
		min-width: 315px;
		margin: 40px 30px;
		padding: 40px;
		background-color: #fff;
		border-radius: 30px;

		.self-img{
			display: flex;
			align-items: center;
			width: 50px;
			height: 50px;
		}
	}

	.item-label {
		font-size: 16px;
		width: 120px;
	}
	.avatar-uploader .el-upload {
		border: 1px dashed var(--el-border-color);
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		transition: var(--el-transition-duration-fast);
	}

	.el-upload {
		width: 100px;
		height: 100px;
	}

	.avatar-uploader .el-upload:hover {
		border-color: var(--el-color-primary);
	}

	.el-icon.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		text-align: center;
	}
}
</style>