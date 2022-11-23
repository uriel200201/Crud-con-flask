const enviarData = (data, update) => {
	axios
		.post(
			update === 'true'
				? `/productos/editar/${data.id}`
				: '/productos/agregar',
			data
		)
		.then((window.location.href = '/productos'))
		.catch(function (error) {
			console.error(error)
		})
}

const recibirData = async () => {
	const productos = []
	const res = await axios.get('http://localhost:3000/api/productos')
	res.data.map((producto) => {
		productos.push({
			id: producto[0],
			nombre: producto[1],
			precio: producto[2],
		})
	})
	try {
		localStorage.setItem('productos', JSON.stringify(productos))
		setHtml({ productos: JSON.parse(localStorage.getItem('productos')) })
	} catch (error) {
		console.log(error)
	}
	return productos
}

const getComprobantes = async () => {
	const comprobantes = []
	await axios
		.get('http://localhost:3000/api/comprobantes')
		.then((res) => {
			res.data.map((comprobante) => {
				comprobantes.push({
					comprobante: comprobante[0],
					fecha: comprobante[1],
					pago: comprobante[2],
					total: comprobante[3],
				})
			})
			localStorage.setItem('comprobantes', JSON.stringify(comprobantes))
		})
		.catch((error) =>
			console.log(
				'🚀 ~ file: peticiones.js ~ line 61 ~ setComprobante ~ error',
				error
			)
		)
}

const setComprobante = async (data) => {
	await axios
		.post('/api/comprobantes', data)
		.catch((error) =>
			console.log(
				'🚀 ~ file: peticiones.js ~ line 61 ~ setComprobante ~ error',
				error
			)
		)
}

const setDetalleComprobante = async (detalle) => {
	await axios
		.post('/api/comprobantes/detalles', detalle)
		.catch((error) =>
			console.log(
				'🚀 ~ file: peticiones.js ~ line 61 ~ setComprobante ~ error',
				error
			)
		)
}
