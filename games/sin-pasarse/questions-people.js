// Población de países y ciudades (cifras aproximadas de 2023–2024).
const PEOPLE = ["habitantes", "people", "habitants"];
const pop = (id, icon, answer, es, en, fr, note) =>
  N(id, icon, answer, [`¿Cuántos habitantes tiene ${es}?`, `How many people live in ${en}?`, `Combien d'habitants compte ${fr} ?`], PEOPLE, note);

pop("germany-pop", "🇩🇪", 83600000, "Alemania", "Germany", "l'Allemagne",
  ["Unos 83,6 millones (2024): el país más poblado de la UE.", "About 83.6 million (2024): the most populous EU country.", "Environ 83,6 millions (2024) : le pays le plus peuplé de l'UE."]);
pop("italy-pop", "🇮🇹", 59000000, "Italia", "Italy", "l'Italie",
  ["Unos 59 millones (2024).", "About 59 million (2024).", "Environ 59 millions (2024)."]);
pop("portugal-pop", "🇵🇹", 10600000, "Portugal", "Portugal", "le Portugal",
  ["Unos 10,6 millones (2023).", "About 10.6 million (2023).", "Environ 10,6 millions (2023)."]);
pop("uk-pop", "🇬🇧", 68300000, "el Reino Unido", "the United Kingdom", "le Royaume-Uni",
  ["Unos 68,3 millones (2023).", "About 68.3 million (2023).", "Environ 68,3 millions (2023)."]);
pop("usa-pop", "🇺🇸", 340000000, "Estados Unidos", "the United States", "les États-Unis",
  ["Unos 340 millones (2024): el tercer país más poblado.", "About 340 million (2024): the third most populous country.", "Environ 340 millions (2024) : le troisième pays le plus peuplé."]);
pop("india-pop", "🇮🇳", 1440000000, "la India", "India", "l'Inde",
  ["Unos 1.440 millones (2024): desde 2023, el país más poblado del mundo.", "About 1.44 billion (2024): the most populous country since 2023.", "Environ 1,44 milliard (2024) : le pays le plus peuplé depuis 2023."]);
pop("brazil-pop", "🇧🇷", 212000000, "Brasil", "Brazil", "le Brésil",
  ["Unos 212 millones (2024).", "About 212 million (2024).", "Environ 212 millions (2024)."]);
pop("mexico-pop", "🇲🇽", 130000000, "México", "Mexico", "le Mexique",
  ["Unos 130 millones: el país con más hispanohablantes.", "About 130 million: the country with the most Spanish speakers.", "Environ 130 millions : le pays qui compte le plus d'hispanophones."]);
pop("japan-pop", "🇯🇵", 124000000, "Japón", "Japan", "le Japon",
  ["Unos 124 millones, y bajando cada año.", "About 124 million, and falling every year.", "Environ 124 millions, et en baisse chaque année."]);
pop("russia-pop", "🇷🇺", 146000000, "Rusia", "Russia", "la Russie",
  ["Unos 146 millones.", "About 146 million.", "Environ 146 millions."]);
pop("canada-pop", "🇨🇦", 41000000, "Canadá", "Canada", "le Canada",
  ["Unos 41 millones (2024), en el segundo país más grande del mundo.", "About 41 million (2024), in the world's second largest country.", "Environ 41 millions (2024), dans le deuxième plus grand pays du monde."]);
pop("australia-pop", "🇦🇺", 27000000, "Australia", "Australia", "l'Australie",
  ["Unos 27 millones (2024).", "About 27 million (2024).", "Environ 27 millions (2024)."]);
pop("argentina-pop", "🇦🇷", 46000000, "Argentina", "Argentina", "l'Argentine",
  ["Unos 46 millones.", "About 46 million.", "Environ 46 millions."]);
pop("morocco-pop", "🇲🇦", 36800000, "Marruecos", "Morocco", "le Maroc",
  ["Unos 36,8 millones (censo de 2024).", "About 36.8 million (2024 census).", "Environ 36,8 millions (recensement de 2024)."]);
pop("monaco-pop", "🇲🇨", 38000, "Mónaco", "Monaco", "Monaco",
  ["Unos 38.000: el país con más habitantes por km² del mundo.", "About 38,000: the most densely populated country in the world.", "Environ 38 000 : le pays le plus densément peuplé du monde."]);
pop("luxembourg-pop", "🇱🇺", 670000, "Luxemburgo", "Luxembourg", "le Luxembourg",
  ["Unos 670.000 (2024).", "About 670,000 (2024).", "Environ 670 000 (2024)."]);
pop("vatican-pop", "🇻🇦", 800, "el Vaticano", "Vatican City", "le Vatican",
  ["Unas 800 personas.", "About 800 people.", "Environ 800 personnes."]);
