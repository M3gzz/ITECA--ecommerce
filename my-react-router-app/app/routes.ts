import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), route("/signup", "routes/signup.tsx"), route("/login", "routes/login.tsx"), route("/admin", "routes/admin.tsx")] satisfies RouteConfig;

// route("/home", "routes/temp.tsx")