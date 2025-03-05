import { baseUrl } from "@/services/api";

export function urlBuild(path: string) {
  return `${path.replace("http://localhost:3000/", "")}`;
}
