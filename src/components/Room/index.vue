<template>
	<div id="room">
		<div class="room-filter">
			<div class="filter-text">
				房间类型：
			</div>
			<el-select v-model="filterValue" size="large">
				<el-option label="全部" value="全部" />
				<el-option v-for="item in allHomeTypes" :key="item.id" :label="item.type_name" :value="item.type_name" />
			</el-select>
			<div class="btn-add">
				<el-button class="button" type="primary" @click="addShow = true" :disabled="isCheck">添加房间
				</el-button>
			</div>
		</div>
		<div class="room-box" v-show="allRooms.length >0">
			<div class="room-item" v-for="room in allRooms" :key="room.id">
				<el-card :body-style="{ padding: '0px' }">
					<div class="room-img">
						<el-image class="auto-img" :src="baseHost+room.home_image" lazy />
					</div>
					<div style="padding: 14px;position: relative;">
						<div class="status-tag status0" v-show="room.status==0">
							空闲
						</div>
						<div class="status-tag status1" v-show="room.status==1">
							使用中
						</div>
						<div class="status-tag status2" v-show="room.status==2">
							维修中
						</div>
						<div class="room-code one-line-text">
							房间号：{{room.home_code}}
						</div>
						<div class="room-type one-line-text">
							房型：{{room.home_type}}
							<div class="square one-line-text">
								(面积：{{room.square}}平方米)
							</div>
						</div>
						<div class="room-info">
							描述：{{room.info}}
						</div>
						<div class="bottom">
							<div class="price">￥{{room.price}}</div>
							<div class="btn-box">
								<el-button class="button" type="danger" @click="deleteroom(room.id)" :disabled="room.status==1">删除
								</el-button>
								<el-button class="button" type="primary" @click="editroom(room.id)"
									:disabled="isCheck || room.status==1">编辑</el-button>
							</div>
						</div>
					</div>
				</el-card>
			</div>
			<el-drawer :open-delay="0" v-model="drawerShow" @close="editclose" title="编辑房间" direction="rtl" size="40%">
				<div class="edit-inner">
					<el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
						class="demo-ruleForm">
						<el-form-item label="房型" prop="home_type">
							<el-select v-model="ruleForm.home_type" placeholder="请选择房型" size="large">
								<el-option v-for="tp in allHomeTypes" :key="tp.id" :label="tp.type_name" :value="tp.type_name" />
							</el-select>
						</el-form-item>
						<el-form-item label="房间号" prop="home_code">
							<el-input v-model="ruleForm.home_code" type="text" autocomplete="off" />
						</el-form-item>

						<el-form-item label="价格" prop="price">
							<el-input-number v-model="ruleForm.price" :min="0" />
						</el-form-item>
						<el-form-item label="面积" prop="square">
							<el-input-number v-model="ruleForm.square" :min="1" />
						</el-form-item>
						<el-form-item label="房间状态" prop="status">
							<el-select v-model="ruleForm.status" placeholder="Select" size="large">
								<el-option label="空闲" :value="0" />

								<el-option label="维修中" :value="2" :disabled="nowRoom.status==1" />
							</el-select>
						</el-form-item>
						<el-form-item label="上传图片" prop="img">
							<el-upload class="avatar-uploader" :action="baseHost+'/api/room/editRoomImg'"
								:data="{token:token,id:editID}" :show-file-list="false" :on-success="handleAvatarSuccess"
								:before-upload="beforeAvatarUpload">
								<img v-if="imageUrl" :src="baseHost +imageUrl" class="avatar" />
								<el-icon v-else class="avatar-uploader-icon">
									<Plus />
								</el-icon>
							</el-upload>
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
		<el-drawer :open-delay="0" v-model="addShow" @close="addShow=false" title="添加房间" direction="rtl" size="40%">
			<div class="edit-inner">
				<el-form ref="ruleFormRef" :model="ruleForm2" status-icon :rules="rules2" label-width="120px"
					class="demo-ruleForm">
					<el-form-item label="房型" prop="home_type">
						<el-select v-model="ruleForm2.home_type" placeholder="请选择房型" size="large">
							<el-option v-for="tp in allHomeTypes" :key="tp.id" :label="tp.type_name" :value="tp.type_name" />
						</el-select>
					</el-form-item>
					<el-form-item label="房间号" prop="home_code">
						<el-input v-model="ruleForm2.home_code" type="text" autocomplete="off" />
					</el-form-item>

					<el-form-item label="价格" prop="price">
						<el-input-number v-model="ruleForm2.price" :min="0" />
					</el-form-item>
					<el-form-item label="面积" prop="square">
						<el-input-number v-model="ruleForm2.square" :min="1" />
					</el-form-item>
					<el-form-item label="房间状态" prop="status">
						<el-select v-model="ruleForm2.status" placeholder="Select" size="large">
							<el-option label="空闲" :value="0" />

							<el-option label="维修中" :value="2" />
						</el-select>
					</el-form-item>

					<el-form-item label="描述" prop="info">
						<el-input v-model="ruleForm2.info" :rows="3" type="textarea" resize="none" />
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm2(ruleFormRef)" :disabled="isCheck">添加</el-button>

					</el-form-item>
				</el-form>
			</div>
		</el-drawer>
		<el-empty :image-size="200" v-show="allRooms.length <1" />
	</div>
