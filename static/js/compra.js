document.addEventListener('DOMContentLoaded', getComprobantes())
const $botonesPago = document.getElementsByClassName('tipo-pago')
console.log('🚀 ~ file: compra.js ~ line 3 ~ $botonesPago', $botonesPago)

function padTo2Digits(num) {
	return num.toString().padStart(2, '0')
}

function formatDate(date) {
	return (
		[
			date.getFullYear(),
			padTo2Digits(date.getMonth() + 1),
			padTo2Digits(date.getDate()),
		].join('-') +
		' ' +
		[
			padTo2Digits(date.getHours()),
			padTo2Digits(date.getMinutes()),
			padTo2Digits(date.getSeconds()),
		].join(':')
	)
}

const compra = async (tipoPago = 3) => {
	let pago
	switch (tipoPago) {
		case 'debito':
			pago = 1
			break
		case 'credito':
			pago = 2
			break
		case 'efectivo':
			pago = 3
			break
	}
	const carrito = JSON.parse(localStorage.getItem('carrito'))
	const preciosCantidad = carrito.map(
		(producto) => parseFloat(producto.precio) * parseInt(producto.cantidad)
	)

	const total = parseFloat(preciosCantidad.reduce((a, b) => a + b, 0))
	console.log('🚀 ~ file: compra.js ~ line 39 ~ compra ~ carrito', carrito)
	const fecha = formatDate(new Date())
	const comprobante = fecha
	const data = {
		comprobante,
		fecha,
		pago,
		total,
	}
	try {
		await setComprobante(data)

		await carrito.forEach((producto) => {
			const detalle = {
				comprobante,
				id: producto.id,
				cantidad: producto.cantidad,
				precioUnitario: parseFloat(producto.precio),
			}
			setDetalleComprobante(detalle)
		})
		window.localStorage.removeItem('carrito')
		setCarrito([])
	} catch (error) {
		console.log(error)
	}
}

Object.values($botonesPago).map((boton) =>
	boton.addEventListener('click', (e) => {
		console.log('click')
		const tipoPago = e.target.id
		compra(tipoPago)
	})
)
