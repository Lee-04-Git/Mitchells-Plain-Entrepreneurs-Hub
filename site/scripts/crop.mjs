// Extracts the client's original photography from the reference screenshots.
import sharp from 'sharp';
const A = '../assets/';
const crops = [
  ['Home Page.jpeg', 'community-hero', 918, 178, 664, 492],
  ['About Page.jpeg', 'founder', 404, 920, 284, 282],
  ['Blog Page.jpeg', 'blog-anniversary', 178, 449, 684, 380],
  ['Blog Page.jpeg', 'blog-awards', 898, 449, 688, 380],
  ['Blog Page.jpeg', 'blog-social-media', 178, 1157, 684, 380],
  ['Blog Page.jpeg', 'blog-stories', 898, 1157, 688, 380],
];
for (const [file, name, left, top, width, height] of crops) {
  await sharp(A + file).extract({ left, top, width, height })
    .webp({ quality: 86 }).toFile(`public/images/${name}.webp`);
  console.log('ok', name);
}
