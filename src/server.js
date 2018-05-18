const express = require('express');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();
		
		server.use(express.static('static'));
		
		/* SITEMAP + ROBOTS*/
		server.get('/robots.txt', ( req, res) => {
			return res.sendFile(path.join(__dirname, '/static/robots.txt'));
		});
		
		server.get('/sitemap.xml', ( req, res) => {
			return res.sendFile(path.join(__dirname, '/static/sitemap.xml'));
		});
		
		
		
		server.get('*', (req, res) => {
			return handle(req, res);
		});
		
		server.listen( 3000, (err) => {
			if ( err ) throw err;
			logger.info("> Ready on http://localhost:8000");
		})
    })
    .catch(err => {
        process.exit(1);
    });