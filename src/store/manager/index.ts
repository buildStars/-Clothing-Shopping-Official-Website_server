import { defineStore } from 'pinia'
import {
    toLogin,
    toRegister,
    reqGetAccount,
    reqGetAllAccount,
    toUpdateAccount,
    toModifyPwd,
    toModifyRole,
} from '@/api'
import storage from "@/utils/localStorage";

export const useManagerStore = defineStore('mananger', {
    state: () => {
        return {
            token: '',
            allAccount: [],
            selfMsg: {}

        }
    },
    actions: {
        async login(msg: any) {
            let res = await toLogin(msg)
            return Promise.resolve(res)
        },
        async register(msg: any) {
            let res = await toRegister(msg)
            return Promise.resolve(res)

        },
        async getAccount(msg: any) {
            let res = await reqGetAccount(msg)
            this.selfMsg = res.result[0]
            return Promise.resolve(res)

        },
        async getAllAccount(msg: any) {
            let res = await reqGetAllAccount(msg)
            this.allAccount = res.result
            return Promise.resolve(res)

        },
        async updateAccount(msg: any) {
            let res = await toUpdateAccount(msg)
            return Promise.resolve(res)
        },
        async modifyPwd(msg: any) {
            let res = await toModifyPwd(msg)
            return Promise.resolve(res)
        },
        async modifyRole(msg: any) {
            let res = await toModifyRole(msg)
            return Promise.resolve(res)

        },
        async find(msg: any) {

        },
        setToken() {
            this.token = storage.getLocal('my-hotel-2022-10-4-token')
            console.log('st', this.token);

        }
    }
})
