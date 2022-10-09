<template>
	<div id="index">
		<div class="chart-box">

			<div id="main"></div>
			<div class="income">
				<div class="income-box animate__animated  animate__bounceInDown">
					总收入：￥{{allPrice}}
				</div>
			</div>
		</div>

		<div class="prod-info">
			<div class="prod-name">问你客栈管理系统</div>
			<div class="version">version: 1.0.0</div>
			<div class="dev-email">开发者邮箱: 958570363@qq.com</div>
		</div>

	</div>

</template>

<script lang="ts" setup>
import { computed, defineComponent, onMounted } from "vue";
import * as echarts from "echarts/core";
import {
	ToolboxComponent,
	LegendComponent,
	TitleComponent,
	TitleComponentOption,
} from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { useManagerStore } from "@/store/manager";
import { useHomeTypeStore } from "@/store/HomeType";
import { useOrderStore } from "@/store/Order";

const managerStore = useManagerStore();
const homeTypeStore = useHomeTypeStore();
const orderStore = useOrderStore();

const token: any = computed(() => {
	return managerStore.token;
});

const allPrice: any = computed(() => {
	let all = 0;
	orderStore.allOrders.forEach((item: any) => {
		all += item.price;
	});
	return all;
});

const allHomeTypes = computed(() => {
	return homeTypeStore.allHomeTypes.map((item: any) => {
		return { value: item.seil_count, name: item.type_name };
	});
});

echarts.use([
	ToolboxComponent,
	LegendComponent,
	PieChart,
	CanvasRenderer,
	LabelLayout,
	TitleComponent,
]);

onMounted(() => {
	orderStore.allOrder({
		token: token.value,
	});

	homeTypeStore
		.allHomeType({
			token: token.value,
		})
		.then((res) => {
			var chartDom: any = document.getElementById("main");
			var myChart = echarts.init(chartDom);
			var option;
			option = {
				title: {
					text: "房型销量饼图",
					// subtext: "Fake Data",
					left: "center",
				},
				legend: {
					top: "bottom",
				},
				toolbox: {
					show: true,
					feature: {
						mark: { show: true },
						// dataView: { show: true, readOnly: false },
						// restore: { show: true },
						// saveAsImage: { show: true },
					},
				},
				series: [
					{
						name: "Nightingale Chart",
						type: "pie",
						radius: [30, 130],
						center: ["50%", "50%"],
						roseType: "area",
						itemStyle: {
							borderRadius: 8,
						},
						data: allHomeTypes.value,
					},
				],
			};

			option && myChart.setOption(option);
		});
});
</script>

<style lang="less">
#index {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	gap: 20px;
	min-width: 315px;
	margin: 40px 30px;
	padding: 40px;
	background-color: #fff;
	border-radius: 30px;

	.chart-box {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-around;
		gap: 20px;
		min-width: 315px;
	}

	.prod-info {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		font-size: 20px;
		margin-top: 30px;
		padding: 20px;
		border: 1px solid rgb(201, 199, 199);
		border-radius: 20px;
		box-shadow: 0 0 30px 1px rgb(177, 176, 176);

		&:hover {
			box-shadow: 0 0 30px 10px rgb(177, 176, 176);
		}

		.prod-name {
			font-size: 24px;
			font-weight: 700;
		}
	}

	#main {
		width: 500px;
		height: 500px;
	}
	.income {
		width: 400px;
		height: 500px;
		display: flex;
		justify-content: center;
		align-items: center;
		.income-box {
			width: 300px;
			height: 300px;
			background-color: greenyellow;
			text-align: center;
			line-height: 300px;
			border-radius: 50%;
			font-size: 20px;
			font-weight: 700;	

			&:hover {
				color: rgb(255, 72, 0);
			}
		}
	}
}
</style>