// import { FILE_PATH } from '../config.js'
// const decoder = new TextDecoder()

//  export default async ({ response }) => {
//   try {
//     const data = await Deno.readFile(FILE_PATH)
//     const newData = JSON.parse(decoder.decode(data))

//     response.status = 200
//     response.body = { status: 'succes', newData}
    
//   } catch (error) {
    
//     response.status = 500
//     response.body = { status: 'failed', newData: [] }
//   }
// }
//import { db } from '../modules/db.js'

// export async function getAllAccounts(context){
//   try {
//     const allaccounts = await db.query(`SELECT * FROM accounts`)
//     console.log(allaccounts)
//     context.response.body = 'all acocounts'
//   } catch (error) {
//     console.log(error)
//   }
// }



// export async function permission(context){
//   try {
//     const get = await context.cookies.get('authorised')
//     console.log(get)
//   } catch (error) {
//     console.log(error)    
//   }
// }
