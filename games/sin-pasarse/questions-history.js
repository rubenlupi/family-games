// Historia: ¿en qué año…?
// h() pone delante «¿En qué año…» en los tres idiomas.
const h = (id, icon, year, es, en, fr, note) =>
  Y(id, icon, year, [`¿En qué año ${es}?`, `In what year ${en}?`, `En quelle année ${fr} ?`], note);

h("pompeii", "🌋", 79, "quedó sepultada Pompeya por el Vesubio", "was Pompeii buried by Vesuvius", "Pompéi a-t-elle été ensevelie par le Vésuve",
  ["En el año 79.", "In AD 79.", "En l'an 79."]);
h("rome-fall", "🏛️", 476, "cayó el Imperio romano de Occidente", "did the Western Roman Empire fall", "l'Empire romain d'Occident est-il tombé",
  ["En 476.", "In 476.", "En 476."]);
h("muslim-iberia", "🕌", 711, "llegaron los musulmanes a la península ibérica", "did the Muslims arrive in the Iberian Peninsula", "les musulmans sont-ils arrivés dans la péninsule Ibérique",
  ["En 711.", "In 711.", "En 711."]);
h("charlemagne", "👑", 800, "fue coronado emperador Carlomagno", "was Charlemagne crowned emperor", "Charlemagne a-t-il été couronné empereur",
  ["En el año 800, el día de Navidad.", "In 800, on Christmas Day.", "En 800, le jour de Noël."]);
h("hastings", "⚔️", 1066, "fue la batalla de Hastings", "was the Battle of Hastings", "a eu lieu la bataille d'Hastings",
  ["En 1066.", "In 1066.", "En 1066."]);
h("magna-carta", "📜", 1215, "se firmó la Carta Magna en Inglaterra", "was Magna Carta signed in England", "la Grande Charte a-t-elle été signée en Angleterre",
  ["En 1215.", "In 1215.", "En 1215."]);
h("black-death", "☠️", 1347, "llegó la peste negra a Europa", "did the Black Death reach Europe", "la peste noire est-elle arrivée en Europe",
  ["En 1347. Mató a un tercio de los europeos, o más.", "In 1347. It killed a third of Europeans, or more.", "En 1347. Elle a tué au moins un tiers des Européens."]);
h("joan-of-arc", "🔥", 1431, "murió Juana de Arco", "did Joan of Arc die", "Jeanne d'Arc est-elle morte",
  ["En 1431, con 19 años.", "In 1431, aged 19.", "En 1431, à 19 ans."]);
h("constantinople", "🏰", 1453, "cayó Constantinopla en manos otomanas", "did Constantinople fall to the Ottomans", "Constantinople est-elle tombée aux mains des Ottomans",
  ["En 1453.", "In 1453.", "En 1453."]);
h("gutenberg", "📚", 1455, "se imprimió la Biblia de Gutenberg", "was the Gutenberg Bible printed", "la Bible de Gutenberg a-t-elle été imprimée",
  ["Hacia 1455.", "Around 1455.", "Vers 1455."]);
h("tordesillas", "🗺️", 1494, "se firmó el Tratado de Tordesillas", "was the Treaty of Tordesillas signed", "le traité de Tordesillas a-t-il été signé",
  ["En 1494: España y Portugal se repartieron el mundo por descubrir.", "In 1494: Spain and Portugal divided the undiscovered world.", "En 1494 : l'Espagne et le Portugal se partagèrent le monde à découvrir."]);
h("elcano", "⛵", 1522, "terminó Elcano la primera vuelta al mundo", "did Elcano complete the first voyage round the world", "Elcano a-t-il achevé le premier tour du monde",
  ["En 1522, tres años después de salir con Magallanes.", "In 1522, three years after setting off with Magellan.", "En 1522, trois ans après être parti avec Magellan."]);
h("armada", "⚓", 1588, "fracasó la Armada Invencible", "did the Spanish Armada fail", "l'Invincible Armada a-t-elle échoué",
  ["En 1588.", "In 1588.", "En 1588."]);
