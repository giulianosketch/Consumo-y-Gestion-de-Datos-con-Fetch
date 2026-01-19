// Clase que administra la información de los usuarios 
class UsersService {
    constructor() {
        this.users = []; // Propiedad interna para el array de usuarios 
    }

    // Método inicializador asíncrono que realiza el fetch 
    async init() {
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/users'); 
            if (!res.ok) throw new Error("Error en la red");
            this.users = await res.json(); 
            print("Datos cargados correctamente. Listo para operar.");
        } catch (error) {
            print("Error al cargar los usuarios: " + error.message); 
        }
    }

    // Auxiliar para buscar un usuario por nombre exacto 
    buscarUsuario(nombre) {
        return this.users.find(u => u.name.toLowerCase() === nombre.toLowerCase());
    }

    // a. Lista los nombres de todos los usuarios 
    listarNombres() {
        const nombres = this.users.map(u => u.name).join("\n");
        print(nombres);
    }

    // b. Muestra username y email por nombre exacto
    mostrarInfoBasicaPorNombre() {
        const nombre = prompt("Ingrese el nombre exacto del usuario:");
        const u = this.buscarUsuario(nombre);
        if (u) {
            print(`Username: ${u.username}\nEmail: ${u.email}`);
        } else {
            print("Usuario no encontrado.");
        }
    }

    // c. Muestra la dirección completa 
    mostrarDireccionPorNombre() {
        const nombre = prompt("Ingrese el nombre para ver la dirección:");
        const u = this.buscarUsuario(nombre);
        if (u) {
            const dir = u.address;
            print(`Calle: ${dir.street}, Suite: ${dir.suite}\nCiudad: ${dir.city}, Zip: ${dir.zipcode}\nGeo: Lat ${dir.geo.lat}, Lng ${dir.geo.lng}`);
        } else {
            print("Usuario no encontrado.");
        }
    }

    // d. Muestra teléfono, web y compañía 
    mostrarInfoAvanzadaPorNombre() {
        const nombre = prompt("Ingrese el nombre para info avanzada:");
        const u = this.buscarUsuario(nombre);
        if (u) {
            print(`Teléfono: ${u.phone}\nWeb: ${u.website}\nCompañía: ${u.company.name}\nFrase: ${u.company.catchPhrase}\nBS: ${u.company.bs}`);
        } else {
            print("Usuario no encontrado.");
        }
    }

    // e. Lista todas las compañías y sus frases 
    listarCompaniasYCatchphrase() {
        const lista = this.users.map(u => `Empresa: ${u.company.name} | Frase: ${u.company.catchPhrase}`).join("\n");
        print(lista);
    }

    // f. Lista los nombres ordenados alfabéticamente
    listarNombresOrdenados() {
        const ordenados = this.users.map(u => u.name).sort().join("\n");
        print(ordenados);
    }
}

// Funciones auxiliares para mostrar resultados en pantalla 
const out = document.getElementById('output');
const print = (data) => out.textContent = (typeof data === 'string') ? data : JSON.stringify(data, null, 2);

// Instanciación y asociación de eventos 
const svc = new UsersService();
svc.init().then(() => {
    document.getElementById('btnNombres').onclick = () => svc.listarNombres();
    document.getElementById('btnBasica').onclick = () => svc.mostrarInfoBasicaPorNombre();
    document.getElementById('btnDireccion').onclick = () => svc.mostrarDireccionPorNombre();
    document.getElementById('btnAvanzada').onclick = () => svc.mostrarInfoAvanzadaPorNombre();
    document.getElementById('btnCompanias').onclick = () => svc.listarCompaniasYCatchphrase();
    document.getElementById('btnOrdenados').onclick = () => svc.listarNombresOrdenados();
});