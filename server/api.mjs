import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "state.json");
const PORT = process.env.PORT ? Number(process.env.PORT) : 8787;

async function ensureDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify({ updatedAt: null, state: null }, null, 2), "utf-8");
  }
}

async function readState() {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

async function writeState(nextState) {
  await ensureDataFile();
  const payload = { updatedAt: new Date().toISOString(), state: nextState };
  await fs.writeFile(DATA_FILE, JSON.stringify(payload, null, 2), "utf-8");
  return payload;
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 5 * 1024 * 1024) {
        reject(new Error("Payload muito grande"));
      }
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  const { method = "GET", url = "/" } = req;

  if (method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });
    return res.end();
  }

  try {
    if (method === "GET" && url === "/api/health") {
      return sendJson(res, 200, { ok: true, service: "secap-api" });
    }

    if (method === "GET" && url === "/api/state") {
      const payload = await readState();
      return sendJson(res, 200, payload);
    }

    if (method === "PUT" && url === "/api/state") {
      const raw = await readBody(req);
      const parsed = raw ? JSON.parse(raw) : null;
      if (!parsed || typeof parsed !== "object" || !("state" in parsed)) {
        return sendJson(res, 400, { ok: false, error: "Payload inválido. Use { state: {...} }" });
      }
      const saved = await writeState(parsed.state);
      return sendJson(res, 200, { ok: true, updatedAt: saved.updatedAt });
    }

    return sendJson(res, 404, { ok: false, error: "Rota não encontrada" });
  } catch (err) {
    return sendJson(res, 500, { ok: false, error: err?.message || "Erro interno" });
  }
});

ensureDataFile().then(() => {
  server.listen(PORT, () => {
    console.log(`SECAP API rodando em http://localhost:${PORT}`);
  });
});
