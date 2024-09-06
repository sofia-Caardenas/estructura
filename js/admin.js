document.addEventListener('DOMContentLoaded', () => {
    // Recuperar datos del Local Storage
    usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    productos = JSON.parse(localStorage.getItem('productos')) || [];
    pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    historial = JSON.parse(localStorage.getItem('historial')) || [];
    notificaciones = JSON.parse(localStorage.getItem('notificaciones')) || [];

    // Renderizar tablas
    renderTable('usuarios-table', usuarios, 'editUsuario', 'deleteUsuario');
    renderTable('productos-table', productos, 'editProducto', 'deleteProducto');
    renderTable('pedidos-table', pedidos, 'editPedido', 'deletePedido');
    renderTable('historial-table', historial, 'editHistorial', 'deleteHistorial');
    renderTable('notificaciones-table', notificaciones, 'editNotificacion', 'deleteNotificacion');

    // Configurar eventos de los formularios
    document.querySelector('#usuarioForm').addEventListener('submit', guardarUsuario);
    document.querySelector('#productoForm').addEventListener('submit', guardarProducto);
    document.querySelector('#pedidoForm').addEventListener('submit', guardarPedido);
    document.querySelector('#historialForm').addEventListener('submit', guardarHistorial);
    document.querySelector('#notificacionForm').addEventListener('submit', guardarNotificacion);

    // Mostrar sección inicial
    showSection('usuarios');
});

function guardarUsuario(event) {
    event.preventDefault();
    const id = parseInt(document.querySelector('#userId').value);
    const nombre = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;
    const telefono = document.querySelector('#telefono').value;
    const direccion = document.querySelector('#direccion').value;
    const fechaRegistro = document.querySelector('#fechaRegistro').value;

    if (isNaN(id)) {
        const nuevoId = usuarios.length ? usuarios[usuarios.length - 1].idUsuario + 1 : 1;
        usuarios.push({ idUsuario: nuevoId, nombre, email, telefono, direccion, fechaRegistro });
    } else {
        const usuario = usuarios.find(u => u.idUsuario === id);
        usuario.nombre = nombre;
        usuario.email = email;
        usuario.telefono = telefono;
        usuario.direccion = direccion;
        usuario.fechaRegistro = fechaRegistro;
    }

    // Guardar en Local Storage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    document.querySelector('#usuarioForm').reset();
    showSection('usuarios');
    renderTable('usuarios-table', usuarios, 'editUsuario', 'deleteUsuario');
}

function editUsuario(id) {
    const usuario = usuarios.find(u => u.idUsuario === id);
    document.querySelector('#userId').value = usuario.idUsuario;
    document.querySelector('#nombre').value = usuario.nombre;
    document.querySelector('#email').value = usuario.email;
    document.querySelector('#telefono').value = usuario.telefono;
    document.querySelector('#direccion').value = usuario.direccion;
    document.querySelector('#fechaRegistro').value = usuario.fechaRegistro;
    showSection('usuarios');
}

function deleteUsuario(id) {
    usuarios = usuarios.filter(u => u.idUsuario !== id);
    // Guardar en Local Storage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    renderTable('usuarios-table', usuarios, 'editUsuario', 'deleteUsuario');
}

function guardarProducto(event) {
    event.preventDefault();
    const id = parseInt(document.querySelector('#productoId').value);
    const nombre = document.querySelector('#productoNombre').value;
    const descripcion = document.querySelector('#descripcion').value;
    const precio = parseFloat(document.querySelector('#precio').value);
    const stock = parseInt(document.querySelector('#stock').value);
    const fechaAgregado = document.querySelector('#fechaAgregado').value;

    if (isNaN(id)) {
        const nuevoId = productos.length ? productos[productos.length - 1].idProducto + 1 : 1;
        productos.push({ idProducto: nuevoId, nombre, descripcion, precio, stock, fechaAgregado });
    } else {
        const producto = productos.find(p => p.idProducto === id);
        producto.nombre = nombre;
        producto.descripcion = descripcion;
        producto.precio = precio;
        producto.stock = stock;
        producto.fechaAgregado = fechaAgregado;
    }

    // Guardar en Local Storage
    localStorage.setItem('productos', JSON.stringify(productos));

    document.querySelector('#productoForm').reset();
    showSection('productos');
    renderTable('productos-table', productos, 'editProducto', 'deleteProducto');
}

