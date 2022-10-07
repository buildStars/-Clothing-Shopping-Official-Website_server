export default {
    setLocal(name, msg) {
        //'my-hotel-2022-10-4-token'
        localStorage.setItem(name, msg)
    },
    getLocal(name) {
        return localStorage.getItem(name)
    },
    removeLocal(name){
        localStorage.removeItem(name)
    }
}