pop("nigeria-pop", "🇳🇬", 230000000, "Nigeria", "Nigeria", "le Nigeria",
  ["Unos 230 millones: el país más poblado de África.", "About 230 million: Africa's most populous country.", "Environ 230 millions : le pays le plus peuplé d'Afrique."]);
pop("indonesia-pop", "🇮🇩", 280000000, "Indonesia", "Indonesia", "l'Indonésie",
  ["Unos 280 millones (2024).", "About 280 million (2024).", "Environ 280 millions (2024)."]);
pop("belgium-pop", "🇧🇪", 11800000, "Bélgica", "Belgium", "la Belgique",
  ["Unos 11,8 millones.", "About 11.8 million.", "Environ 11,8 millions."]);
pop("switzerland-pop", "🇨🇭", 9000000, "Suiza", "Switzerland", "la Suisse",
  ["Unos 9 millones.", "About 9 million.", "Environ 9 millions."]);
pop("greece-pop", "🇬🇷", 10400000, "Grecia", "Greece", "la Grèce",
  ["Unos 10,4 millones.", "About 10.4 million.", "Environ 10,4 millions."]);
pop("ireland-pop", "🇮🇪", 5300000, "Irlanda", "Ireland", "l'Irlande",
  ["Unos 5,3 millones (2024).", "About 5.3 million (2024).", "Environ 5,3 millions (2024)."]);
pop("norway-pop", "🇳🇴", 5500000, "Noruega", "Norway", "la Norvège",
  ["Unos 5,5 millones.", "About 5.5 million.", "Environ 5,5 millions."]);
pop("colombia-pop", "🇨🇴", 52000000, "Colombia", "Colombia", "la Colombie",
  ["Unos 52 millones.", "About 52 million.", "Environ 52 millions."]);
pop("chile-pop", "🇨🇱", 20000000, "Chile", "Chile", "le Chili",
  ["Unos 20 millones.", "About 20 million.", "Environ 20 millions."]);
pop("peru-pop", "🇵🇪", 34000000, "Perú", "Peru", "le Pérou",
  ["Unos 34 millones.", "About 34 million.", "Environ 34 millions."]);
pop("barcelona-pop", "🏙️", 1700000, "la ciudad de Barcelona", "the city of Barcelona", "la ville de Barcelone",
  ["Unos 1,7 millones (2024).", "About 1.7 million (2024).", "Environ 1,7 million (2024)."]);
pop("valencia-pop", "🏙️", 800000, "la ciudad de Valencia", "the city of Valencia", "la ville de Valence (Espagne)",
  ["Unos 800.000 (2024).", "About 800,000 (2024).", "Environ 800 000 (2024)."]);
pop("seville-pop", "🏙️", 685000, "la ciudad de Sevilla", "the city of Seville", "la ville de Séville",
  ["Unos 685.000 (2024).", "About 685,000 (2024).", "Environ 685 000 (2024)."]);
pop("paris-pop", "🗼", 2100000, "la ciudad de París (sin las afueras)", "the city of Paris (not counting the suburbs)", "Paris intra-muros",
  ["Unos 2,1 millones; con su área metropolitana, más de 12 millones.", "About 2.1 million; over 12 million with the metropolitan area.", "Environ 2,1 millions ; plus de 12 millions avec l'aire urbaine."]);
pop("london-pop", "🇬🇧", 8900000, "Londres", "London", "Londres",
  ["Unos 8,9 millones.", "About 8.9 million.", "Environ 8,9 millions."]);
pop("tokyo-pop", "🗾", 14000000, "Tokio (la metrópolis)", "Tokyo (the metropolis)", "Tokyo (la métropole)",
  ["Unos 14 millones; con toda su área urbana, unos 37 millones.", "About 14 million; around 37 million with the whole urban area.", "Environ 14 millions ; environ 37 millions avec toute l'agglomération."]);
pop("nyc-pop", "🗽", 8300000, "la ciudad de Nueva York", "New York City", "la ville de New York",
  ["Unos 8,3 millones.", "About 8.3 million.", "Environ 8,3 millions."]);
pop("rome-pop", "🏛️", 2800000, "Roma", "Rome", "Rome",
  ["Unos 2,8 millones.", "About 2.8 million.", "Environ 2,8 millions."]);
pop("berlin-pop", "🇩🇪", 3800000, "Berlín", "Berlin", "Berlin",
  ["Unos 3,8 millones: la ciudad más poblada de la UE.", "About 3.8 million: the most populous city in the EU.", "Environ 3,8 millions : la ville la plus peuplée de l'UE."]);
