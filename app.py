from flask_mysqldb import MySQL
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_cors import CORS

req = request
PORT = 3000

app = Flask(__name__)
app.secret_key = 'Uriel'
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'tienda'
mysql = MySQL(app)

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/productos', methods =['GET', 'POST'])
def producto():
	cursor = mysql.connection.cursor()
	cursor.execute('SELECT * FROM productos ORDER BY id DESC')
	data = cursor.fetchall()
	return jsonify(data)


@app.route('/api/comprobantes', methods =['GET', 'POST'])
def comprobante():
	if req.method == 'POST':
		comprobante = []
		venta = req.get_json(force=True)
		print(venta)
		for data in venta.values():
			comprobante.append(data)
		cursor = mysql.connection.cursor()
		cursor.execute(f'INSERT INTO comprobantes VALUES ("{comprobante[0]}","{comprobante[1]}",{comprobante[2]}, {float(comprobante[3])})')
		mysql.connection.commit()
		return redirect(url_for('index'))

	elif req.method == 'GET':
		cursor = mysql.connection.cursor()
		cursor.execute('SELECT * FROM comprobantes ORDER BY comprobante DESC')
		data = cursor.fetchall()
		return jsonify(data)

@app.route('/api/comprobantes/detalles', methods = ['GET', 'POST'])
def detalles():
	if req.method == 'POST':
		comprobante = []
		venta = req.get_json(force=True)
		print(venta)
		for data in venta.values():
			comprobante.append(data)
		cursor = mysql.connection.cursor()
		cursor.execute(f'INSERT INTO detalle_comprobantes VALUES ("{comprobante[0]}",{int(comprobante[1])},{int(comprobante[2])}, {float(comprobante[3])})')
		mysql.connection.commit()
		return redirect(url_for('index'))

# * Página de inicio
@app.route('/')
def index():
	return render_template('index.html', active = 'inicio', title = 'Inicio')

# * Productos
@app.route('/productos', methods = ['GET'])
def productos():
		title = 'Productos'
		return render_template('productos.html', active = 'producto', title = title)

@app.route('/productos/agregar', methods = ['GET','POST'])
def agregarProducto():
	if req.method == 'POST':
		producto = []
		form = req.get_json(force=True)
		print(form)
		for data in form.values():
			producto.append(data)
		
		cursor = mysql.connection.cursor()
		cursor.execute(f'INSERT INTO productos VALUES ({int(producto[0])},"{producto[1]}",{float(producto[2])})')
		mysql.connection.commit()
		flash('Producto Agregado Satisfactoriamente')
		return redirect(url_for('productos'))

	elif req.method == 'GET':
		title = 'Productos'
		return render_template('agregarProducto.html', title = title, active = 'producto', update = 'false')

@app.route('/productos/editar/<id>', methods = ['GET','POST'])
def editarProducto(id):
	if req.method == 'GET':
		cur = mysql.connection.cursor()
		cur.execute(f'SELECT * FROM productos WHERE id = {int(id)}')
		data = cur.fetchall()
		return render_template('agregarProducto.html', producto = data[0], active = 'producto', update = 'true')
	elif req.method == 'POST':
		producto = []
		form = req.get_json(force=True)
		for data in form.values():
			producto.append(data)
		cur = mysql.connection.cursor()
		cur.execute(f'UPDATE productos SET nombre = "{producto[1]}", precio_uni = {float(producto[2])} WHERE productos.id = {id}')
		mysql.connection.commit()
		flash('Producto Modificado Satisfactoriamente')
		return redirect(url_for('productos'))

@app.route('/productos/eliminar/<id>')
def eliminarProducto(id):
	cursor = mysql.connection.cursor()
	cursor.execute(f'DELETE FROM productos WHERE id = {id}')
	mysql.connection.commit()
	flash('Alumno Eliminado Satisfactoriamente')
	return redirect(url_for('productos'))

if __name__ == '__main__':
	app.run(port=PORT, debug=True)