function editProducto(id) {
    const producto = productos.find(p => p.idProducto === id);
    document.querySelector('#productoId').value = producto.idProducto;
    document.querySelector('#productoNombre').value = producto.nombre;
    document.querySelector('#descripcion').value = producto.descripcion;
    document.querySelector('#precio').value = producto.precio;
    document.querySelector('#stock').value = producto.stock;
    document.querySelector('#fechaAgregado').value = producto.fechaAgregado;
    showSection('productos');
}

function deleteProducto(id) {
    productos = productos.filter(p => p.idProducto !== id);
    // Guardar en Local Storage
    localStorage.setItem('productos', JSON.stringify(productos));
    renderTable('productos-table', productos, 'editProducto', 'deleteProducto');
}

function guardarPedido(event) {
    event.preventDefault();
    const id = parseInt(document.querySelector('#pedidoId').value);
    const idUsuario = parseInt(document.querySelector('#pedidoUsuarioId').value);
    const fechaPedido = document.querySelector('#fechaPedido').value;
    const estado = document.querySelector('#estado').value;
    const total = parseFloat(document.querySelector('#total').value);

    if (isNaN(id)) {
        const nuevoId = pedidos.length ? pedidos[pedidos.length - 1].idPedido + 1 : 1;
        pedidos.push({ idPedido: nuevoId, idUsuario, fechaPedido, estado, total });
    } else {
        const pedido = pedidos.find(p => p.idPedido === id);
        pedido.idUsuario = idUsuario;
        pedido.fechaPedido = fechaPedido;
        pedido.estado = estado;
        pedido.total = total;
    }

    // Guardar en Local Storage
    localStorage.setItem('pedidos', JSON.stringify(pedidos));

    document.querySelector('#pedidoForm').reset();
    showSection('pedidos');
    renderTable('pedidos-table', pedidos, 'editPedido', 'deletePedido');
}

function editPedido(id) {
    const pedido = pedidos.find(p => p.idPedido === id);
    document.querySelector('#pedidoId').value = pedido.idPedido;
    document.querySelector('#pedidoUsuarioId').value = pedido.idUsuario;
    document.querySelector('#fechaPedido').value = pedido.fechaPedido;
    document.querySelector('#estado').value = pedido.estado;
    document.querySelector('#total').value = pedido.total;
    showSection('pedidos');
}

function deletePedido(id) {
    pedidos = pedidos.filter(p => p.idPedido !== id);
    // Guardar en Local Storage
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    renderTable('pedidos-table', pedidos, 'editPedido', 'deletePedido');
}

function guardarHistorial(event) {
    event.preventDefault();
    const id = parseInt(document.querySelector('#historialId').value);
    const idUsuario = parseInt(document.querySelector('#historialUsuarioId').value);
    const idPedido = parseInt(document.querySelector('#historialPedidoId').value);
    const fechaPedido = document.querySelector('#historialFechaPedido').value;
    const estado = document.querySelector('#historialEstado').value;
    const total = parseFloat(document.querySelector('#historialTotal').value);

    if (isNaN(id)) {
        const nuevoId = historial.length ? historial[historial.length - 1].idHistorial + 1 : 1;
        historial.push({ idHistorial: nuevoId, idUsuario, idPedido, fechaPedido, estado, total });
    } else {
        const record = historial.find(h => h.idHistorial === id);
        record.idUsuario = idUsuario;
        record.idPedido = idPedido;
        record.fechaPedido = fechaPedido;
        record.estado = estado;
        record.total = total;
    }

    // Guardar en Local Storage
    localStorage.setItem('historial', JSON.stringify(historial));

    document.querySelector('#historialForm').reset();
    showSection('historial');
    renderTable('historial-table', historial, 'editHistorial', 'deleteHistorial');
}