pop("lisbon-pop", "🇵🇹", 545000, "la ciudad de Lisboa", "the city of Lisbon", "la ville de Lisbonne",
  ["Unos 545.000; con su área metropolitana, casi 3 millones.", "About 545,000; almost 3 million with the metropolitan area.", "Environ 545 000 ; près de 3 millions avec l'agglomération."]);
pop("bilbao-pop", "🏙️", 345000, "la ciudad de Bilbao", "the city of Bilbao", "la ville de Bilbao",
  ["Unos 345.000.", "About 345,000.", "Environ 345 000."]);
pop("zaragoza-pop", "🏙️", 680000, "la ciudad de Zaragoza", "the city of Zaragoza", "la ville de Saragosse",
  ["Unos 680.000: la quinta ciudad de España.", "About 680,000: Spain's fifth largest city.", "Environ 680 000 : la cinquième ville d'Espagne."]);
pop("mexico-city-pop", "🇲🇽", 9200000, "Ciudad de México (sin las afueras)", "Mexico City (not counting the suburbs)", "la ville de Mexico (sans la banlieue)",
  ["Unos 9,2 millones; con toda su área urbana, más de 21 millones.", "About 9.2 million; over 21 million with the whole urban area.", "Environ 9,2 millions ; plus de 21 millions avec toute l'agglomération."]);
pop("buenos-aires-pop", "🇦🇷", 3100000, "la ciudad de Buenos Aires", "the city of Buenos Aires", "la ville de Buenos Aires",
  ["Unos 3,1 millones; con el Gran Buenos Aires, más de 15 millones.", "About 3.1 million; over 15 million with Greater Buenos Aires.", "Environ 3,1 millions ; plus de 15 millions avec le Grand Buenos Aires."]);
pop("marseille-pop", "🇫🇷", 870000, "Marsella", "Marseille", "Marseille",
  ["Unos 870.000: la segunda ciudad de Francia.", "About 870,000: France's second city.", "Environ 870 000 : la deuxième ville de France."]);
pop("lyon-pop", "🇫🇷", 520000, "Lyon", "Lyon", "Lyon",
  ["Unos 520.000.", "About 520,000.", "Environ 520 000."]);
pop("shanghai-pop", "🇨🇳", 25000000, "Shanghái", "Shanghai", "Shanghai",
  ["Unos 25 millones: casi tantos como toda Australia.", "About 25 million: almost as many as all of Australia.", "Environ 25 millions : presque autant que toute l'Australie."]);

N("world-pop-1900", "📜", 1600,
  ["¿Cuántos millones de personas vivían en el mundo en 1900?", "How many million people lived in the world in 1900?", "Combien de millions de personnes vivaient dans le monde en 1900 ?"],
  ["millones", "million", "millions"],
  ["Unos 1.600 millones: hoy somos cinco veces más.", "About 1.6 billion: there are five times as many of us today.", "Environ 1,6 milliard : nous sommes cinq fois plus aujourd'hui."]);
N("world-pop-1800", "📜", 1000,
  ["¿Cuántos millones de personas vivían en el mundo hacia 1800?", "How many million people lived in the world around 1800?", "Combien de millions de personnes vivaient dans le monde vers 1800 ?"],
  ["millones", "million", "millions"],
  ["Alrededor de 1.000 millones: se alcanzaron hacia 1804.", "About 1 billion: we reached it around 1804.", "Environ 1 milliard : atteint vers 1804."]);
N("spain-births", "👶", 322000,
  ["¿Cuántos bebés nacieron en España en 2023?", "How many babies were born in Spain in 2023?", "Combien de bébés sont nés en Espagne en 2023 ?"],
  ["bebés", "babies", "bébés"],
  ["Unos 322.000, el número más bajo en décadas.", "About 322,000, the lowest number in decades.", "Environ 322 000, le chiffre le plus bas depuis des décennies."]);
N("spain-life", "🎂", 83.8,
  ["¿Cuál es la esperanza de vida en España, en años?", "What is life expectancy in Spain, in years?", "Quelle est l'espérance de vie en Espagne, en années ?"],
  ["años", "years", "ans"],
  ["Unos 83,8 años (2023): de las más altas del mundo.", "About 83.8 years (2023): one of the highest in the world.", "Environ 83,8 ans (2023) : l'une des plus élevées du monde."]);
N("world-life", "🎂", 73,
  ["¿Cuál es la esperanza de vida media en el mundo, en años?", "What is the average life expectancy in the world, in years?", "Quelle est l'espérance de vie moyenne dans le monde, en années ?"],
  ["años", "years", "ans"],
  ["Unos 73 años. En 1900 era de unos 32.", "About 73 years. In 1900 it was about 32.", "Environ 73 ans. En 1900, elle était d'environ 32."]);
