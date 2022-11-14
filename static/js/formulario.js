const formulario = document.getElementById('form')
const inputs = document.querySelectorAll('#form input')
const mensajeId = document.getElementById('mensaje_id')
const mensajeNom = document.getElementById('mensaje_nom')
const mensajeVal = document.getElementById('mensaje_val')

const expresiones = {
	id: /^\d{3,11}$/,
	nombre: /^[a-zA-ZÀ-ÿ\s\d\u00f1\u00d1\_\-]{2,20}$/,
	valor: /^\d{1,10}\.\d{0,2}$/,
}

const validarForm = (e) => {
	switch (e.target.name) {
		case 'id':
			expresiones.id.test(e.target.value)
				? mensajeId.classList.add('hidden')
				: mensajeId.classList.remove('hidden')
			break
		case 'nombre':
			expresiones.nombre.test(e.target.value)
				? mensajeNom.classList.add('hidden')
				: mensajeNom.classList.remove('hidden')
			break
		case 'valor':
			expresiones.valor.test(e.target.value)
				? mensajeVal.classList.add('hidden')
				: mensajeVal.classList.remove('hidden')
			break
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarForm)
	input.addEventListener('blur', validarForm)
})

formulario.addEventListener('submit', (e) => {
	e.preventDefault()
	if (
		mensajeNom.classList.contains('hidden') &&
		mensajeVal.classList.contains('hidden') &&
		mensajeId.classList.contains('hidden')
	) {
		const data = {
			id: inputs[0].value,
			nombre: inputs[1].value,
			valor: inputs[2].value,
		}
		const update = inputs[3].value
		enviarData(data, update)
	}
})
