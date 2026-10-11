const http = require('http');

const routes = [
  '/',
  '/tentang-kami',
  '/katalog-produk',
  '/galeri',
  '/blog'
];

async function checkRoute(route) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${route}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          route,
          status: res.statusCode,
          length: data.length,
          hasNavbar: data.includes('FARDI ATELIER'),
          hasFooter: data.includes('EST. 2023')
        });
      });
    }).on('error', (err) => {
      resolve({ route, error: err.message });
    });
  });
}

async function run() {
  for (const r of routes) {
    const res = await checkRoute(r);
    console.log(JSON.stringify(res));
  }
}

run();
