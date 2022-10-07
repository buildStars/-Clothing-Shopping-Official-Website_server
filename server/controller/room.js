const room = require('../model/room')
const imgRW = require('../utils/imgRW')

exports.allRoom = async (req, resp, next) => {
    try {
        let res = await room.allRoom(req.query)
        resp.send(res)
    } catch (error) {
        next(error)
    }
}

exports.getRoomById = async (req, resp, next) => {
    try {
        let res = await room.getRoomById(req.query)
        resp.send(res)
    } catch (error) {
        next(error)
    }
}

exports.addRoom = async (req, resp, next) => {
    try {
        let res = await room.addRoom(req.body)
        resp.send(res)
    } catch (error) {
        next(error)
    }
}

exports.removeRoom = async (req, resp, next) => {
    try {
        let res = await room.removeRoom(req.body)
        resp.send(res)
    } catch (error) {
        next(error)
    }
}

exports.editRoom = async (req, resp, next) => {
    try {
        let res = await room.editRoom(req.body)
        resp.send(res)
    } catch (error) {
        next(error)
    }
}

exports.editRoomImg = async (req, resp, next) => {
    try {
        console.log('roomimg', req.file, req.body);

        let lastname = await imgRW(req)
        let res = await room.editRoomImg({
            home_image: '/img/' + lastname,
            token: req.body.token,
            id: +req.body.id
        })
        resp.send(res)


        // let res = await room.editRoomImg(req.body)
        // resp.send(res)
    } catch (error) {
        next(error)
    }
}