h("cervantes-death", "✒️", 1616, "murió Cervantes", "did Cervantes die", "Cervantès est-il mort",
  ["En 1616, el mismo año que Shakespeare.", "In 1616, the same year as Shakespeare.", "En 1616, la même année que Shakespeare."]);
h("shakespeare-born", "🎭", 1564, "nació Shakespeare", "was Shakespeare born", "Shakespeare est-il né",
  ["En 1564.", "In 1564.", "En 1564."]);
h("leonardo-born", "🎨", 1452, "nació Leonardo da Vinci", "was Leonardo da Vinci born", "Léonard de Vinci est-il né",
  ["En 1452.", "In 1452.", "En 1452."]);
h("mona-lisa", "🖼️", 1503, "empezó Leonardo a pintar la Gioconda", "did Leonardo start painting the Mona Lisa", "Léonard a-t-il commencé à peindre la Joconde",
  ["Hacia 1503.", "Around 1503.", "Vers 1503."]);
h("sistine", "🎨", 1512, "terminó Miguel Ángel el techo de la Capilla Sixtina", "did Michelangelo finish the Sistine Chapel ceiling", "Michel-Ange a-t-il terminé le plafond de la chapelle Sixtine",
  ["En 1512, tras cuatro años de trabajo.", "In 1512, after four years of work.", "En 1512, après quatre ans de travail."]);
h("meninas", "🖼️", 1656, "pintó Velázquez Las Meninas", "did Velázquez paint Las Meninas", "Vélasquez a-t-il peint Les Ménines",
  ["En 1656.", "In 1656.", "En 1656."]);
h("newton-principia", "🍎", 1687, "publicó Newton sus leyes del movimiento y la gravedad", "did Newton publish his laws of motion and gravity", "Newton a-t-il publié ses lois du mouvement et de la gravitation",
  ["En 1687, en los Principia.", "In 1687, in the Principia.", "En 1687, dans les Principia."]);
h("mozart-born", "🎼", 1756, "nació Mozart", "was Mozart born", "Mozart est-il né",
  ["En 1756.", "In 1756.", "En 1756."]);
h("watt", "🚂", 1769, "patentó James Watt su máquina de vapor mejorada", "did James Watt patent his improved steam engine", "James Watt a-t-il breveté sa machine à vapeur améliorée",
  ["En 1769.", "In 1769.", "En 1769."]);
h("beethoven-born", "🎹", 1770, "nació Beethoven", "was Beethoven born", "Beethoven est-il né",
  ["En 1770.", "In 1770.", "En 1770."]);
h("us-independence", "🇺🇸", 1776, "se declaró la independencia de Estados Unidos", "did the United States declare independence", "les États-Unis ont-ils déclaré leur indépendance",
  ["En 1776, el 4 de julio.", "In 1776, on 4 July.", "En 1776, le 4 juillet."]);
h("french-revolution", "🇫🇷", 1789, "empezó la Revolución francesa", "did the French Revolution begin", "la Révolution française a-t-elle commencé",
  ["En 1789, con la toma de la Bastilla el 14 de julio.", "In 1789, with the storming of the Bastille on 14 July.", "En 1789, avec la prise de la Bastille le 14 juillet."]);
h("napoleon-emperor", "👑", 1804, "se coronó emperador Napoleón", "did Napoleon crown himself emperor", "Napoléon s'est-il couronné empereur",
  ["En 1804.", "In 1804.", "En 1804."]);
h("waterloo", "⚔️", 1815, "fue la batalla de Waterloo", "was the Battle of Waterloo", "a eu lieu la bataille de Waterloo",
  ["En 1815.", "In 1815.", "En 1815."]);
h("first-photo", "📷", 1826, "se hizo la fotografía más antigua que se conserva", "was the oldest surviving photograph taken", "a été prise la plus ancienne photographie conservée",
  ["Hacia 1826, de Nicéphore Niépce. Necesitó horas de exposición.", "Around 1826, by Nicéphore Niépce. It needed hours of exposure.", "Vers 1826, par Nicéphore Niépce. Il a fallu des heures de pose."]);
