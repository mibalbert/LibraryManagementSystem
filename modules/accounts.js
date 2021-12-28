
/* accounts.js */

import { compare, genSalt, hash } from 'https://deno.land/x/bcrypt@v0.2.4/mod.ts'

import { db } from './db.js'

const saltRounds = 10
const salt = await genSalt(saltRounds)


export async function login(data) {
	console.log(data)
	let sql = `SELECT count(id) AS count FROM accounts WHERE user="${data.username}";`
	let records = await db.query(sql)
	if(!records[0].count) throw new Error(`username "${data.username}" not found`)
	sql = `SELECT pass FROM accounts WHERE user = "${data.username}";`
	records = await db.query(sql)
	const valid = await compare(data.password, records[0].pass)
	if(valid === false) throw new Error(`invalid password for account "${data.username}"`)
	sql = `SELECT role FROM accounts WHERE user = "${data.username}";`
	const request = await db.query(sql)
	const role = request[0]
	//if(role.role === 'admin') console.log('admin is logged in')
	return { username : data.username, role : role.role}
}


export async function register(data) {
	const password = await hash(data.password, salt)
	const sql = `INSERT INTO accounts(user, pass) VALUES("${data.username}", "${password}")`
	console.log(sql)
	await db.query(sql)
	return true
}

// export async function permission(data) {
// 	console.log(data)
// 	const sql = `SELECT role FROM accounts WHERE user="${data.username}";`
// 	const records = await db.query(sql)
// 	const role = records[0].role
// 	return role
// }


export async function permission(context) {
	// if(await context.cookies.get('authenticate' === undefined))
	if(await context.cookies.get('role') === 'admin')
		return true
}









// const users = {
// 	user1 : {
// 		name : 'John',
// 		hobby : 'Fishing',
// 		age : 29
// 	},
// 	user2 : {
// 		name : 'Andreea',
// 		hobby : 'Shopping',
// 		age : 24
// 	}
// }






















// sql = `SELECT role FROM accounts WHERE user = "${data.username}";`
// const role = await db.query(sql)
// const roles = role[0].role



// //Validate user permissions
// export async function permission(){
// 	try {
// 	sql = `SELECT role FROM accounts WHERE user = "${data.username}";`
// 	roles = await db.query(sql)
// 	} catch (error) {
// 		if(!roles[0] === 'admin') throw new error.Error (`user not admin`)
// 	}
// }
// sql = `SELECT role FROM accounts WHERE user = "${data.username}";`
// 	const roles = await db.query(sql)
// 	if(!roles[0] === 'admin') throw new Error (`user not admin`)
// 	//console.log(roles[0].role)
// 	//const role = roles[0].role