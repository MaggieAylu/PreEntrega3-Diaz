const productos = [
    {id:1, imagen: '/IMG/blazer.jpg', nombre: "Blazer Negro", precio: 17000},
    {id:2, imagen: '/IMG/polera.jpg', nombre: "Polera Negra", precio: 8075},
    {id:3, imagen: '/IMG/jean wide leg.jpg', nombre: "Denim Wide Leg", precio: 15300},
    {id:4, imagen: '/IMG/Vestido-lunar-negro.jpg', nombre: "Vestido Retro", precio: 9350},
    {id:5, imagen: '/IMG/chaleco-puffer.jpg', nombre: "Chaleco Puffer", precio: 17850},
    {id:6, imagen: '/IMG/remera.jpg', nombre: "Remera musculosa", precio: 5950},
    {id:7, imagen: '/IMG/short pollera.jpg', nombre: "Short pollera negro", precio: 14025},
    {id:8, imagen: '/IMG/buzo.jpeg', nombre: "Buzo", precio: 15725},
    {id:9, imagen: '/IMG/biker.jpg', nombre: "Biker", precio: 6375},
]

const contenidoProductos = document.getElementById('caja-contenedora')

productos.forEach((prod) =>{
    let contenido = document.createElement('div')
    contenido.className = "card"
    contenido.innerHTML = `
    <img src="${prod.imagen}">
    <h3 class="contenido">${prod.nombre}</h3>
    <p class="contenido" id="precio">$${prod.precio}</p>
    <button id="boton${prod.id}" class="cart-btn">Comprar</button>
    `

    contenidoProductos.appendChild(contenido)
    const boton = document.getElementById(`boton${prod.id}`)
    boton.addEventListener('click', () =>{
        carrito.push({
            id : prod.id,
            img: prod.imagen,
            nombre: prod.nombre,
            precio: prod.precio,
        })
    })
})

const verCarrito = document.getElementById('verCarrito')
const carritoContenido = document.getElementById('carrito-contenido')

verCarrito.addEventListener('click', () => {
    carritoContenido.innerHTML = ''
    carritoContenido.classList.add('carrito')
    const tuCarrito = document.createElement('div')
    tuCarrito.className = 'ver-carrito'
    tuCarrito.innerHTML = `
    <h1 class="titulo">Tu Carrito.</h1>
    `
    carritoContenido.append(tuCarrito)

    const boton = document.createElement('h1')
    boton.innerText = 'X'
    boton.className = 'cerrar'
    boton.addEventListener('click', () => {
        carritoContenido.classList.add('ocultar')
    })
    tuCarrito.append(boton)

    carrito.forEach((prod) => {
        let contenido = document.createElement('div')
        contenido.className = 'contenido-del-carrito'
        contenido.innerHTML = `
        <img src="${prod.img}"
        <h3>${prod.nombre}</h3>
        <p>$${prod.precio}</p>`

        carritoContenido.append(contenido)
    })
   const total = carrito.reduce((acc, el) => acc + el.precio, 0)
   const totalPagar = document.createElement('div')
   totalPagar.className = 'total-pagar'
   totalPagar.innerHTML = `Total: $${total}`
   carritoContenido.append(totalPagar)
   guardar()

   const finalizarCompra = document.createElement('button')
   finalizarCompra.className = 'cart-btn'
   finalizarCompra.innerHTML = `Finalizar Compra`
   carritoContenido.append(finalizarCompra)
   finalizarCompra.addEventListener('click', () =>{
    if(carrito.length > 0){
        Swal.fire({
            title: '¡Muchas Gracias!',
            text: 'Su compra fue realizada con exito',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        })
        carrito.splice(0,carrito.length)
        carritoContenido.classList.add('ocultar')
    }
    else{
        Swal.fire({
            title: 'Opcion Invalida',
            text: 'El carrito esta vacio',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        })
    }
   })
})

const guardar = () =>{
    if(carrito.length > 0){
        localStorage.setItem('carrito', JSON.stringify(carrito))
    }
} 

const recuperarDatos = () =>{
    if(localStorage.getItem('carrito')){
        return JSON.parse(localStorage.getItem('carrito'))
    } else{
        return []
    }
    
}

const carrito = recuperarDatos()


