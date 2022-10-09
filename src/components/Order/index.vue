<template>
	<div id="order">
		<div class="order-box">
			<el-table :data="allOrders" style="width: 100%">
				<el-table-column prop="client_name" label="姓名" />
				<el-table-column prop="client_sex" label="性别" />
				<el-table-column prop="client_code" label="身份证" />
				<el-table-column prop="client_phone" label="电话" />
				<el-table-column prop="room_type" label="房型" />
				<el-table-column prop="room_code" label="房间号" />
				<el-table-column prop="day" label="入住天数" />
				<el-table-column prop="comeAt" label="开始时间" />
				<el-table-column prop="endAt" label="结束事件" />
				<el-table-column prop="info" label="说明" />
				<el-table-column prop="price" label="收取金额" />
				<el-table-column prop="orderAt" label="结账时间" />
				<el-table-column prop="manager_name" label="结账人" />
				<el-table-column prop="manager_phone" label="结账人电话" />

			</el-table>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, defineComponent, ref, reactive, onMounted } from "vue";
import { useManagerStore } from "@/store/manager";
import { useOrderStore } from "@/store/Order";
import { ElMessage } from "element-plus";

const managerStore = useManagerStore();
const orderStore = useOrderStore();
onMounted(() => {
	orderStore.allOrder({
		token: token.value,
	});
});

const token = computed(() => {
	return managerStore.token;
});
const allOrders = computed(() => {
	return orderStore.allOrders;
});
</script>

<style lang="less">
#order {
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 20px;
	min-width: 315px;
	margin: 40px 30px;
	padding: 40px;
	background-color: #fff;
	border-radius: 30px;

	.order-box {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>