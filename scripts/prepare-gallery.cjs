const fs = require('fs');
const sharp = require('sharp');
const photos = [
  ['Image_284AF96D-8E0C-4E81-8ABB-7325F64E71D9', 'Aiswarya and Amal together in the garden'],
  ['Image_3AF63649-B98F-4690-9399-E859EC526A77', 'Engagement ring and intricate mehndi'],
  ['Image_5ED19FAE-5981-418D-97F7-B839464E8BA0', 'Aiswarya twirling with Amal in the garden'],
  ['Image_11360926-2AE9-4723-8AA4-7B0A2D92E052', 'A quiet smile together among the greenery'],
  ['Image_69022ACF-4B1B-4975-84A7-336A707F7FC7', 'Aiswarya and Amal looking into each other’s eyes'],
  ['Image_ED4FB8EF-F9BD-4E96-A253-70AC2269C682', 'Aiswarya and Amal resting their foreheads together'],
  ['Image_FD457AEA-844E-4081-90FF-53A7DA56EE37', 'A shared moment beneath the trees'],
  ['Image_AA8A70C4-6276-4D93-906F-B044CF842B6F', 'Aiswarya and Amal holding hands on the steps'],
];
(async () => {
  fs.mkdirSync('public/images/gallery', { recursive: true });
  const gallery = [];
  for (const [file, alt] of photos) {
    const output = `public/images/gallery/${file}.webp`;
    const info = await sharp(`public/images/${file}.jpeg`).rotate().resize({ width: 1000, withoutEnlargement: true }).webp({ quality: 85 }).toFile(output);
    gallery.push({ src: `/images/gallery/${file}.webp`, original: `/images/${file}.jpeg`, alt, width: info.width, height: info.height });
  }
  fs.writeFileSync('src/config/gallery.ts', `export const gallery = ${JSON.stringify(gallery, null, 2)};\n`);
  console.log(`Prepared ${gallery.length} gallery photos; originals preserved.`);
})();
