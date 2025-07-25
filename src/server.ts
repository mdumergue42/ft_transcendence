import { createServer } from "http";
import { promises as fs } from "fs";
import { extname, join } from "path";
import { handleStatus } from './api/auth/status';

const MIME: Record<string,string> = {
  ".html": "text/html",
  ".css":  "text/css",
  ".js":   "application/javascript",
  ".png":  "image/png",
  ".jpg":  "image/jpeg"
};

const PUBLIC = join(__dirname, "../public");
const PORT   = Number(process.env.PORT) || 3000;

createServer(async (req, res) => {
  try {
    const url = req.url === "/" ? "/index.html" : req.url!;
    if (url === '/api/auth/status') {
      return handleStatus(req, res);
    }
    const file = join(PUBLIC, url);
    const data = await fs.readFile(file);
    const type = MIME[extname(file)] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type });
    res.end(data);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 – Page non trouvée");
  }
}).listen(PORT, () => {
  const url = `http://localhost:${PORT}`;

  console.log(`🚀 Server disponible sur : ${url}`);
});
