import { defineStore } from 'pinia'
import {
    reqAllClient,
    toAddClient,

} from '@/api'

export const useClientStore = defineStore('client', {
    state: () => {
        return {

            allClients: []
        }
    },
    actions: {
        async allClient(msg: any) {
            let res = await reqAllClient(msg)
            if(res.code == "C2000"){
                this.allClients = res.result
            }
            return Promise.resolve(res)
        },
        async addClient(msg: any) {

            console.log("addC",msg);
            
            let res = await toAddClient(msg)
            return Promise.resolve(res)

        },


    }
})
