import { defineStore } from 'pinia'
import {
    reqAllHomeType,
    reqGetHomeTypeById,
    toRemoveHomeTypeById,
    toAddHomeType,
} from '@/api'

export const useHomeTypeStore = defineStore('HomeType', {
    state: () => {
        return {
            msg: [],
            allHomeTypes: []
        }
    },
    actions: {
        async allHomeType(msg: any) {
            let res = await reqAllHomeType(msg)
            this.allHomeTypes = res.result
            return Promise.resolve(res);
        },
        async getHomeTypeById(msg: any) {
            let res = await reqGetHomeTypeById(msg)
            return Promise.resolve(res);

        },
        async removeHomeTypeById(msg: any) {
            let res = await toRemoveHomeTypeById(msg)
            return Promise.resolve(res);

        },
        async addHomeType(msg: any) {
            let res = await toAddHomeType(msg)
            return Promise.resolve(res);
        },


    }
})
