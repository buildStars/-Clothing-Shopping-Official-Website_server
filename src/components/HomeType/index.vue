<template>
	<div id="home-type">
		<div class="add-box">
			<el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" :disabled="isCheck"
				class="demo-ruleForm">
				<el-form-item label="房型名" prop="name" label-width="80px">
					<el-input v-model="ruleForm.name" type="text" autocomplete="off" />
				</el-form-item>

				<el-form-item>
					<el-button round size="large" type="primary" @click="submitForm(ruleFormRef)">添加房型</el-button>
				</el-form-item>
			</el-form>
		</div>

		<div class="home-type-box">
			<el-card class="box-card" v-for="HomeType in allHomeTypes" :key="HomeType.id">
				<template #header>
					<div class="card-header">
						<span>{{HomeType.type_name}}</span>
						<el-button @click="deleteType(HomeType.id)" round type="danger" :disabled="isCheck">删除</el-button>
					</div>
				</template>
			</el-card>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, defineComponent, ref, reactive, onMounted } from "vue";
import { useManagerStore } from "@/store/manager";
import { useHomeTypeStore } from "@/store/HomeType";
import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";

const ruleFormRef = ref<FormInstance>();
const homeTypeStore = useHomeTypeStore();
const managerStore = useManagerStore();
const token = computed(() => {
	return managerStore.token;
});

const allHomeTypes: any = computed(() => {
	return homeTypeStore.allHomeTypes;
});

onMounted(() => {
	homeTypeStore.allHomeType({
		token: token.value,
	});
});

let isCheck = ref(false);
const validateName = (rule: any, value: any, callback: any) => {
	if (value.length < 1) {
		callback(new Error("不能为空"));
	} else {
		callback();
	}
};

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
			homeTypeStore
				.addHomeType({
					type_name: ruleForm.name,
					token: token.value,
				})
				.then((res: any) => {
					if (res.code == "H2000") {
						ElMessage({
							message: res.msg,
							type: "success",
							customClass: "elmsg",
							offset: 0,
							duration: 1500,
							onClose: () => {
								isCheck.value = false;
								ruleForm.name = "";
								homeTypeStore.allHomeType({
									token: token.value,
								});
							},
						});
					} else if (res.code == "H5001") {
						ElMessage({
							message: res.msg,
							type: "warning",
							customClass: "elmsg",
							offset: 0,
							duration: 1500,
							onClose: () => {
								isCheck.value = false;
								ruleForm.name = "";
							},
						});
					}
				});
		} else {
			console.log("error submit!");
			return false;
		}
	});
};

const deleteType = (id: any) => {
	isCheck.value = true;
	homeTypeStore
		.removeHomeTypeById({
			token: token.value,
			id,
		})
		.then((res: any) => {
			if (res.code == "H2001") {
				ElMessage({
					message: res.msg,
					type: "success",
					customClass: "elmsg",
					offset: 0,
					duration: 1500,
					onClose: () => {
						isCheck.value = false;
						homeTypeStore.allHomeType({
							token: token.value,
						});
					},
				});
			} else {
				ElMessage({
					message: "删除失败",
					type: "error",
					offset: 0,
					duration: 1500,
					onClose: () => {
						isCheck.value = false;
					},
				});
			}
		});
};
</script>

<style lang="less">
#home-type {
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 20px;
	min-width: 315px;
	margin: 40px 30px;
	padding: 40px;
	background-color: #fff;
	border-radius: 30px;

	.add-box {
		display: flex;
		justify-content: center;
	}

	.home-type-box {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 20px;
		flex-wrap: wrap;

		.card-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 20px;
			font-weight: 700;
		}

		.el-card__body {
			padding: 0;
		}
		.box-card {
			width: 300px;
		}
	}
}
</style>