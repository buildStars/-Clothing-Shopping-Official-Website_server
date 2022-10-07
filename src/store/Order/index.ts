import { defineStore } from 'pinia'
import {
    reqAllOrder,
    toAddOrder,
    toRemoveOrderById,

} from '@/api'

export const useOrderStore = defineStore('Order', {
    state: () => {
        return {
            msg: [],
            allOrders: []
        }
    },
    actions: {
        async allOrder(msg: any) {
            let res = await reqAllOrder(msg)
            return Promise.resolve(res)
        },
        async addOrder(msg: any) {
            let res = await toAddOrder(msg)
            return Promise.resolve(res)

        },
        async removeOrderById(msg: any) {
            let res = await toRemoveOrderById(msg)
            return Promise.resolve(res)

        },

    }
})
