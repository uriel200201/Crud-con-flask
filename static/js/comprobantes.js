document.addEventListener('DOMContentLoaded', getComprobantes())
const $templateComprobantes = document.getElementById('tbody-template').content
const $tbody = document.getElementById('tbody')
const fragment = document.createDocumentFragment()

const padTo2Digits = (num) => {
	return num.toString().padStart(2, '0')
}

const formatDate = (date) => {
	return [
		padTo2Digits(date.getDate()),
		padTo2Digits(date.getMonth() + 1),
		date.getFullYear(),
	].join('/')
}

const setHTML = () => {
	const comprobantes = JSON.parse(localStorage.getItem('comprobantes'))
	comprobantes.forEach(({ comprobante, fecha, pago, total }) => {
		switch (pago) {
			case 1:
				pago = 'Débito'
				break
			case 2:
				pago = 'Crédito'
				break
			case 3:
				pago = 'Efectivo'
				break

			default:
				break
		}

		const fechaUnparsed = new Date(fecha)
		const fechaParsed = formatDate(fechaUnparsed)

		$templateComprobantes.querySelector('th').textContent = comprobante
		$templateComprobantes.querySelector('th').dataset.id = `${comprobante}`
		$templateComprobantes.querySelectorAll('td')[0].textContent =
			fechaParsed
		$templateComprobantes.querySelectorAll(
			'td'
		)[0].dataset.id = `${comprobante}`
		$templateComprobantes.querySelectorAll('td')[1].textContent = pago
		$templateComprobantes.querySelectorAll(
			'td'
		)[1].dataset.id = `${comprobante}`
		$templateComprobantes.querySelectorAll(
			'td'
		)[2].textContent = `$${total}`
		$templateComprobantes.querySelectorAll(
			'td'
		)[2].dataset.id = `${comprobante}`

		const clone = $templateComprobantes.cloneNode(true)
		fragment.appendChild(clone)
	})
	$tbody.appendChild(fragment)

	const filas = $tbody.querySelectorAll('tr')
	//console.log('🚀 ~ file: productos.js ~ line 6 ~ botones', filas)
	Object.values(filas).forEach((fila) => {
		fila.addEventListener('click', (e) => {
			e.preventDefault()
			//console.log(e.target)
			const id = e.target.dataset.id
			//console.log(id)

			if (id) {
				window.location.href = `/comprobantes/${id}`
			}
		})
	})
}
