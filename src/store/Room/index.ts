import { defineStore } from 'pinia'
import {
    reqAllRoom,
    reqGetRoomById,
    toAddRoom,
    toRemoveRoom,
    toEditRoom,
} from '@/api'

export const useRoomStore = defineStore('Room', {
    state: () => {
        return {
            msg: [],
            allRooms: []
        }
    },
    actions: {
        async allRoom(msg: any) {
            let res = await reqAllRoom(msg)
            if (res.code == 'R2004') {
                this.allRooms = res.result
            }
            return Promise.resolve(res)
        },
        async getRoomById(msg: any) {
            let res = await reqGetRoomById(msg)
            return Promise.resolve(res)

        },
        async addRoom(msg: any) {
            let res = await toAddRoom(msg)
            return Promise.resolve(res)

        },
        async removeRoom(msg: any) {
            let res = await toRemoveRoom(msg)
            return Promise.resolve(res)

        },
        async editRoom(msg: any) {
            console.log(msg);
            let res = await toEditRoom(msg)
            return Promise.resolve(res)

        },

    }
})
