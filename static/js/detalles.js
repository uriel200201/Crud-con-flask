//detalle = getDetalleComprobante(id)
const url = window.location.pathname
const urlSplitted = url.split('/')
const id = decodeURI(urlSplitted[2])

const $cardTemplate = document.getElementById('card-template').content
const $products = document.getElementById('products')
const fragment = document.createDocumentFragment()

const mostrarDetalle = async (id) => {
	let detalle = await getDetalleComprobante(id)

	detalle.forEach(({ id, cantidad, precio, nombre }) => {
		console.log({ id, cantidad, precio, nombre })
		$cardTemplate.querySelector('h5').textContent = nombre
		$cardTemplate.querySelectorAll('span')[0].textContent = id
		$cardTemplate.querySelectorAll('span')[1].textContent = cantidad
		$cardTemplate.querySelectorAll('span')[2].textContent =
			parseFloat(precio)
		$cardTemplate.querySelectorAll('span')[3].textContent = parseFloat(
			cantidad * precio
		)

		const clone = $cardTemplate.cloneNode(true)
		fragment.appendChild(clone)
	})

	$products.appendChild(fragment)
}

mostrarDetalle(id)
