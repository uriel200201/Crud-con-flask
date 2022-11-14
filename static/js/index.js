const carrito = JSON.parse(localStorage.getItem('carrito')) || []
const $selectProducto = document.getElementById('productos')
const $precio = document.getElementById('precio')
const $btnEnviar = document.getElementById('enviar')
const $buttonGroup = document.getElementById('button-group')
const $cantidad = document.getElementById('cantidad')
// tabla
const $items = document.getElementById('items')
const $botones = document.getElementsByClassName('botones')
const $templateProducto = document.getElementById('tbody-template').content
const $tbody = document.getElementById('items')
const fragment = document.createDocumentFragment()
const botones = document.querySelectorAll('.btn-eliminar')
// tabla footer
const $tFooter = document.getElementById('footer')
const $templateFooter = document.getElementById('tfoot-template').content

const setFooter = () => {}

const setCarrito = (carrito) => {
	console.log('🚀 ~ file: index.js ~ line 21 ~ setCarrito ~ carrito', carrito)
	$items.innerHTML = ''
	const preciosValue = []
	if (carrito.length > 0) {
		carrito.forEach(({ id, nombre, precio, cantidad }) => {
			const productos = JSON.parse(localStorage.getItem('productos'))
			const producto = productos.find(
				(producto) => Number(producto.id) === Number(id)
			)
			if (producto) {
				const total = parseFloat(precio) * parseInt(cantidad)
				preciosValue.push(parseFloat(total))
				$templateProducto.querySelector('th').textContent = nombre
				$templateProducto.querySelectorAll(
					'td'
				)[0].textContent = `$ ${total.toFixed(2)}`
				$templateProducto.querySelectorAll('td')[1].innerHTML = `
				<div class="flex items-center space-x-3">
							<button type="button"
								class="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white rounded-full border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onclick="deleteOneToCart(${id})">
								<span class="sr-only">Quantity button</span>
								<svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
							</button>
							<div>
								<input type="number" readonly class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" value="${cantidad}">
							</div>
							<button class="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white rounded-full border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button"
								onclick="addToCart(${id})">
								<span class="sr-only">Quantity button</span>
															<svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
													</button>
						</div>
				`
				$templateProducto.querySelectorAll('td')[2].innerHTML = `
						<button type="button"
							class="btn-eliminar text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 lg:font-medium rounded-lg text-sm md:px-5 md:py-2.5 py-1 px-2 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900" onclick="deleteToCart(${id})">
							Eliminar
						</button>
						`
			}
			const clone = $templateProducto.cloneNode(true)
			fragment.appendChild(clone)
		})
		$tbody.appendChild(fragment)
		// console.log(preciosValue)
		const $neto = document.getElementById('neto')
		const neto = preciosValue.reduce((a, b) => a + b, 0)
		$neto.innerText = neto.toFixed(2)
	}
}

const setHtml = (data) => {
	const { productos } = data
	$selectProducto.innerHTML =
		'<option value="">Seleccione un producto</option>'
	productos.forEach((producto) => {
		$selectProducto.innerHTML += `<option value="${producto.id}">${producto.nombre}</option>`
	})
	document.getElementById('cantidad').innerHTML = 0
	$precio.innerHTML = ''
	setCarrito(carrito)
	console.log('🚀 ~ file: index.js ~ line 82 ~ setHtml ~ carrito', carrito)
}

const addToCart = (idProduct, cantidad = 1) => {
	let productos = JSON.parse(localStorage.getItem('productos'))
	const newItem = productos.find(
		(product) => product.id === Number(idProduct)
	)

	const itemInCart = carrito.find(({ id }) => id === newItem.id)
	console.log(
		'🚀 ~ file: index.js ~ line 102 ~ addToCart ~ itemInCart',
		itemInCart
	)
	if (itemInCart) {
		carrito.forEach((item) =>
			item.id === newItem.id ? (item.cantidad += 1) : item
		)
		localStorage.setItem('carrito', JSON.stringify(carrito))
		recibirData()
	} else {
		carrito.push({ ...newItem, cantidad: cantidad })
		localStorage.setItem('carrito', JSON.stringify(carrito))
		recibirData()
	}
}

const deleteOneToCart = (idProduct) => {
	let productos = JSON.parse(localStorage.getItem('productos'))
	const itemToDelete = productos.find(
		(product) => product.id === Number(idProduct)
	)

	const itemInCart = carrito.find(({ id }) => id === itemToDelete.id)
	// console.log(
	// 	'🚀 ~ file: index.js ~ line 102 ~ deleteOneToCart ~ itemInCart',
	// 	itemInCart
	// )

	if (itemInCart && itemInCart.cantidad > 1) {
		carrito.map((item) =>
			Number(item.id) === Number(itemToDelete.id)
				? (item.cantidad -= 1)
				: item
		)
		localStorage.setItem('carrito', JSON.stringify(carrito))
		recibirData()
	} else {
		deleteToCart(itemToDelete.id)
	}
}

const deleteToCart = (idProduct) => {
	let productos = JSON.parse(localStorage.getItem('productos'))
	const itemToDelete = productos.find(
		(product) => product.id === Number(idProduct)
	)

	const itemInCart = carrito.find(({ id }) => id === itemToDelete.id)

	if (itemInCart) {
		const newCarrito = carrito.filter((item) => item.id != itemInCart.id)
		console.log(newCarrito)
		if (newCarrito.length > 0) {
			localStorage.setItem('carrito', JSON.stringify(newCarrito))
		} else {
			localStorage.removeItem('carrito')
		}
		window.location.href = '/'
	}
}

$selectProducto.addEventListener('change', () => {
	let productos = JSON.parse(localStorage.getItem('productos'))
	const producto = productos.find(({ id }) => id == $selectProducto.value)
	$btnEnviar.classList.remove('cursor-not-allowed')
	$btnEnviar.disabled = false
	$precio.innerText = `$ ${producto.precio}`
	$cantidad.innerText = 1
	$btnEnviar.dataset.id = producto.id
})

$btnEnviar.addEventListener('click', () => {
	let cantidadValue = parseInt($cantidad.innerHTML)
	addToCart($btnEnviar.dataset.id, cantidadValue)
})

$buttonGroup.addEventListener('click', (e) => {
	let cantidadValue = parseInt($cantidad.innerHTML)
	if (e.target.id == 'sumar') $cantidad.innerHTML = cantidadValue + 1
	if (e.target.id == 'restar' && cantidadValue > 0)
		$cantidad.innerHTML = cantidadValue - 1
})

document.addEventListener('DOMContentLoaded', () => {
	recibirData()
})