h("darwin", "🐢", 1859, "publicó Darwin El origen de las especies", "did Darwin publish On the Origin of Species", "Darwin a-t-il publié L'Origine des espèces",
  ["En 1859.", "In 1859.", "En 1859."]);
h("us-slavery", "⛓️", 1865, "se abolió la esclavitud en Estados Unidos", "was slavery abolished in the United States", "l'esclavage a-t-il été aboli aux États-Unis",
  ["En 1865, con la 13.ª enmienda.", "In 1865, with the 13th Amendment.", "En 1865, avec le 13e amendement."]);
h("suez", "🚢", 1869, "se inauguró el canal de Suez", "did the Suez Canal open", "le canal de Suez a-t-il été inauguré",
  ["En 1869.", "In 1869.", "En 1869."]);
h("telephone", "☎️", 1876, "patentó Graham Bell el teléfono", "did Alexander Graham Bell patent the telephone", "Graham Bell a-t-il breveté le téléphone",
  ["En 1876.", "In 1876.", "En 1876."]);
h("altamira", "🦬", 1879, "se descubrieron las pinturas de la cueva de Altamira", "were the paintings in the Altamira cave discovered", "les peintures de la grotte d'Altamira ont-elles été découvertes",
  ["En 1879: las vio primero María, una niña de 8 años.", "In 1879: María, an 8-year-old girl, saw them first.", "En 1879 : María, une fillette de 8 ans, les a vues la première."]);
h("lightbulb", "💡", 1879, "presentó Edison su bombilla", "did Edison present his light bulb", "Edison a-t-il présenté son ampoule",
  ["En 1879.", "In 1879.", "En 1879."]);
h("sagrada-familia", "⛪", 1882, "empezaron las obras de la Sagrada Familia", "did work start on the Sagrada Família", "les travaux de la Sagrada Família ont-ils commencé",
  ["En 1882. Gaudí se hizo cargo un año después.", "In 1882. Gaudí took over a year later.", "En 1882. Gaudí a repris le projet un an plus tard."]);
h("coca-cola", "🥤", 1886, "se inventó la Coca-Cola", "was Coca-Cola invented", "le Coca-Cola a-t-il été inventé",
  ["En 1886, en una farmacia de Atlanta.", "In 1886, in a pharmacy in Atlanta.", "En 1886, dans une pharmacie d'Atlanta."]);
h("statue-liberty", "🗽", 1886, "se inauguró la Estatua de la Libertad", "was the Statue of Liberty unveiled", "la statue de la Liberté a-t-elle été inaugurée",
  ["En 1886: fue un regalo de Francia.", "In 1886: it was a gift from France.", "En 1886 : c'était un cadeau de la France."]);
h("modern-olympics", "🏅", 1896, "se celebraron los primeros Juegos Olímpicos modernos", "were the first modern Olympic Games held", "ont eu lieu les premiers Jeux olympiques modernes",
  ["En 1896, en Atenas.", "In 1896, in Athens.", "En 1896, à Athènes."]);
h("barca-founded", "⚽", 1899, "se fundó el FC Barcelona", "was FC Barcelona founded", "le FC Barcelone a-t-il été fondé",
  ["En 1899.", "In 1899.", "En 1899."]);
h("paris-metro", "🚇", 1900, "se inauguró el metro de París", "did the Paris Métro open", "le métro de Paris a-t-il été inauguré",
  ["En 1900, durante la Exposición Universal.", "In 1900, during the World's Fair.", "En 1900, pendant l'Exposition universelle."]);
h("nobel", "🏅", 1901, "se entregaron los primeros premios Nobel", "were the first Nobel Prizes awarded", "les premiers prix Nobel ont-ils été décernés",
  ["En 1901.", "In 1901.", "En 1901."]);
h("real-madrid-founded", "⚽", 1902, "se fundó el Real Madrid", "was Real Madrid founded", "le Real Madrid a-t-il été fondé",
  ["En 1902.", "In 1902.", "En 1902."]);
