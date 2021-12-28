
/* books.js */

//import client from './db.js'
import { db } from './db.js'

// export  async function getAllUsers(ctx){
//   try {
//     const users = await client.execute(`SELECT id, user, pass FROM accounts;`)
//     console.log(users.rows)
//     ctx.response.body = users.rows

//   } catch (error) {
//    console.log(error) 
//   }
// }



export async function addProduct(data){
    console.log('addProduct()')
    //console.log(data)
    data.fields.username = data.username
    data.files[0].username = data.username
    data.fields.avatar = await saveAvatar(data.files[0])
    data.fields.insertID = await addProdDetails(data.fields)

}


//Save avatar with a new name in a new location(uploads)
async function saveAvatar(file){
    let filename = ''
    if(file.contentType !== 'Application/octet-stream') {
        const ext = file.filename.split('.').pop()
        filename = `${file.username} - ${Date.now()}.${ext}`
        await Deno.rename(file.filename, `${Deno.cwd()}/public/uploads/${filename}`)
    }
    return filename
}

//Adds product to the products table
async function addProdDetails(data){
    console.log(data)
    const sql = `INSERT INTO product(productType, productName, productDescription, productPrice, productPhoto)\
    VALUES("${data.types}","${data.productName}", "${data.description}","${data.price}","${data.avatar}")`
    const sql2 = sql.replaceAll('""', 'NULL')
    console.log(sql2)
    const result = await db.query(sql)
    console.log(result)
    return result.lastInsertId
}