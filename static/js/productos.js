document.addEventListener('DOMContentLoaded', recibirData())
const $templateProducto = document.getElementById('tbody-template').content
const $tbody = document.getElementById('tbody')
const fragment = document.createDocumentFragment()
const botones = document.querySelectorAll('.btn-eliminar')

const setHtml = ({ productos }) => {
	productos.forEach(({ id, nombre, precio }) => {
		$templateProducto.querySelector('th').textContent = id
		$templateProducto.querySelectorAll('td')[0].textContent = nombre
		$templateProducto.querySelectorAll('td')[1].textContent = `$ ${precio}`
		$templateProducto.querySelector(
			'.btn-editar'
		).href = `/productos/editar/${id}`
		$templateProducto.querySelector('.btn-eliminar').dataset.id = `${id}`
		$templateProducto.querySelector(
			'.btn-eliminar'
		).name = `btn-eliminar${id}`

		const clone = $templateProducto.cloneNode(true)
		fragment.appendChild(clone)
	})
	$tbody.appendChild(fragment)
	botones.forEach((boton) => {
		boton.addEventListener('click', (e) => {
			e.preventDefault()
			const id = e.target.dataset.id
			console.log(id)
			if (e.target.name === `btn-eliminar${id}`) {
				if (confirm(`¿Desea eliminar el producto: ${id}?`)) {
					window.location.href = `/productos/eliminar/${id}`
				}
			}
		})
	})
}