h("wright", "✈️", 1903, "volaron por primera vez los hermanos Wright", "did the Wright brothers first fly", "les frères Wright ont-ils volé pour la première fois",
  ["En 1903: el primer vuelo duró 12 segundos.", "In 1903: the first flight lasted 12 seconds.", "En 1903 : le premier vol a duré 12 secondes."]);
h("tour-de-france", "🚴", 1903, "se corrió el primer Tour de Francia", "was the first Tour de France held", "a eu lieu le premier Tour de France",
  ["En 1903.", "In 1903.", "En 1903."]);
h("relativity", "🧪", 1905, "publicó Einstein la teoría de la relatividad especial", "did Einstein publish the theory of special relativity", "Einstein a-t-il publié la théorie de la relativité restreinte",
  ["En 1905, su «año milagroso».", "In 1905, his “miracle year”.", "En 1905, son « année miraculeuse »."]);
h("model-t", "🚗", 1908, "salió el Ford T, el primer coche fabricado en cadena", "did the Ford Model T, the first mass-produced car, come out", "est sortie la Ford T, première voiture produite à la chaîne",
  ["En 1908.", "In 1908.", "En 1908."]);
h("ww1-start", "🪖", 1914, "empezó la Primera Guerra Mundial", "did the First World War begin", "la Première Guerre mondiale a-t-elle commencé",
  ["En 1914.", "In 1914.", "En 1914."]);
h("ww1-end", "🕊️", 1918, "terminó la Primera Guerra Mundial", "did the First World War end", "la Première Guerre mondiale s'est-elle terminée",
  ["En 1918, el 11 de noviembre.", "In 1918, on 11 November.", "En 1918, le 11 novembre."]);
h("madrid-metro", "🚇", 1919, "se inauguró el metro de Madrid", "did the Madrid Metro open", "le métro de Madrid a-t-il été inauguré",
  ["En 1919.", "In 1919.", "En 1919."]);
h("tutankhamun", "⚱️", 1922, "se descubrió la tumba de Tutankamón", "was Tutankhamun's tomb discovered", "le tombeau de Toutânkhamon a-t-il été découvert",
  ["En 1922, por Howard Carter.", "In 1922, by Howard Carter.", "En 1922, par Howard Carter."]);
h("penicillin", "💊", 1928, "descubrió Fleming la penicilina", "did Fleming discover penicillin", "Fleming a-t-il découvert la pénicilline",
  ["En 1928, por casualidad.", "In 1928, by accident.", "En 1928, par hasard."]);
h("mickey", "🐭", 1928, "apareció Mickey Mouse en «Steamboat Willie»", "did Mickey Mouse appear in “Steamboat Willie”", "Mickey Mouse est-il apparu dans « Steamboat Willie »",
  ["En 1928.", "In 1928.", "En 1928."]);
h("first-world-cup", "🏆", 1930, "se jugó el primer Mundial de fútbol", "was the first football World Cup played", "a eu lieu la première Coupe du monde de football",
  ["En 1930, en Uruguay, que lo ganó.", "In 1930, in Uruguay, who won it.", "En 1930, en Uruguay, qui l'a remportée."]);
h("spain-women-vote", "🗳️", 1931, "se aprobó el voto de las mujeres en España", "did women win the right to vote in Spain", "les femmes ont-elles obtenu le droit de vote en Espagne",
  ["En 1931, con la Constitución de la Segunda República.", "In 1931, under the Second Republic's constitution.", "En 1931, avec la Constitution de la Seconde République."]);
h("spain-civil-war", "🇪🇸", 1936, "empezó la Guerra Civil española", "did the Spanish Civil War begin", "la guerre civile espagnole a-t-elle commencé",
  ["En 1936.", "In 1936.", "En 1936."]);
h("guernica", "🖼️", 1937, "pintó Picasso el Guernica", "did Picasso paint Guernica", "Picasso a-t-il peint Guernica",
  ["En 1937.", "In 1937.", "En 1937."]);
