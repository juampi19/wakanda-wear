import bcryptjs from 'bcryptjs';

/**
 productos - tipos
 descripcion: string
 imagenes: string[]
 inStock: number
 precio: number
 tallas: []
 slug: string
 tags:[]
 titulo: []
 tipo: string
 genero: string
 */


/**
 * Usuarios
 * nombre: string,
 * email: string,
 * password: string,
 * rol: 'admin' | 'cliente' | 'repartidor'
 */





 export const DataInicial =  {
  usuarios: [
    {
      nombre: 'juan',
      email: 'juan@gmail.com',
      password: bcryptjs.hashSync('juan123'),
      rol: 'admin'
    },{
      nombre: 'freddy',
      email: 'freddy@gmail.com',
      password: bcryptjs.hashSync('freddy123'),
      rol: 'cliente'
    },{
      nombre: 'joaquin',
      email: 'joaquin@gmail.com',
      password: bcryptjs.hashSync('joaquin123'),
      rol: 'cliente'
    }
  ],
  productos: [
    {
      descripcion: 'Los Héroes más poderosos del planeta, un equipo compuesto de personajes extraordinarios; Iron Man, Spiderman, doctor strange, Hulk, Venom. Son tan poderosos que han derrotado a Loki, Ultrón, incluso al mismo Thanos, juntos nada los podrá vencer ¡Vengadores unidos!.¡Bienvenidos sean al Universo de Marvel y al extraordinario mundo del Cómic!',
      imagenes: [
        '173437-1600-1600.png',
        '173439-1600-1600.png'
      ],
      inStock: 7,
      precio: 10000,
      tallas: ['XS','S','M','L','XL','XXL','XXXL'],
      slug: 'polera-hombre-marvel-vinotinto',
      tipo: 'poleras',
      tags: ['poleras', 'marvel', 'avengers'],
      titulo: 'Polera Manga Corta Marvel',
      genero: 'hombre'
    },
    
    {
      descripcion: 'Siempre han estado entre nosotros en silencio, observando, protegiéndonos los Deviantes durante miles de años. Ésta raza alienígena inmortal emergen como la única salvación ante un enemigo tan maligno. ¡Unete a Ikaris, Caballero Negro, Thena, Sersi, Kingo, Sprite para enfrentar esta amenaza!¡Bienvenidos sean al Universo de Marvel y al extraordinario mundo del Cómic!',
      imagenes: [
        '596261-1200-1200.png',
        '596287-1200-1200.png'
      ],
      inStock: 10,
      precio: 9000,
      tallas: ['XS','S','M','L'],
      slug: 'polera-mc-hombre-marvel-eternals-morada',
      tipo: 'poleras',
      tags: ['poleras', 'marvel', 'eternals'],
      titulo: 'Polera Hombre Eternals Comic Morado Marvel',
      genero: 'hombre'
    },
    {
      descripcion: 'Siempre han estado entre nosotros en silencio, observando, protegiéndonos los Deviantes durante miles de años. Ésta raza alienígena inmortal emergen como la única salvación ante un enemigo tan maligno. ¡Unete a Ikaris, Caballero Negro, Thena, Sersi, Kingo, Sprite para enfrentar esta amenaza!¡Bienvenidos sean al Universo de Marvel y al extraordinario mundo del Cómic!',
      imagenes: [
        '751485-800-800.png',
        '751491-800-800.png'
      ],
      inStock: 10,
      precio: 8990,
      tallas: ['XS','S','M','L'],
      slug: 'polera-hombre-iron-man-perfil-negro-marvel',
      tipo: 'poleras',
      tags: ['poleras', 'marvel', 'iron man'],
      titulo: 'Polera Hombre Iron Man Perfil Negro Marvel',
      genero: 'hombre'
    },
    {
      descripcion: 'Por más de 60 años esta editorial nos ha entregado historias increíbles y personajes emblemáticos, de la mano y mente de los notables Stan Lee, Jack Kirby y Steve Ditko. Casa de Spiderman, Hulk, Iron Man, X-men, Cuatro fantásticos, los vengadores y muchos otros. Ahora siendo parte de Disney nos siguen sorprendiendo y emocionando con las aventuras que tanto disfrutamos.¡Bienvenidos sean al Universo de Marvel y al extraordinario mundo del Cómic!',
      imagenes: [
        '608546-1200-1200.png',
        '608565-1200-1200.png'
      ],
      inStock: 8,
      precio: 12000,
      tallas: ['S','M','L'],
      slug: 'polera-hombre-vintage-comic-blanco-marvel',
      tipo: 'poleras',
      tags: ['poleras', 'marvel', 'comic'],
      titulo: 'Polera Hombre Vintage Comic Blanco Marvel',
      genero: 'hombre'
    },
    {
      descripcion: 'Polera Mc Hombre Calavera Charcoal Marvel',
      imagenes: [
        '692713-800-800.png',
        '692714-800-800.png'
      ],
      inStock: 8,
      precio: 16990,
      tallas: ['XS','S','M','L'],
      slug: 'polera-hombre-marver-calavera-negro-marvel',
      tipo: 'poleras',
      tags:['poleras', 'marvel', 'punisher'],
      titulo: 'Polera Hombre Marver Calavera Negro Marvel The Punisher',
      genero: 'hombre'
      
    },
    {
      descripcion: 'Los Héroes más poderosos del planeta, un equipo compuesto de personajes extraordinarios; Iron Man, Capitán América, Thor, Hulk, Black Widow, Ant-man, The Wasp. Son tan poderosos que han derrotado a Loki, Ultrón, incluso al mismo Thanos, juntos nada los podrá vencer ¡Vengadores unidos!.¡Bienvenidos sean al Universo de Marvel y al extraordinario mundo del Cómic!',
      imagenes: [
        '596158-1200-1200.png',
        '596174-1200-1200.png'
      ],
      inStock: 0,
      precio: 22000,
      tallas: ['S','M','L','XL'],
      slug: 'poleron-hombre-avengers-logo-negro-marvel',
      tipo: 'polerones',
      tags: ['polerones', 'marvel', 'avengers'],
      titulo: 'Poleron Hombre Avengers Logo Negro Marvel',
      genero: 'hombre'
    },
    {
      descripcion: 'Por más de 60 años esta editorial nos ha entregado historias increíbles y personajes emblemáticos, de la mano y mente de los notables Stan Lee, Jack Kirby y Steve Ditko. Casa de Spiderman, Hulk, Iron Man, X-men, Cuatro fantásticos, los vengadores y muchos otros. Ahora siendo parte de Disney nos siguen sorprendiendo y emocionando con las aventuras que tanto disfrutamos.¡Bienvenidos sean al Universo de Marvel y al extraordinario mundo del Cómic!',
      imagenes: [
        '582271-1200-1200.png',
        '582302-1200-1200.png'
      ],
      inStock: 12,
      precio: 11000,
      tallas: ['S','M'],
      slug: 'polera-hombre-capitan-america-shield-gris-marve',
      tipo: 'poleras',
      tags: ['poleras', 'marvel', 'capitan america'],
      titulo: 'Polera Hombre Capitan America Shield Gris Marvel',
      genero: 'hombre'
    },

    {
      descripcion: 'Por más de 60 años esta editorial nos ha entregado historias increíbles y personajes emblemáticos, de la mano y mente de los notables Stan Lee, Jack Kirby y Steve Ditko. Casa de Spiderman, Hulk, Iron Man, X-men, Cuatro fantásticos, los vengadores y muchos otros. Ahora siendo parte de Disney nos siguen sorprendiendo y emocionando con las aventuras que tanto disfrutamos.¡Bienvenidos sean al Universo de Marvel y al extraordinario mundo del Cómic!',
      imagenes: [
        '666709-1200-1200.png',
        '666714-1200-1200.png',
        '666721-1200-1200.png',
        '666725-1200-1200.png'
      ],
      inStock: 12,
      precio: 11000,
      tallas: ['S','M','L'],
      slug: 'polera-hombre-Grogu-StarWars-gris',
      tipo: 'poleras',
      tags: ['poleras', 'starwar', 'mandalorian'],
      titulo: 'Polera Hombre Grogu Star Wars Gris ',
      genero: 'hombre'
    },
    {
      descripcion: 'Nadie más divertido que el intrépido Wade Wilson, totalmente inestable pero casi invencible. La cura a su cáncer trajo consigo una dotación mutante de superpoderes y tu que prefieres ¿Ser el mercenario o el antihéroe? ¡Acompaña a Dead pool!',
      imagenes: [
        '692573-800-800.png',
        '692574-800-800.png'
      ],
      inStock: 0,
      precio: 11000,
      tallas: ['M','L','XL'],
      slug: 'polera-hombre-dead-pool-rostro-negro-marvel',
      tipo: 'poleras',
      tags:['poleras', 'marvel', 'deadpool'],
      titulo: 'Polera Hombre Dead Pool Rostro Negro Marvel',
      genero: 'hombre'

    },
    
    {
      descripcion: 'Por más de 60 años esta editorial nos ha entregado historias increíbles y personajes emblemáticos, de la mano y mente de los notables Stan Lee, Jack Kirby y Steve Ditko. Casa de Spiderman, Hulk, Iron Man, X-men, Cuatro fantásticos, los vengadores y muchos otros. Ahora siendo parte de Disney nos siguen sorprendiendo y emocionando con las aventuras que tanto disfrutamos.',
      imagenes: [
        '662736-800-800.png',
        '662744-800-800.png'
      ],
      inStock: 5,
      precio: 12990,
      tallas: ['M','L','XL'],
      slug: 'polera-mujer-logo-negro-marvel',
      tipo: 'poleras',
      tags:['poleras', 'marvel'],
      titulo: 'Polera Mujer Logo Negro Marvel',
      genero: 'mujer'

    },
    {
      descripcion: 'Por más de 60 años esta editorial nos ha entregado historias increíbles y personajes emblemáticos, de la mano y mente de los notables Stan Lee, Jack Kirby y Steve Ditko. Casa de Spiderman, Hulk, Iron Man, X-men, Cuatro fantásticos, los vengadores y muchos otros. Ahora siendo parte de Disney nos siguen sorprendiendo y emocionando con las aventuras que tanto disfrutamos.',
      imagenes: [
        '739516-800-800.png',
        '739530-800-800.png'
      ],
      inStock: 7,
      precio: 19990,
      tallas: ['S','M','L','XL'],
      slug: 'poleron-mujer-black-panther-wakanda-gris-marvel',
      tipo: 'polerones',
      tags:['polerones', 'marvel', 'wakanda', 'black panther'],
      titulo: 'Poleron Mujer Black Panther Wakanda Gris Marvel',
      genero: 'mujer'

    },
    {
      descripcion: 'Por más de 60 años esta editorial nos ha entregado historias increíbles y personajes emblemáticos, de la mano y mente de los notables Stan Lee, Jack Kirby y Steve Ditko. Casa de Spiderman, Hulk, Iron Man, X-men, Cuatro fantásticos, los vengadores y muchos otros. Ahora siendo parte de Disney nos siguen sorprendiendo y emocionando con las aventuras que tanto disfrutamos.',
      imagenes: [
        '680157-800.png',
        '680156-800.png'
      ],
      inStock: 3,
      precio: 12990,
      tallas: ['M','L','XL'],
      slug: 'polera-mujer-capitan-america-super-blanco-marvel',
      tipo: 'poleras',
      tags:['poleras', 'marvel', 'avengers', 'capitan america'],
      titulo: 'Polera Mujer Capitan America Super Blanco Marvel',
      genero: 'mujer'

    },
    {
      descripcion: 'Los Héroes más poderosos del planeta, un equipo compuesto de personajes extraordinarios; Iron Man, Capitán América, Thor, Hulk, Black Widow, Ant-man, The Wasp. Son tan poderosos que han derrotado a Loki, Ultrón, incluso al mismo Thanos, juntos nada los podrá vencer ¡Vengadores unidos!',
      imagenes: [
        '667831-800-800.png',
        '667844-800-800.png'
      ],
      inStock: 3,
      precio: 12990,
      tallas: ['M','L','XL'],
      slug: 'polera-mujer-avengers-team-blanco-marvel',
      tipo: 'poleras',
      tags:['poleras', 'marvel', 'avengers'],
      titulo: 'Polera Mujer Avengers Team Blanco Marvel',
      genero: 'mujer'
      
    },
    {
      descripcion: 'El mandaloriano Din Djarin, conocido como "Mando", cazarrecompensas se verá cruzado por una aventura que nunca se hubiera imagino, ser el tutor de un bebé de la misma raza que Yoda, el niño Grogu. Con él emprederán este viaje hasta que Mando pueda entregarlo en un lugar seguro para que se pueda formar y completar el potencial de fuerza que habita en él, pero para ello habrán muchos desafios y enemigos en el camino. Recoge tu Jetpack, ponte la armadura Beskar y sumáte a esta travesía con el mandaloriano.',
      imagenes: [
        '740226-800-800.png',
        '740233-800-800.png'
      ],
      inStock: 3,
      precio: 12990,
      tallas: ['M','L','XL'],
      slug: 'polera-mujer-grogu-cute-child-gris-star-wars',
      tipo: 'poleras',
      tags:['poleras', 'starwar', 'mandalorian'],
      titulo: 'Polera Mujer Grogu Cute Child Gris Star Wars',
      genero: 'mujer'
      
    },
    {
      descripcion: 'Los Héroes más poderosos del planeta, un equipo compuesto de personajes extraordinarios; Iron Man, Capitán América, Thor, Hulk, Black Widow, Ant-man, The Wasp. Son tan poderosos que han derrotado a Loki, Ultrón, incluso al mismo Thanos, juntos nada los podrá vencer ¡Vengadores unidos!',
      imagenes: [
        '751511-800-800.png',
        '751534-800-800.png'
      ],
      inStock: 0,
      precio: 12990,
      tallas: ['S','M','L','XL'],
      slug: 'polera-mujer-avengers-colours-gris-marvel',
      tipo: 'poleras',
      tags:['poleras', 'marvel', 'avengers', 'mujer'],
      titulo: 'Polera Mujer Avengers Colours Gris Marvel',
      genero: 'mujer'
      
    },
    
    {
      descripcion: 'Peter Parker, el hombre araña, a pesar de su corta edad este vecino amigable es portador de increíbles habilidades sobrehumanas. Desde que fue mordido por una araña, este trepa-muros tuvo que lidiar con su vida personal de estudiante y combatir el mal por las calles de New York, enfrentando enemigos del calibre de Kingpin hasta los Seis Siniestros. ¿Te gustaría ser parte de la aventura y unirte al increíble Spiderman?',
      imagenes: [
        '753829-800-800.png',
        '753838-800-800.png'
      ],
      inStock: 10,
      precio: 14990,
      tallas: ['S','M','L'],
      slug: 'pantalon-de-buzo-niño-spiderman-cool-multicolor-marvel',
      tipo: 'pantalones',
      tags:['pantalones', 'marvel', 'spiderman', 'hombre'],
      titulo: 'Pantalon de Buzo Niño Spiderman Cool Multicolor Marvel',
      genero: 'hombre'
      
    },
    {
      descripcion: 'Peter Parker, el hombre araña, a pesar de su corta edad este vecino amigable es portador de increíbles habilidades sobrehumanas. Desde que fue mordido por una araña, este trepa-muros tuvo que lidiar con su vida personal de estudiante y combatir el mal por las calles de New York, enfrentando enemigos del calibre de Kingpin hasta los Seis Siniestros. ¿Te gustaría ser parte de la aventura y unirte al increíble Spiderman?',
      imagenes: [
        '750083-800-800.png',
        '750098-800-800.png'
      ],
      inStock: 10,
      precio: 14990,
      tallas: ['S','M','L'],
      slug: 'pantalon-de-buzo-niño-spiderman-icono-araña-gris-marvel',
      tipo: 'pantalones',
      tags:['pantalones', 'marvel', 'spiderman', 'hombre'],
      titulo: 'Pantalon de Buzo Niño Spiderman Icono Araña Gris Marvel',
      genero: 'hombre'
      
    },
    {
      descripcion: 'Peter Parker, el hombre araña, a pesar de su corta edad este vecino amigable es portador de increíbles habilidades sobrehumanas. Desde que fue mordido por una araña, este trepa-muros tuvo que lidiar con su vida personal de estudiante y combatir el mal por las calles de New York, enfrentando enemigos del calibre de Kingpin hasta los Seis Siniestros. ¿Te gustaría ser parte de la aventura y unirte al increíble Spiderman?',
      imagenes: [
        '759286-800-800.png',
        '759302-800-800.png'
      ],
      inStock: 10,
      precio: 12990,
      tallas: ['S','M','L'],
      slug: 'polera-manga-larga-niño-spiderman-multiverse-gris-marvel',
      tipo: 'poleras',
      tags:['poleras', 'marvel', 'spiderman', 'hombre'],
      titulo: 'Polera Manga Larga Niño Spiderman Multiverse Gris Marvel',
      genero: 'hombre'
      
    },
    {
      descripcion: 'Peter Parker, el hombre araña, a pesar de su corta edad este vecino amigable es portador de increíbles habilidades sobrehumanas. Desde que fue mordido por una araña, este trepa-muros tuvo que lidiar con su vida personal de estudiante y combatir el mal por las calles de New York, enfrentando enemigos del calibre de Kingpin hasta los Seis Siniestros. ¿Te gustaría ser parte de la aventura y unirte al increíble Spiderman?',
      imagenes: [
        '744804-800-800.png',
        '744814-800-800.png'
      ],
      inStock: 0,
      precio: 19990,
      tallas: ['S','M','L'],
      slug: 'poleron-niño-spiderman-telarañas-gris-marvel',
      tipo: 'polerones',
      tags:['polerones', 'marvel', 'spiderman', 'hombre'],
      titulo: 'Poleron Niño Spiderman Telarañas Gris Marvel',
      genero: 'hombre'
      
    },
    {
      descripcion: 'Peter Parker, el hombre araña, a pesar de su corta edad este vecino amigable es portador de increíbles habilidades sobrehumanas. Desde que fue mordido por una araña, este trepa-muros tuvo que lidiar con su vida personal de estudiante y combatir el mal por las calles de New York, enfrentando enemigos del calibre de Kingpin hasta los Seis Siniestros. ¿Te gustaría ser parte de la aventura y unirte al increíble Spiderman?',
      imagenes: [
        '753991-800-800.png',
        '754008-800-800.png'
      ],
      inStock: 11,
      precio: 19990,
      tallas: ['S','M','L'],
      slug: 'poleron-niño-spiderman-azul-marvel',
      tipo: 'polerones',
      tags:['polerones', 'marvel', 'spiderman', 'hombre'],
      titulo: 'Poleron Niño Spiderman Big S Azul Marvel',
      genero: 'hombre'
      
    },
    {
      descripcion: 'Los Héroes más poderosos del planeta, un equipo compuesto de personajes extraordinarios; Iron Man, Capitán América, Thor, Hulk, Black Widow, Ant-man, The Wasp. Son tan poderosos que han derrotado a Loki, Ultrón, incluso al mismo Thanos, juntos nada los podrá vencer ¡Vengadores unidos!',
      imagenes: [
        '753209-800-800.png',
        '753216-800-800.png'
      ],
      inStock: 12,
      precio: 12990,
      tallas: ['S','M','L'],
      slug: 'pantalon-de-buzo-niño-avengers-team-gris-marvel',
      tipo: 'polerones',
      tags:['polerones', 'marvel', 'avengers', 'niños'],
      titulo: 'Pantalon de Buzo Niño Avengers Team Gris Marvel',
      genero: 'niños'
      
    },
    {
      descripcion: 'Por más de 60 años esta editorial nos ha entregado historias increíbles y personajes emblemáticos, de la mano y mente de los notables Stan Lee, Jack Kirby y Steve Ditko. Casa de Spiderman, Hulk, Iron Man, X-men, Cuatro fantásticos, los vengadores y muchos otros. Ahora siendo parte de Disney nos siguen sorprendiendo y emocionando con las aventuras que tanto disfrutamos.¡Bienvenidos sean al Universo de Marvel y al extraordinario mundo del Cómic!',
      imagenes: [
        'ba39f4a3-f0c7-4092-82c3-05c6c089cda9.png',
        'f81b3120-7960-46d2-8256-bf00492e626f.png'
      ],
      inStock: 12,
      precio: 12990,
      tallas: ['S','M'],
      slug: 'polera-manga-larga-nino-capitan-america-w-blanco-marvel',
      tipo: 'poleras',
      tags: ['poleras', 'marvel', 'capitan america', 'niños'],
      titulo: 'Polera Manga Larga Niño Capitan America W Blanco Marvel',
      genero: 'niños'
    },
    {
      descripcion: 'Peter Parker, el hombre araña, a pesar de su corta edad este vecino amigable es portador de increíbles habilidades sobrehumanas. Desde que fue mordido por una araña, este trepa-muros tuvo que lidiar con su vida personal de estudiante y combatir el mal por las calles de New York, enfrentando enemigos del calibre de Kingpin hasta los Seis Siniestros. ¿Te gustaría ser parte de la aventura y unirte al increíble Spiderman?',
      imagenes: [
        '10.png',
        '11.png'
      ],
      inStock: 10,
      precio: 15990,
      tallas: ['S','M','L'],
      slug: 'pantalon-de-buzo-spiderman-negro',
      tipo: 'pantalones',
      tags:['pantalones', 'marvel', 'spiderman', 'buzos','niños'],
      titulo: 'Pantalon De Buzo Spiderman',
      genero: 'niños'
      
    },
    {
      descripcion: 'Peter Parker, el hombre araña, a pesar de su corta edad este vecino amigable es portador de increíbles habilidades sobrehumanas. Desde que fue mordido por una araña, este trepa-muros tuvo que lidiar con su vida personal de estudiante y combatir el mal por las calles de New York, enfrentando enemigos del calibre de Kingpin hasta los Seis Siniestros. ¿Te gustaría ser parte de la aventura y unirte al increíble Spiderman?',
      imagenes: [
        'fdfb0b46-700b-4a1b-a957-7b8c6d845f54.png',
        '411f6e2f-2cf4-4d70-91ce-f96699b3cb95.png'
      ],
      inStock: 11,
      precio: 16990,
      tallas: ['S','M','L'],
      slug: 'poleron-spiderman-color-gris',
      tipo: 'polerones',
      tags:['polerones', 'marvel', 'spiderman','hombre'],
      titulo: 'Polerón Spiderman Gris',
      genero: 'hombre'
      
    },
    {
      descripcion: 'Los Héroes más poderosos del planeta, un equipo compuesto de personajes extraordinarios; Iron Man, Spiderman, doctor strange, Hulk, Venom. Son tan poderosos que han derrotado a Loki, Ultrón, incluso al mismo Thanos, juntos nada los podrá vencer ¡Vengadores unidos!.¡Bienvenidos sean al Universo de Marvel y al extraordinario mundo del Cómic!',
      imagenes: [
        'bf1e1d06-e886-40be-9213-53539c777659.png',
        '85d3cecb-3615-437c-ae62-cc32a15c961e.png'
      ],
      inStock: 7,
      precio: 11190,
      tallas: ['S','M','L','XL'],
      slug: 'polera-nino-hombre-holo-gris-oscuro-marvel',
      tipo: 'poleras',
      tags: ['avengers', 'marvel', 'iron man', 'hulk', 'capitan america', 'hombre'],
      titulo: 'Polera Manga Corta Marvel',
      genero: 'hombre'
    },
    {
      descripcion: 'Los Héroes más poderosos del planeta, un equipo compuesto de personajes extraordinarios; Iron Man, Capitán América, Thor, Hulk, Black Widow, Ant-man, The Wasp. Son tan poderosos que han derrotado a Loki, Ultrón, incluso al mismo Thanos, juntos nada los podrá vencer ¡Vengadores unidos!.¡Bienvenidos sean al Universo de Marvel y al extraordinario mundo del Cómic!',
      imagenes: [
        '0f7cf877-edd7-4aef-8b55-ee8fb297bf61.png',
        '210980d3-ca11-43fb-b082-3e05c2ce9f04.png'
      ],
      inStock: 0,
      precio: 22000,
      tallas: ['S','M','L','XL'],
      slug: 'poleron-avengers-negro-thor-ionman-hulk-capitanamerica',
      tipo: 'polerones',
      tags: ['polerones', 'marvel', 'avengers','hombre'],
      titulo: 'Polerón Avengers',
      genero: 'hombre'
    },
    {
      descripcion: 'Por más de 60 años esta editorial nos ha entregado historias increíbles y personajes emblemáticos, de la mano y mente de los notables Stan Lee, Jack Kirby y Steve Ditko. Casa de Spiderman, Hulk, Iron Man, X-men, Cuatro fantásticos, los vengadores y muchos otros. Ahora siendo parte de Disney nos siguen sorprendiendo y emocionando con las aventuras que tanto disfrutamos.',
      imagenes: [
        '23892d07-44c7-4079-8597-a2c8b96c69ef.png',
        '5b9882d8-86d3-4de2-9f73-4cbc8f3a4e1d.png',
        'bab70b13-1256-4354-bcab-1dd1819cfcb2.png'
      ],
      inStock: 7,
      precio: 12990,
      tallas: ['S','M','L','XL'],
      slug: 'polera-hombre-black-panther-huella-negro-marvel',
      tipo: 'poleras',
      tags:['poleras', 'marvel', 'wakanda', 'black panther','hombre'],
      titulo: 'Polera Niño Black Panther Huella Negro Marvel',
      genero: 'hombre'

    },
    {
      descripcion: 'Por más de 60 años esta editorial nos ha entregado historias increíbles y personajes emblemáticos, de la mano y mente de los notables Stan Lee, Jack Kirby y Steve Ditko. Casa de Spiderman, Hulk, Iron Man, X-men, Cuatro fantásticos, los vengadores y muchos otros. Ahora siendo parte de Disney nos siguen sorprendiendo y emocionando con las aventuras que tanto disfrutamos.',
      imagenes: [
        '4a6c83db-fffc-41eb-b4f7-7ab7591c2cf0.png',
        '869312c3-f776-4646-a47f-ee3835e4fd3e.png'
      ],
      inStock: 7,
      precio: 19990,
      tallas: ['S','M','L'],
      slug: 'poleron-nino-black-panther-vintage-gris-marvel',
      tipo: 'polerones',
      tags:['polerones', 'marvel', 'wakanda', 'black panther','niños'],
      titulo: 'Poleron Niño Black Panther Vintage Gris Marvel',
      genero: 'niños'

    },
    {
      descripcion: 'Por más de 60 años esta editorial nos ha entregado historias increíbles y personajes emblemáticos, de la mano y mente de los notables Stan Lee, Jack Kirby y Steve Ditko. Casa de Spiderman, Hulk, Iron Man, X-men, Cuatro fantásticos, los vengadores y muchos otros. Ahora siendo parte de Disney nos siguen sorprendiendo y emocionando con las aventuras que tanto disfrutamos.¡Bienvenidos sean al Universo de Marvel y al extraordinario mundo del Cómic!',
      imagenes: [
        '3a76390e-0d13-4ded-923e-2c2a68dd9b54.png',
        '66997ebb-74fc-4d6c-9ef3-4ab52058238a.png'
      ],
      inStock: 8,
      precio: 12000,
      tallas: ['L'],
      slug: 'polera-ob-hombre-manga-corta-roja-marvel-comics',
      tipo: 'poleras',
      tags: ['poleras', 'marvel', 'comic', 'hombre'],
      titulo: 'Polera OB Hombre Manga Corta Roja Marvel Comics L',
      genero: 'hombre'
    },
    {
      descripcion: 'Los Héroes más poderosos del planeta, un equipo compuesto de personajes extraordinarios; Iron Man, Spiderman, doctor strange, Hulk, Venom. Son tan poderosos que han derrotado a Loki, Ultrón, incluso al mismo Thanos, juntos nada los podrá vencer ¡Vengadores unidos!.¡Bienvenidos sean al Universo de Marvel y al extraordinario mundo del Cómic!',
      imagenes: [
        '7cabff3c-4472-400d-9602-9f3c8b5f9b61.png',
        '2cccea08-2759-4552-99cd-d6af1a54b86f.png'
      ],
      inStock: 7,
      precio: 11190,
      tallas: ['S','M','L','XL'],
      slug: 'mango-kids-polera-estampado-marvel',
      tipo: 'poleras',
      tags: ['avengers', 'marvel', 'iron man', 'hulk', 'capitan america', 'hombre'],
      titulo: 'Polera OB Hombre Negro Algodón XXL Black Panther',
      genero: 'hombre'
    },
    {
      descripcion: 'Desde una galaxia muy muy lejana… donde converge la lucha de la resistencia contra el Imperio Galáctico, el lado oscuro y el luminoso, los Jedi y los Sith. George Lucas nos trae esta saga de películas conocida como La Guerra de las galaxias, con sus tres trilogías. Una Nueva Esperanza, El retorno del Jedi y El Imperio Contraataca son las que dieron el inicio de esta franquicia de ciencia ficción, contando el viaje Luke Skywalker de la mano de sus maestros Obi-Wan Kenobi y Yoda, en contra al malvado emperador Palpatine y Darth Vader',
      imagenes: [
        'pantuflasstarwars-removebg-preview.png',
        'pantuflasstarwars2-removebg-preview.png'
      ],
      inStock: 4,
      precio: 11190,
      tallas: ['M','L','XL'],
      slug: 'pantufla-3d-hombre-darth-vader-head-negro-star-wars',
      tipo: 'pantuflas',
      tags: ['Jedi', 'Star wars', 'sable laser', 'darth vader', 'Sith', 'galaxia'],
      titulo: 'Pantufla 3D Hombre Darth Vader Head Negro Star Wars',
      genero: 'hombre'
    },
    {
      descripcion: 'Desde una galaxia muy muy lejana… donde converge la lucha de la resistencia contra el Imperio Galáctico, el lado oscuro y el luminoso, los Jedi y los Sith. George Lucas nos trae esta saga de películas conocida como La Guerra de las galaxias, con sus tres trilogías. Una Nueva Esperanza, El retorno del Jedi y El Imperio Contraataca son las que dieron el inicio de esta franquicia de ciencia ficción, contando el viaje Luke Skywalker de la mano de sus maestros Obi-Wan Kenobi y Yoda, en contra al malvado emperador Palpatine y Darth Vader',
      imagenes: [
        'pantuflagrogu-removebg-preview.png',
        'pantuflagrogu3-removebg-preview.png',
        
      ],
      inStock: 10,
      precio: 8990,
      tallas: ['XS','S'],
      slug: 'pantufla-3d-niño-grogu-cute-cafe-star-war',
      tipo: 'pantuflas',
      tags: ['Jedi', 'Star wars', 'sable laser', 'darth vader', 'Sith', 'galaxia','grogu'],
      titulo: 'Pantufla 3D Niño Grogu Cute Cafe Star Wars',
      genero: 'niños'
    },
    {
      descripcion: 'Los Héroes más poderosos del planeta, un equipo compuesto de personajes extraordinarios; Iron Man, Spiderman, doctor strange, Hulk, Venom. Son tan poderosos que han derrotado a Loki, Ultrón, incluso al mismo Thanos, juntos nada los podrá vencer ¡Vengadores unidos!.¡Bienvenidos sean al Universo de Marvel y al extraordinario mundo del Cómic!',
      imagenes: [
        'pantuflaspiderman-PhotoRoom.png-PhotoRoom.png',
        'pantuflaspiderman3-PhotoRoom.png-PhotoRoom.png'
      ],
      inStock: 7,
      precio: 14990,
      tallas: ['XS','S'],
      slug: 'pantufla-bota-niño-spiderman-vision-rojo-marvel',
      tipo: 'pantuflas',
      tags: ['avengers', 'marvel', 'iron man', 'hulk', 'capitan america', 'niño','spider-man'],
      titulo: 'Pantufla Bota Niño Spiderman Vision Rojo Marvel',
      genero: 'niños'
    },
    {
      descripcion: 'Los Héroes más poderosos del planeta, un equipo compuesto de personajes extraordinarios; Iron Man, Spiderman, doctor strange, Hulk, Venom. Son tan poderosos que han derrotado a Loki, Ultrón, incluso al mismo Thanos, juntos nada los podrá vencer ¡Vengadores unidos!.¡Bienvenidos sean al Universo de Marvel y al extraordinario mundo del Cómic!',
      imagenes: [
        'pijamarojo-PhotoRoom.png-PhotoRoom.png',
        'pijamarojo2-PhotoRoom.png-PhotoRoom.png'
      ],
      inStock: 3,
      precio: 14990,
      tallas: ['XS','S'],
      slug: 'pijama-niño-avengers-heroes-rojo-marvel',
      tipo: 'pijamas',
      tags: ['avengers', 'marvel', 'iron man', 'hulk', 'capitan america', 'niño','spider-man'],
      titulo: 'Pijama Niño Avengers Heroes Rojo Marvel',
      genero: 'niños'
    }
  ]
  
}