// Palabras por categoría. Para añadir una categoría, añade una entrada nueva.
const CATEGORIES = {
  "Animales": [
    "Perro", "Gato", "Elefante", "Jirafa", "León", "Delfín", "Pingüino", "Caballo",
    "Serpiente", "Tortuga", "Mono", "Oso", "Conejo", "Águila", "Tiburón", "Vaca",
    "Pulpo", "Canguro", "Cocodrilo", "Mariposa", "Ballena", "Búho", "Cebra", "Hipopótamo",
    "Rinoceronte", "Lobo", "Zorro", "Ardilla", "Murciélago", "Abeja", "Hormiga", "Caracol",
    "Loro", "Flamenco", "Camello", "Koala", "Panda", "Medusa", "Rana", "Gallina"
  ],
  "Comida": [
    "Pizza", "Paella", "Tortilla", "Helado", "Hamburguesa", "Croqueta", "Sushi",
    "Chocolate", "Macarrones", "Gazpacho", "Churros", "Ensalada", "Palomitas",
    "Fresa", "Plátano", "Sandía", "Queso", "Bocadillo", "Lentejas", "Tarta",
    "Espaguetis", "Huevo frito", "Patatas fritas", "Jamón", "Pan", "Galletas", "Yogur",
    "Naranja", "Manzana", "Uvas", "Piña", "Zanahoria", "Tomate", "Sopa", "Albóndigas",
    "Magdalena", "Donut", "Kebab", "Taco", "Cereales"
  ],
  "Lugares": [
    "Playa", "Hospital", "Colegio", "Aeropuerto", "Supermercado", "Cine", "Museo",
    "Piscina", "Biblioteca", "Zoo", "Montaña", "Restaurante", "Parque de atracciones",
    "Estadio", "Iglesia", "Farmacia", "Castillo", "Granja", "Circo", "Peluquería",
    "Estación de tren", "Gasolinera", "Gimnasio", "Panadería", "Comisaría", "Cárcel",
    "Desierto", "Selva", "Isla", "Cueva", "Barco", "Discoteca", "Hotel", "Camping",
    "Teatro", "Mercado", "Acuario", "Pista de hielo", "Faro", "Ascensor"
  ],
  "Cosas de casa": [
    "Nevera", "Sofá", "Lavadora", "Cama", "Espejo", "Microondas", "Escoba",
    "Lámpara", "Almohada", "Tostadora", "Ducha", "Mando a distancia", "Reloj",
    "Paraguas", "Cuchara", "Toalla", "Ventana", "Alfombra", "Plancha", "Llave",
    "Televisión", "Bañera", "Horno", "Tenedor", "Sartén", "Cortina", "Armario", "Silla",
    "Mesa", "Cepillo de dientes", "Secador", "Aspiradora", "Enchufe", "Grifo", "Manta",
    "Percha", "Cubo de basura", "Timbre", "Escalera", "Maceta"
  ],
  "Profesiones": [
    "Médico", "Bombero", "Profesor", "Policía", "Cocinero", "Piloto", "Astronauta",
    "Dentista", "Peluquero", "Fontanero", "Veterinario", "Panadero", "Cartero",
    "Futbolista", "Pintor", "Mago", "Cantante", "Granjero", "Socorrista", "Juez",
    "Enfermero", "Taxista", "Camarero", "Electricista", "Carpintero", "Arquitecto",
    "Periodista", "Actor", "Payaso", "Científico", "Detective", "Pirata", "Jardinero",
    "Mecánico", "Fotógrafo", "Abogado", "Pescador", "Albañil", "Bailarín", "Youtuber"
  ],
  "Deportes": [
    "Fútbol", "Baloncesto", "Tenis", "Natación", "Ciclismo", "Esquí", "Golf",
    "Boxeo", "Surf", "Atletismo", "Balonmano", "Voleibol", "Pádel", "Kárate",
    "Patinaje", "Escalada", "Rugby", "Gimnasia", "Ajedrez", "Bolos",
    "Judo", "Hockey", "Béisbol", "Ping-pong", "Waterpolo", "Remo", "Esgrima",
    "Tiro con arco", "Snowboard", "Maratón", "Salto de longitud", "Billar", "Dardos",
    "Fórmula 1", "Motociclismo", "Vela", "Buceo", "Yoga", "Skate", "Equitación"
  ],
  "Transportes": [
    "Coche", "Autobús", "Tren", "Avión", "Bicicleta", "Moto", "Helicóptero",
    "Submarino", "Patinete", "Metro", "Taxi", "Camión", "Ambulancia", "Tractor",
    "Globo aerostático", "Cohete", "Velero", "Canoa", "Teleférico", "Caravana",
    "Grúa", "Tranvía", "Monopatín", "Camión de bomberos", "Crucero"
  ],
  "Ropa": [
    "Camiseta", "Pantalón", "Calcetines", "Zapatillas", "Bufanda", "Gorro", "Abrigo",
    "Vestido", "Falda", "Pijama", "Bañador", "Guantes", "Corbata", "Cinturón",
    "Botas", "Chanclas", "Gafas de sol", "Sombrero", "Jersey", "Chaqueta",
    "Sudadera", "Mochila", "Disfraz", "Capa", "Uniforme"
  ],
  "Instrumentos": [
    "Guitarra", "Piano", "Batería", "Violín", "Flauta", "Trompeta", "Saxofón",
    "Arpa", "Acordeón", "Tambor", "Xilófono", "Violonchelo", "Gaita", "Armónica",
    "Pandereta", "Castañuelas", "Ukelele", "Triángulo", "Órgano", "Micrófono"
  ],
  "Fiestas y eventos": [
    "Cumpleaños", "Navidad", "Boda", "Halloween", "Carnaval", "Nochevieja",
    "Reyes Magos", "Excursión", "Vacaciones", "Concierto", "Graduación",
    "Fiesta de pijamas", "Picnic", "Barbacoa", "Feria", "Fuegos artificiales",
    "Desfile", "San Juan", "Bautizo", "Partido de fútbol"
  ]
};