h("snow-white", "🍎", 1937, "se estrenó Blancanieves de Disney, su primer largometraje", "did Disney's Snow White, its first feature film, come out", "est sorti Blanche-Neige de Disney, son premier long métrage",
  ["En 1937.", "In 1937.", "En 1937."]);
h("ww2-start", "🪖", 1939, "empezó la Segunda Guerra Mundial", "did the Second World War begin", "la Seconde Guerre mondiale a-t-elle commencé",
  ["En 1939.", "In 1939.", "En 1939."]);
h("lascaux", "🦌", 1940, "se descubrió la cueva de Lascaux", "was the Lascaux cave discovered", "la grotte de Lascaux a-t-elle été découverte",
  ["En 1940, por cuatro chicos que buscaban a su perro.", "In 1940, by four teenagers looking for their dog.", "En 1940, par quatre adolescents qui cherchaient leur chien."]);
h("france-women-vote", "🗳️", 1944, "consiguieron las francesas el derecho al voto", "did French women win the right to vote", "les Françaises ont-elles obtenu le droit de vote",
  ["En 1944; votaron por primera vez en 1945.", "In 1944; they first voted in 1945.", "En 1944 ; elles ont voté pour la première fois en 1945."]);
h("ww2-end", "🕊️", 1945, "terminó la Segunda Guerra Mundial", "did the Second World War end", "la Seconde Guerre mondiale s'est-elle terminée",
  ["En 1945.", "In 1945.", "En 1945."]);
h("dna", "🧬", 1953, "se descubrió la estructura en doble hélice del ADN", "was the double-helix structure of DNA discovered", "la structure en double hélice de l'ADN a-t-elle été découverte",
  ["En 1953, gracias también a las imágenes de Rosalind Franklin.", "In 1953, thanks also to Rosalind Franklin's images.", "En 1953, grâce aussi aux images de Rosalind Franklin."]);
h("disneyland", "🏰", 1955, "abrió Disneyland en California", "did Disneyland open in California", "Disneyland a-t-il ouvert en Californie",
  ["En 1955.", "In 1955.", "En 1955."]);
h("eurovision-first", "🎤", 1956, "se celebró el primer Festival de Eurovisión", "was the first Eurovision Song Contest held", "a eu lieu le premier Concours Eurovision de la chanson",
  ["En 1956, en Suiza.", "In 1956, in Switzerland.", "En 1956, en Suisse."]);
h("lego", "🧱", 1958, "se patentó la pieza de LEGO tal y como la conocemos", "was the LEGO brick as we know it patented", "la brique LEGO telle qu'on la connaît a-t-elle été brevetée",
  ["En 1958.", "In 1958.", "En 1958."]);
h("berlin-wall-built", "🧱", 1961, "se levantó el muro de Berlín", "was the Berlin Wall built", "le mur de Berlin a-t-il été construit",
  ["En 1961.", "In 1961.", "En 1961."]);
h("beatles-album", "🎸", 1963, "publicaron los Beatles su primer disco", "did the Beatles release their first album", "les Beatles ont-ils sorti leur premier album",
  ["En 1963: «Please Please Me».", "In 1963: “Please Please Me”.", "En 1963 : « Please Please Me »."]);
h("heart-transplant", "❤️", 1967, "se hizo el primer trasplante de corazón", "was the first heart transplant performed", "a eu lieu la première greffe du cœur",
  ["En 1967, en Sudáfrica.", "In 1967, in South Africa.", "En 1967, en Afrique du Sud."]);
h("rubik", "🧊", 1974, "se inventó el cubo de Rubik", "was the Rubik's Cube invented", "le Rubik's Cube a-t-il été inventé",
  ["En 1974, en Hungría.", "In 1974, in Hungary.", "En 1974, en Hongrie."]);
h("concorde", "✈️", 1976, "hizo el Concorde su primer vuelo comercial", "did Concorde make its first commercial flight", "le Concorde a-t-il effectué son premier vol commercial",
  ["En 1976.", "In 1976.", "En 1976."]);
