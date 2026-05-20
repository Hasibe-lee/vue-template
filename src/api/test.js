import http from "@/http";
export function getTest() {
  return http.get("/api/health");
}
