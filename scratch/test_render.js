const http = require('http');

http.get('http://localhost:3000', res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const posBeranda = d.indexOf('id="beranda"');
    const posTentang = d.indexOf('id="tentang-kami"');
    const posKatalog = d.indexOf('id="katalog"');
    const posGaleri = d.indexOf('id="galeri"');
    const posBlog = d.indexOf('id="blog"');
    console.log('DOM Positions:', { posBeranda, posTentang, posKatalog, posGaleri, posBlog });
    const isOrdered = posBeranda < posTentang && posTentang < posKatalog && posKatalog < posGaleri && posGaleri < posBlog;
    console.log('Is in perfect order (Beranda -> Tentang Kami -> Katalog -> Galeri -> Blog):', isOrdered);
  });
});