</template>

<script lang="ts" setup>
import { computed, defineComponent, ref, reactive, onMounted } from "vue";
import { useManagerStore } from "@/store/manager";
import { useHomeTypeStore } from "@/store/HomeType";
import { useRoomStore } from "@/store/Room";
import { Plus } from "@element-plus/icons-vue";
import { host, port } from "@/config/host.js";

import type { FormInstance, UploadProps } from "element-plus";
import { ElMessage } from "element-plus";
const baseHost = ref(host + ":" + port);
const ruleFormRef = ref<FormInstance>();
const homeTypeStore = useHomeTypeStore();
const roomStore = useRoomStore();

const managerStore = useManagerStore();
const token = computed(() => {
	return managerStore.token;
});
let drawerShow = ref(false);
let addShow = ref(false);

//过滤展示的房间们
let showRooms = ref([]);
let filterValue = ref("全部");
const allHomeTypes: any = computed(() => {
	return homeTypeStore.allHomeTypes;
});

const allRooms: any = computed(() => {
	if (filterValue.value == "全部") {
		return roomStore.allRooms;
	} else {
		return roomStore.allRooms.filter((item: any) => {
			return item.home_type == filterValue.value;
		});
	}
});

onMounted(() => {
	roomStore.allRoom({
		token: token.value,
	});
	homeTypeStore.allHomeType({
		token: token.value,
	});
});

let isCheck = ref(false);

const validateCode = (rule: any, value: any, callback: any) => {
	if (value.length < 1) {
		callback(new Error("不能为空"));
	} else {
		callback();
	}
};

const validateCode2 = (rule: any, value: any, callback: any) => {
	if (value.length < 1) {
		callback(new Error("不能为空"));
	} else if (
		allRooms.value.findIndex((item: any) => item.home_code == value) > -1
	) {
		callback(new Error("房间号已存在"));
	} else {
		callback();
	}
};

const validateType = (rule: any, value: any, callback: any) => {
	if (value.length < 1) {
		callback(new Error("请选择房型"));
	} else {
		callback();
	}
};
let nowRoom: any = ref({});
let ruleForm: any = reactive({
	home_code: "",
	price: 2,
	square: 1,
	status: "0",
	home_type: "",
	info: "",
});
let ruleForm2: any = reactive({
	home_code: "",
	price: 2,
	square: 1,
	status: 0,
	home_type: "",
	info: "",
});

const rules = reactive({
	home_code: [{ validator: validateCode, trigger: "blur" }],
	home_type: [{ validator: validateType, trigger: "blur" }],
});
const rules2 = reactive({
	home_code: [{ validator: validateCode2, trigger: "blur" }],
	home_type: [{ validator: validateType, trigger: "blur" }],
});
const editID = ref("");

const deleteroom = (id: any) => {
	isCheck.value = true;
	roomStore
		.removeRoom({
			token: token.value,
			id,
		})
		.then((res: any) => {
			if (res.code == "R2002") {
				ElMessage({
					message: res.msg,
					type: "success",
					offset: 0,
					duration: 1000,
					onClose: () => {
						isCheck.value = false;
						roomStore.allRoom({ token: token.value });
					},
				});
			} else {
				ElMessage({
					message: "删除失败",
					type: "error",
					offset: 0,
					duration: 1000,
					onClose: () => {
						isCheck.value = false;
					},
				});
			}
		});
};

