import request from "./request";

export const toLogin = (msg) => {
    return request.post('/manager/login', msg)
}

export const toRegister = (msg) => {
    return request.post('/manager/register', msg)
}

export const reqGetAccount = (msg) => {
    return request.get('/manager/getAccount', {
        data: msg
    })
}

export const reqGetAllAccount = (msg) => {
    return request.get('/manager/getAllAccount', {
        data: msg
    })
}

export const toUpdateAccount = (msg) => {
    return request.post('/manager/updateAccount', msg)
}

export const toModifyPwd = (msg) => {
    return request.post('/manager/modifyPwd', msg)
}

export const toModifyRole = (msg) => {
    return request.post('/manager/modifyRole', msg)
}

export const reqAllHomeType = (msg) => {
    return request.get('/homeType/allHomeType', {
        data: msg
    })
}

export const reqGetHomeTypeById = (msg) => {
    return request.get('/homeType/getHomeTypeById', {
        data: msg
    })
}

export const toRemoveHomeTypeById = (msg) => {
    return request.post('/homeType/removeHomeTypeById', msg)
}

export const toAddHomeType = (msg) => {
    return request.post('/homeType/addHomeType', msg)
}

export const reqAllRoom = (msg) => {
    return request.get('/room/allRoom', {
        data: msg
    })
}

export const reqGetRoomById = (msg) => {
    return request.get('/room/getRoomById', {
        data: msg
    })
}

export const toAddRoom = (msg) => {
    return request.post('/room/addRoom', msg)
}

export const toRemoveRoom = (msg) => {
    return request.post('/room/removeRoom', msg)
}

export const toEditRoom = (msg) => {
    return request.post('/room/editRoom', msg)
}


export const reqAllClient = (msg) => {
    return request.get('/client/allClient', {
        data: msg
    })
}

export const toAddClient = (msg) => {
    return request.post('/client/addClient', msg)
}

export const reqAllOrder = (msg) => {
    return request.get('/order/allOrder', {
        data: msg
    })
}

export const toAddOrder = (msg) => {
    return request.post('/order/addOrder', msg)
}

export const toRemoveOrderById = (msg) => {
    return request.post('/order/removeOrderByIdr', msg)
}
