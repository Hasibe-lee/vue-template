import http from "http";
import { URL } from "url";

const PORT = process.env.PORT || 3000;

const mockData = {
  user: {
    id: 1,
    name: "Test User",
    role: "admin",
    email: "test.user@example.com"
  },
  products: [
    { id: 101, name: "Keyboard", price: 199, stock: 20 },
    { id: 102, name: "Mouse", price: 99, stock: 35 },
    { id: 103, name: "Monitor", price: 1299, stock: 8 }
  ],
  stats: {
    onlineUsers: 12,
    todayOrders: 27,
    successRate: 0.98
  }
};

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    });
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const { pathname } = url;

  if (req.method === "GET" && pathname === "/") {
    sendJson(res, 200, { message: "Mock API is running" });
    return;
  }

  if (req.method === "GET" && pathname === "/api/health") {
    setTimeout(() => {
      sendJson(res, 200, { ok: true, timestamp: Date.now() });
    }, 3000);
    return;
  }

  if (req.method === "GET" && pathname === "/api/user") {
    sendJson(res, 200, { code: 0, data: mockData.user });
    return;
  }

  if (req.method === "GET" && pathname === "/api/products") {
    sendJson(res, 200, { code: 0, data: mockData.products });
    return;
  }

  if (req.method === "GET" && pathname === "/api/stats") {
    sendJson(res, 200, { code: 0, data: mockData.stats });
    return;
  }

  sendJson(res, 404, { code: 404, message: "Not Found" });
});

server.listen(PORT, () => {
  console.log(`Mock API server running at http://127.0.0.1:${PORT}`);
});