h("star-wars", "🌌", 1977, "se estrenó la primera película de La guerra de las galaxias", "did the first Star Wars film come out", "est sorti le premier film Star Wars",
  ["En 1977.", "In 1977.", "En 1977."]);
h("spain-constitution", "📜", 1978, "se aprobó la Constitución española actual", "was Spain's current constitution approved", "la Constitution espagnole actuelle a-t-elle été adoptée",
  ["En 1978, el 6 de diciembre.", "In 1978, on 6 December.", "En 1978, le 6 décembre."]);
h("walkman", "🎧", 1979, "salió el primer Walkman de Sony", "did the first Sony Walkman come out", "est sorti le premier Walkman de Sony",
  ["En 1979.", "In 1979.", "En 1979."]);
h("mario", "🍄", 1981, "apareció Mario por primera vez, en Donkey Kong", "did Mario first appear, in Donkey Kong", "Mario est-il apparu pour la première fois, dans Donkey Kong",
  ["En 1981. Entonces se llamaba «Jumpman».", "In 1981. Back then he was called “Jumpman”.", "En 1981. Il s'appelait alors « Jumpman »."]);
h("tetris", "🟦", 1984, "se creó el Tetris", "was Tetris created", "Tetris a-t-il été créé",
  ["En 1984, en la Unión Soviética.", "In 1984, in the Soviet Union.", "En 1984, en Union soviétique."]);
h("super-mario-bros", "🍄", 1985, "salió Super Mario Bros. para la NES", "did Super Mario Bros. come out on the NES", "est sorti Super Mario Bros. sur NES",
  ["En 1985.", "In 1985.", "En 1985."]);
h("spain-eec", "🇪🇺", 1986, "entró España en la Comunidad Europea", "did Spain join the European Community", "l'Espagne est-elle entrée dans la Communauté européenne",
  ["En 1986, junto a Portugal.", "In 1986, together with Portugal.", "En 1986, avec le Portugal."]);
h("chernobyl", "☢️", 1986, "ocurrió el accidente nuclear de Chernóbil", "did the Chernobyl nuclear disaster happen", "a eu lieu l'accident nucléaire de Tchernobyl",
  ["En 1986.", "In 1986.", "En 1986."]);
h("mandela-freed", "✊", 1990, "salió Nelson Mandela de la cárcel", "was Nelson Mandela released from prison", "Nelson Mandela est-il sorti de prison",
  ["En 1990, tras 27 años preso.", "In 1990, after 27 years in prison.", "En 1990, après 27 ans de prison."]);
h("first-website", "🌐", 1991, "se publicó la primera página web", "was the first website published", "le premier site web a-t-il été publié",
  ["En 1991, en el CERN.", "In 1991, at CERN.", "En 1991, au CERN."]);
h("barcelona-92", "🏅", 1992, "se celebraron los Juegos Olímpicos de Barcelona", "were the Barcelona Olympic Games held", "ont eu lieu les Jeux olympiques de Barcelone",
  ["En 1992. España ganó 22 medallas, 13 de oro.", "In 1992. Spain won 22 medals, 13 of them gold.", "En 1992. L'Espagne a gagné 22 médailles, dont 13 d'or."]);
h("toy-story", "🤠", 1995, "se estrenó Toy Story, la primera película hecha entera por ordenador", "did Toy Story, the first fully computer-animated film, come out", "est sorti Toy Story, le premier film entièrement en images de synthèse",
  ["En 1995.", "In 1995.", "En 1995."]);
h("dolly", "🐑", 1996, "nació la oveja Dolly, el primer mamífero clonado", "was Dolly the sheep, the first cloned mammal, born", "est née la brebis Dolly, premier mammifère cloné",
  ["En 1996.", "In 1996.", "En 1996."]);
h("harry-potter", "⚡", 1997, "se publicó el primer libro de Harry Potter", "was the first Harry Potter book published", "le premier livre de Harry Potter a-t-il été publié",
  ["En 1997.", "In 1997.", "En 1997."]);
