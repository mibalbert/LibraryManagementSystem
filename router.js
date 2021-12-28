import {Router} from 'https://deno.land/x/oak/mod.ts'
import { Handlebars } from 'https://deno.land/x/handlebars/mod.ts'
import { login, register, permission } from './modules/accounts.js'
//import { addProduct } from './modules/books.js'



const router = new Router()
const handle = new Handlebars({ defaultLayout: '' })



// the routes defined here
router.get('/', async context => {
		const authorised = await context.cookies.get('authorised')
    const data =  {authorised}
		console.log(data)
		const body = await handle.renderView('home',data)
    context.response.body = body
})

router.get('/login', async context => {
	const body = await handle.renderView('login')
	context.response.body = body
})

router.get('/register', async context => {
	const body = await handle.renderView('register')
	context.response.body = body
})

router.post('/register', async context => {
	console.log('POST /register')
	const body = context.request.body({ type: 'form' })
	const value = await body.value
	const obj = Object.fromEntries(value)
	console.log(obj)
	await register(obj)
	context.response.redirect('/login')
})

router.get('/logout', context  => {
  // context.cookies.set('authorised', null) // this does the same
  context.cookies.delete('authorised')
	context.cookies.delete('role')
  context.response.redirect('/')
})

router.post('/login', async context => {
	console.log('POST /login')
	const body = context.request.body({ type: 'form' })
	const value = await body.value
	const obj = Object.fromEntries(value)
	console.log(obj)
	try {
		const getLogged = await login(obj)
		console.log(`the role is ${getLogged.role} and the username is ${getLogged.username}`)
		context.cookies.set('authorised', getLogged.username)
		context.cookies.set('role', getLogged.role)
		context.response.redirect('/')
	} catch(err) {
		console.log(err)
		context.response.redirect('/login')
	}
})


router.get('/permission', async context => {
		if(permission(context))
		console.log('it worked')
		const data  = await handle.renderView('noCredentials')
		context.response.body = data
})


// Show Add Products page
router.get('/addBooks', async context =>{
    console.log('GET /new')
    const authorised = await context.cookies.get('authorised')
		const permission = await context.cookies.get('role')
		console.log(permission)
		if(authorised === undefined) 
		context.response.redirect('/login')
		if(permission === 'student')
		context.response.redirect('/')
	  const body = await handle.renderView('addBooks', {authorised})
    context.response.body = body
		//
})



// router.get('/something/:name', async context =>{
// 	//const name = await context.cookies.get('authorised')
// 	const users = {
// 		user1 : {
// 			name : 'John',
// 			hobby : 'Fishing',
// 			age : 29
// 		},
// 		user2 : {
// 			name : 'Andreea',
// 			hobby : 'Shopping',
// 			age : 24
// 		}
// 	}
// 	context.send.url.searchParams.set(users)
	
// 	const body = await handle.renderView('noCredentials', {name: context.request.url.searchParams.get})
// 	context.response.body = body 
// })





//Submit the form with the product 
router.post('/addBooks', async context =>{
    console.log('POST /new')
    const body = await context.request.body({ type: 'form-data'})
    const data = await body.value.read()
    data.username = await context.cookies.get('authorised')
    await addProduct(data)
    context.response.redirect('/')
})





// router.get('/getBooks',  async context =>{
// 	console.log('GET /new')
// 	const authorised = await context.cookies.get('admin')
// 	if(authorised === undefined) {
// 		context.response.redirect('/login')
// 		console.log(`sorry don't have credentials`)
// 	}
// 	if(!authorised === 'admin') context.response.redirect('/noCredentials')
// 	const book = {
// 		name: "The great escape",
// 		year: 1998,
// 		inStock: true
// 	}

// 	const body = await handle.renderView('getBooks', {authorised})
// 	context.response.body = body
// })



export default router



































// /* routes.js */

// import { Router } from 'https://deno.land/x/oak@v6.5.1/mod.ts'
// import { Handlebars } from 'https://deno.land/x/handlebars/mod.ts'
// //  import { upload } from 'https://cdn.deno.land/oak_upload_middleware/versions/v2/raw/mod.ts'
// //  import { parse } from 'https://deno.land/std/flags/mod.ts'

// import { login, register } from './modules/accounts.js'
// import { addProduct } from './modules/products.js'
// import { getProd } from './modules/products.js'



// const handle = new Handlebars({ defaultLayout: '' })

// const router = new Router()

// // the routes defined here
// router.get('/', async context => {
// 	const authorised = context.cookies.get('authorised')
//     const data = {authorised}
//     const body = await handle.renderView('home',data)
//     context.response.body = body
// })

// router.get('/login', async context => {
// 	const body = await handle.renderView('login')
// 	context.response.body = body
// })

// router.get('/register', async context => {
// 	const body = await handle.renderView('register')
// 	context.response.body = body
// })

// router.post('/register', async context => {
// 	console.log('POST /register')
// 	const body = context.request.body({ type: 'form' })
// 	const value = await body.value
// 	const obj = Object.fromEntries(value)
// 	console.log(obj)
// 	await register(obj)
// 	context.response.redirect('/login')
// })

// router.get('/logout', context => {
//   // context.cookies.set('authorised', null) // this does the same
//   context.cookies.delete('authorised')
//   context.response.redirect('/')
// })

// router.post('/login', async context => {
// 	console.log('POST /login')
// 	const body = context.request.body({ type: 'form' })
// 	const value = await body.value
// 	const obj = Object.fromEntries(value)
// 	console.log(obj)
// 	try {
// 		const username = await login(obj)
// 		context.cookies.set('authorised', username)
// 		context.response.redirect('/')
// 	} catch(err) {
// 		console.log(err)
// 		context.response.redirect('/login')
// 	}
// })

// // Show Add Products page
// router.get('/new', async context =>{
//     console.log('GET /new')
//     const authorised = context.cookies.get('authorised')
//     if(authorised === undefined) context.response.redirect('/login')
// 	const body = await handle.renderView('/new')
//     context.response.body = body
// })


// //Submit the form with the product 
// router.post('/new', async context =>{
//     console.log('POST /new')
//     const body = await context.request.body({ type: 'form-data'})
//     const data = await body.value.read()
//     data.username = context.cookies.get('authorised')
//     await addProduct(data)
//     context.response.redirect('/')
// })


// router.get('/all', async context =>{
//     console.log('GET /all')
//     const authorised = context.cookies.get('authorised')
//     if(authorised === undefined) context.response.redirect('/login')
//     await getProd()
//     const data = JSON.stringify(await Deno.readTextFile('./public/uploads/somejs.json'))
//     const body = await handle.renderView('all',data)
//     context.response.body = body
// })

// export default router