const editroom = (id: any) => {
	editID.value = id;
	nowRoom.value = allRooms.value.filter((item: any) => item.id == id)[0];
	ruleForm.home_code = nowRoom.value.home_code;
	ruleForm.home_type = nowRoom.value.home_type;
	ruleForm.price = nowRoom.value.price;
	ruleForm.square = nowRoom.value.square;
	ruleForm.status = nowRoom.value.status;
	ruleForm.info = nowRoom.value.info;
	imageUrl.value = nowRoom.value.home_image;
	drawerShow.value = true;
};
const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		console.log(222);
		if (valid) {
			isCheck.value = true;
			roomStore
				.editRoom({
					token: token.value,
					id: editID.value,
					home_code: ruleForm.home_code,
					home_type: ruleForm.home_type,
					price: ruleForm.price,
					square: ruleForm.square,
					status: ruleForm.status,
					info: ruleForm.info,
				})
				.then((res: any) => {
					if (res.code == "R2005") {
						ElMessage({
							message: res.msg,
							type: "success",
							offset: 0,
							duration: 1000,
							onClose: () => {
								isCheck.value = false;
								drawerShow.value = false;
								roomStore.allRoom({ token: token.value });
							},
						});
					} else {
						ElMessage({
							message: "修改失败",
							type: "error",
							offset: 0,
							duration: 1000,
							onClose: () => {
								isCheck.value = false;
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
const submitForm2 = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		console.log(333);
		if (valid) {
			isCheck.value = true;
			roomStore
				.addRoom({
					token: token.value,
					home_code: ruleForm2.home_code,
					home_type: ruleForm2.home_type,
					price: ruleForm2.price,
					square: ruleForm2.square,
					status: ruleForm2.status,
					info: ruleForm2.info,
				})
				.then((res: any) => {
					if (res.code == "R2001") {
						ElMessage({
							message: res.msg,
							type: "success",
							offset: 0,
							duration: 1000,
							onClose: () => {
								isCheck.value = false;
								addShow.value = false;
								roomStore.allRoom({ token: token.value });
							},
						});
					} else if (res.code == "R2006") {
						ElMessage({
							message: res.msg,
							type: "error",
							offset: 0,
							duration: 1000,
							onClose: () => {
								isCheck.value = false;
								addShow.value = false;
								roomStore.allRoom({ token: token.value });
							},
						});
					} else {
						ElMessage({
							message: "修改失败",
							type: "error",
							offset: 0,
							duration: 1000,
							onClose: () => {
								isCheck.value = false;
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
const imageUrl = ref("");

const handleAvatarSuccess: UploadProps["onSuccess"] = (res, uploadFile) => {
	if (res.code == "R2006") {
		roomStore
			.allRoom({
				token: token.value,
			})
			.then((res) => {
				editroom(editID.value);
			});
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

const editclose = () => {
	imageUrl.value = "";
	drawerShow.value = false;
};
</script>

<style lang="less">
#room {
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 20px;
	min-width: 315px;
	margin: 40px 30px;
	padding: 40px;
	background-color: #fff;
	border-radius: 30px;

	.avatar-uploader .avatar {
		width: 178px;
		height: 178px;
		display: block;
	}

	.avatar-uploader .el-upload {
		border: 1px dashed var(--el-border-color);
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		transition: var(--el-transition-duration-fast);
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

		.btn-add {
			margin-left: auto;
		}
	}

	.add-box {
		display: flex;
		justify-content: center;
	}

	.room-box {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 20px;
		flex-wrap: wrap;

		.status-tag {
			position: absolute;
			right: 0;
			top: 0;
			width: 60px;
			height: 20px;
			text-align: center;
			line-height: 20px;
			color: white;
		}

		.status0 {
			background-color: rgb(11, 194, 11);
		}
		.status1 {
			background-color: rgb(57, 10, 228);
		}
		.status2 {
			background-color: rgb(194, 11, 11);
		}
		.room-img {
			width: 100%;
			height: 200px;
			overflow: hidden;
			background-color: rgb(90, 88, 88);
		}

		.room-code {
			width: 100%;
			font-size: 20px;
			font-weight: 700;
			margin-bottom: 10px;
		}

		.room-type {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			font-size: 16px;
			margin-bottom: 10px;

			.square {
				width: 120px;
				font-size: 12px;
				margin-left: 10px;
			}
		}

		.room-info {
			width: 100%;
			height: 50px;
			text-align: left;
			word-break: break-all;
			overflow: hidden;
		}

		.el-card__body {
			width: 300px;
			padding: 0;
		}

		.bottom {
			margin-top: 13px;
			line-height: 12px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.price {
				font-size: 26px;
				font-weight: 700;
				color: red;
			}
		}
	}
}
</style>