function editHistorial(id) {
    const record = historial.find(h => h.idHistorial === id);
    document.querySelector('#historialId').value = record.idHistorial;
    document.querySelector('#historialUsuarioId').value = record.idUsuario;
    document.querySelector('#historialPedidoId').value = record.idPedido;
    document.querySelector('#historialFechaPedido').value = record.fechaPedido;
    document.querySelector('#historialEstado').value = record.estado;
    document.querySelector('#historialTotal').value = record.total;
    showSection('historial');
}

function deleteHistorial(id) {
    historial = historial.filter(h => h.idHistorial !== id);
    // Guardar en Local Storage
    localStorage.setItem('historial', JSON.stringify(historial));
    renderTable('historial-table', historial, 'editHistorial', 'deleteHistorial');
}

function guardarNotificacion(event) {
    event.preventDefault();
    const id = parseInt(document.querySelector('#notificacionId').value);
    const idUsuario = parseInt(document.querySelector('#notificacionUsuarioId').value);
    const mensaje = document.querySelector('#mensaje').value;
    const fechaNotificacion = document.querySelector('#fecha').value;
    const leida = document.querySelector('#leida').checked;

    if (isNaN(id)) {
        const nuevoId = notificaciones.length ? notificaciones[notificaciones.length - 1].idNotificacion + 1 : 1;
        notificaciones.push({ idNotificacion: nuevoId, idUsuario, mensaje, fechaNotificacion, leida });
    } else {
        const notificacion = notificaciones.find(n => n.idNotificacion === id);
        notificacion.idUsuario = idUsuario;
        notificacion.mensaje = mensaje;
        notificacion.fechaNotificacion = fechaNotificacion;
        notificacion.leida = leida;
    }

    // Guardar en Local Storage
    localStorage.setItem('notificaciones', JSON.stringify(notificaciones));

    document.querySelector('#notificacionForm').reset();
    showSection('notificaciones');
    renderTable('notificaciones-table', notificaciones, 'editNotificacion', 'deleteNotificacion');
}

function editNotificacion(id) {
    const notificacion = notificaciones.find(n => n.idNotificacion === id);
    document.querySelector('#notificacionId').value = notificacion.idNotificacion;
    document.querySelector('#notificacionUsuarioId').value = notificacion.idUsuario;
    document.querySelector('#mensaje').value = notificacion.mensaje;
    document.querySelector('#fecha').value = notificacion.fechaNotificacion;
    document.querySelector('#leida').checked = notificacion.leida;
    showSection('notificaciones');
}

function deleteNotificacion(id) {
    notificaciones = notificaciones.filter(n => n.idNotificacion !== id);
    // Guardar en Local Storage
    localStorage.setItem('notificaciones', JSON.stringify(notificaciones));
    renderTable('notificaciones-table', notificaciones, 'editNotificacion', 'deleteNotificacion');
}

function renderTable(tableId, data, editFunction, deleteFunction) {
    const tbody = document.querySelector(`#${tableId} tbody`);
    tbody.innerHTML = '';
    data.forEach(item => {
        let row = '<tr>';
        for (const key in item) {
            row += `<td>${item[key]}</td>`;
        }
        row += `<td><button onclick="${editFunction}(${item.idUsuario || item.idProducto || item.idPedido || item.idHistorial || item.idNotificacion})">Editar</button></td>`;
        row += `<td><button onclick="${deleteFunction}(${item.idUsuario || item.idProducto || item.idPedido || item.idHistorial || item.idNotificacion})">Eliminar</button></td>`;
        row += '</tr>';
        tbody.innerHTML += row;
    });
}

function showSection(sectionId) {
    document.querySelectorAll('.menu-section').forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}
