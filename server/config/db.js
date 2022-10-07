const mysql = require('mysql')
const conf = {
    database:'hotel_manage',
    user:'root',
    password:''
}

module.exports = {
    db:(sql,sqlParams = false)=>{
        const pool = mysql.createPool(conf)
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                    console.log('14:',sql,sqlParams);
                    con.query(sql,sqlParams,(err,result)=>{
                      
                        resolve(result)
                    })
                    con.release()
                }else{
                    reject(err)
                }
            })
        })
    }
}