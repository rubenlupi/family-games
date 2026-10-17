// Palabras por categoría, en español (CATEGORIES_ES), inglés (CATEGORIES_EN) y francés (CATEGORIES_FR).
// Para añadir una categoría, añade una entrada nueva.
const CATEGORIES_ES = {
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

const CATEGORIES_EN = {
  "Animals": [
    "Dog", "Cat", "Elephant", "Giraffe", "Lion", "Dolphin", "Penguin", "Horse",
    "Snake", "Turtle", "Monkey", "Bear", "Rabbit", "Eagle", "Shark", "Cow",
    "Octopus", "Kangaroo", "Crocodile", "Butterfly", "Whale", "Owl", "Zebra", "Hippo",
    "Rhino", "Wolf", "Fox", "Squirrel", "Bat", "Bee", "Ant", "Snail",
    "Parrot", "Flamingo", "Camel", "Koala", "Panda", "Jellyfish", "Frog", "Chicken"
  ],
  "Food": [
    "Pizza", "Pancakes", "Omelette", "Ice cream", "Burger", "Hot dog", "Sushi",
    "Chocolate", "Macaroni", "Soup", "Doughnut", "Salad", "Popcorn",
    "Strawberry", "Banana", "Watermelon", "Cheese", "Sandwich", "Beans", "Cake",
    "Spaghetti", "Fried egg", "Chips", "Bacon", "Bread", "Cookies", "Yoghurt",
    "Orange", "Apple", "Grapes", "Pineapple", "Carrot", "Tomato", "Meatballs", "Muffin",
    "Taco", "Cereal", "Pie", "Toast", "Lollipop"
  ],
  "Places": [
    "Beach", "Hospital", "School", "Airport", "Supermarket", "Cinema", "Museum",
    "Swimming pool", "Library", "Zoo", "Mountain", "Restaurant", "Theme park",
    "Stadium", "Church", "Pharmacy", "Castle", "Farm", "Circus", "Hairdresser's",
    "Train station", "Petrol station", "Gym", "Bakery", "Police station", "Prison",
    "Desert", "Jungle", "Island", "Cave", "Ship", "Nightclub", "Hotel", "Campsite",
    "Theatre", "Market", "Aquarium", "Ice rink", "Lighthouse", "Lift"
  ],
  "Things at home": [
    "Fridge", "Sofa", "Washing machine", "Bed", "Mirror", "Microwave", "Broom",
    "Lamp", "Pillow", "Toaster", "Shower", "Remote control", "Clock",
    "Umbrella", "Spoon", "Towel", "Window", "Rug", "Iron", "Key",
    "Television", "Bathtub", "Oven", "Fork", "Frying pan", "Curtain", "Wardrobe", "Chair",
    "Table", "Toothbrush", "Hairdryer", "Vacuum cleaner", "Plug", "Tap", "Blanket",
    "Coat hanger", "Bin", "Doorbell", "Stairs", "Plant pot"
  ],
  "Jobs": [
    "Doctor", "Firefighter", "Teacher", "Police officer", "Chef", "Pilot", "Astronaut",
    "Dentist", "Hairdresser", "Plumber", "Vet", "Baker", "Postman",
    "Footballer", "Painter", "Magician", "Singer", "Farmer", "Lifeguard", "Judge",
    "Nurse", "Taxi driver", "Waiter", "Electrician", "Carpenter", "Architect",
    "Journalist", "Actor", "Clown", "Scientist", "Detective", "Pirate", "Gardener",
    "Mechanic", "Photographer", "Lawyer", "Fisherman", "Builder", "Dancer", "YouTuber"
  ],
  "Sports": [
    "Football", "Basketball", "Tennis", "Swimming", "Cycling", "Skiing", "Golf",
    "Boxing", "Surfing", "Athletics", "Handball", "Volleyball", "Padel", "Karate",
    "Skating", "Climbing", "Rugby", "Gymnastics", "Chess", "Bowling",
    "Judo", "Hockey", "Baseball", "Table tennis", "Water polo", "Rowing", "Fencing",
    "Archery", "Snowboarding", "Marathon", "Long jump", "Snooker", "Darts",
    "Formula 1", "Motorcycling", "Sailing", "Diving", "Yoga", "Skateboarding", "Horse riding"
  ],
  "Transport": [
    "Car", "Bus", "Train", "Plane", "Bicycle", "Motorbike", "Helicopter",
    "Submarine", "Scooter", "Underground", "Taxi", "Lorry", "Ambulance", "Tractor",
    "Hot-air balloon", "Rocket", "Sailing boat", "Canoe", "Cable car", "Caravan",
    "Tow truck", "Tram", "Skateboard", "Fire engine", "Cruise ship"
  ],
  "Clothes": [
    "T-shirt", "Trousers", "Socks", "Trainers", "Scarf", "Woolly hat", "Coat",
    "Dress", "Skirt", "Pyjamas", "Swimsuit", "Gloves", "Tie", "Belt",
    "Boots", "Flip-flops", "Sunglasses", "Hat", "Jumper", "Jacket",
    "Hoodie", "Backpack", "Costume", "Cape", "Uniform"
  ],
  "Instruments": [
    "Guitar", "Piano", "Drums", "Violin", "Flute", "Trumpet", "Saxophone",
    "Harp", "Accordion", "Drum", "Xylophone", "Cello", "Bagpipes", "Harmonica",
    "Tambourine", "Castanets", "Ukulele", "Triangle", "Organ", "Microphone"
  ],
  "Parties and events": [
    "Birthday", "Christmas", "Wedding", "Halloween", "Carnival", "New Year's Eve",
    "Easter", "School trip", "Holidays", "Concert", "Graduation",
    "Sleepover", "Picnic", "Barbecue", "Funfair", "Fireworks",
    "Parade", "Bonfire Night", "Christening", "Football match"
  ]
};

const CATEGORIES_FR = {
  "Animaux": [
    "Chien", "Chat", "Éléphant", "Girafe", "Lion", "Dauphin", "Pingouin", "Cheval",
    "Serpent", "Tortue", "Singe", "Ours", "Lapin", "Aigle", "Requin", "Vache",
    "Pieuvre", "Kangourou", "Crocodile", "Papillon", "Baleine", "Hibou", "Zèbre", "Hippopotame",
    "Rhinocéros", "Loup", "Renard", "Écureuil", "Chauve-souris", "Abeille", "Fourmi", "Escargot",
    "Perroquet", "Flamant rose", "Chameau", "Koala", "Panda", "Méduse", "Grenouille", "Poule"
  ],
  "Nourriture": [
    "Pizza", "Crêpe", "Omelette", "Glace", "Hamburger", "Croissant", "Sushi",
    "Chocolat", "Pâtes", "Soupe", "Baguette", "Salade", "Pop-corn",
    "Fraise", "Banane", "Pastèque", "Fromage", "Sandwich", "Lentilles", "Gâteau",
    "Spaghettis", "Œuf au plat", "Frites", "Jambon", "Pain", "Biscuits", "Yaourt",
    "Orange", "Pomme", "Raisin", "Ananas", "Carotte", "Tomate", "Quiche", "Madeleine",
    "Beignet", "Croque-monsieur", "Taco", "Céréales", "Ratatouille"
  ],
  "Lieux": [
    "Plage", "Hôpital", "École", "Aéroport", "Supermarché", "Cinéma", "Musée",
    "Piscine", "Bibliothèque", "Zoo", "Montagne", "Restaurant", "Parc d'attractions",
    "Stade", "Église", "Pharmacie", "Château", "Ferme", "Cirque", "Coiffeur",
    "Gare", "Station-service", "Salle de sport", "Boulangerie", "Commissariat", "Prison",
    "Désert", "Jungle", "Île", "Grotte", "Bateau", "Discothèque", "Hôtel", "Camping",
    "Théâtre", "Marché", "Aquarium", "Patinoire", "Phare", "Ascenseur"
  ],
  "Objets de la maison": [
    "Frigo", "Canapé", "Machine à laver", "Lit", "Miroir", "Micro-ondes", "Balai",
    "Lampe", "Oreiller", "Grille-pain", "Douche", "Télécommande", "Horloge",
    "Parapluie", "Cuillère", "Serviette", "Fenêtre", "Tapis", "Fer à repasser", "Clé",
    "Télévision", "Baignoire", "Four", "Fourchette", "Poêle", "Rideau", "Armoire", "Chaise",
    "Table", "Brosse à dents", "Sèche-cheveux", "Aspirateur", "Prise", "Robinet", "Couverture",
    "Cintre", "Poubelle", "Sonnette", "Escalier", "Pot de fleurs"
  ],
  "Métiers": [
    "Médecin", "Pompier", "Professeur", "Policier", "Cuisinier", "Pilote", "Astronaute",
    "Dentiste", "Coiffeur", "Plombier", "Vétérinaire", "Boulanger", "Facteur",
    "Footballeur", "Peintre", "Magicien", "Chanteur", "Agriculteur", "Maître-nageur", "Juge",
    "Infirmier", "Chauffeur de taxi", "Serveur", "Électricien", "Menuisier", "Architecte",
    "Journaliste", "Acteur", "Clown", "Scientifique", "Détective", "Pirate", "Jardinier",
    "Mécanicien", "Photographe", "Avocat", "Pêcheur", "Maçon", "Danseur", "Youtubeur"
  ],
  "Sports": [
    "Football", "Basket", "Tennis", "Natation", "Cyclisme", "Ski", "Golf",
    "Boxe", "Surf", "Athlétisme", "Handball", "Volley", "Padel", "Karaté",
    "Patinage", "Escalade", "Rugby", "Gymnastique", "Échecs", "Bowling",
    "Judo", "Hockey", "Baseball", "Ping-pong", "Water-polo", "Aviron", "Escrime",
    "Tir à l'arc", "Snowboard", "Marathon", "Saut en longueur", "Billard", "Fléchettes",
    "Formule 1", "Moto", "Voile", "Plongée", "Yoga", "Skate", "Équitation"
  ],
  "Transports": [
    "Voiture", "Bus", "Train", "Avion", "Vélo", "Moto", "Hélicoptère",
    "Sous-marin", "Trottinette", "Métro", "Taxi", "Camion", "Ambulance", "Tracteur",
    "Montgolfière", "Fusée", "Voilier", "Canoë", "Téléphérique", "Caravane",
    "Dépanneuse", "Tramway", "Planche à roulettes", "Camion de pompiers", "Paquebot"
  ],
  "Vêtements": [
    "T-shirt", "Pantalon", "Chaussettes", "Baskets", "Écharpe", "Bonnet", "Manteau",
    "Robe", "Jupe", "Pyjama", "Maillot de bain", "Gants", "Cravate", "Ceinture",
    "Bottes", "Tongs", "Lunettes de soleil", "Chapeau", "Pull", "Veste",
    "Sweat", "Sac à dos", "Déguisement", "Cape", "Uniforme"
  ],
  "Instruments": [
    "Guitare", "Piano", "Batterie", "Violon", "Flûte", "Trompette", "Saxophone",
    "Harpe", "Accordéon", "Tambour", "Xylophone", "Violoncelle", "Cornemuse", "Harmonica",
    "Tambourin", "Castagnettes", "Ukulélé", "Triangle", "Orgue", "Micro"
  ],
  "Fêtes et événements": [
    "Anniversaire", "Noël", "Mariage", "Halloween", "Carnaval", "Réveillon",
    "Galette des rois", "Sortie scolaire", "Vacances", "Concert", "Remise des diplômes",
    "Soirée pyjama", "Pique-nique", "Barbecue", "Fête foraine", "Feu d'artifice",
    "Défilé", "14 Juillet", "Baptême", "Match de foot"
  ]
};