h("titanic-film", "🚢", 1997, "se estrenó la película Titanic", "did the film Titanic come out", "est sorti le film Titanic",
  ["En 1997. Ganó 11 Óscar.", "In 1997. It won 11 Oscars.", "En 1997. Il a gagné 11 Oscars."]);
h("google", "🔎", 1998, "se fundó Google", "was Google founded", "Google a-t-il été fondé",
  ["En 1998.", "In 1998.", "En 1998."]);
h("wikipedia", "📖", 2001, "nació Wikipedia", "was Wikipedia launched", "Wikipédia a-t-elle été lancée",
  ["En 2001.", "In 2001.", "En 2001."]);
h("euro-cash", "💶", 2002, "empezaron a circular los billetes y monedas de euro", "did euro notes and coins come into circulation", "les billets et pièces en euros ont-ils été mis en circulation",
  ["En 2002, el 1 de enero.", "In 2002, on 1 January.", "En 2002, le 1er janvier."]);
h("facebook", "👍", 2004, "se creó Facebook", "was Facebook created", "Facebook a-t-il été créé",
  ["En 2004.", "In 2004.", "En 2004."]);
h("youtube", "▶️", 2005, "se subió el primer vídeo a YouTube", "was the first video uploaded to YouTube", "la première vidéo a-t-elle été mise en ligne sur YouTube",
  ["En 2005: «Me at the zoo», de 19 segundos.", "In 2005: “Me at the zoo”, 19 seconds long.", "En 2005 : « Me at the zoo », 19 secondes."]);
h("iphone", "📱", 2007, "se presentó el primer iPhone", "was the first iPhone unveiled", "le premier iPhone a-t-il été présenté",
  ["En 2007.", "In 2007.", "En 2007."]);
h("instagram", "📸", 2010, "se lanzó Instagram", "was Instagram launched", "Instagram a-t-il été lancé",
  ["En 2010.", "In 2010.", "En 2010."]);
h("felipe-vi", "👑", 2014, "fue proclamado rey Felipe VI", "was Felipe VI proclaimed king of Spain", "Felipe VI a-t-il été proclamé roi d'Espagne",
  ["En 2014.", "In 2014.", "En 2014."]);
h("brexit-vote", "🇬🇧", 2016, "votaron los británicos salir de la Unión Europea", "did Britain vote to leave the European Union", "les Britanniques ont-ils voté pour quitter l'Union européenne",
  ["En 2016; la salida se hizo efectiva en 2020.", "In 2016; it actually left in 2020.", "En 2016 ; la sortie a été effective en 2020."]);
h("notre-dame-fire", "🔥", 2019, "se incendió la catedral de Notre-Dame de París", "did Notre-Dame Cathedral in Paris catch fire", "la cathédrale Notre-Dame de Paris a-t-elle brûlé",
  ["En 2019. Reabrió en diciembre de 2024.", "In 2019. It reopened in December 2024.", "En 2019. Elle a rouvert en décembre 2024."]);
h("covid", "🦠", 2020, "se declaró la pandemia de COVID-19", "was the COVID-19 pandemic declared", "la pandémie de COVID-19 a-t-elle été déclarée",
  ["En 2020, el 11 de marzo.", "In 2020, on 11 March.", "En 2020, le 11 mars."]);
h("spain-women-world-cup", "⚽", 2023, "ganó España el Mundial de fútbol femenino", "did Spain win the women's football World Cup", "l'Espagne a-t-elle gagné la Coupe du monde féminine de football",
  ["En 2023, en Australia y Nueva Zelanda.", "In 2023, in Australia and New Zealand.", "En 2023, en Australie et en Nouvelle-Zélande."]);
h("hundred-years-solitude", "📕", 1967, "se publicó Cien años de soledad", "was One Hundred Years of Solitude published", "Cent ans de solitude a-t-il été publié",
  ["En 1967.", "In 1967.", "En 1967."]);
h("little-prince", "🌹", 1943, "se publicó El principito", "was The Little Prince published", "Le Petit Prince a-t-il été publié",
  ["En 1943, en Nueva York.", "In 1943, in New York.", "En 1943, à New York."]);
