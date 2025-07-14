import { route } from "rwsdk/worker";
import { Blog, BlogPost } from "./pages";

export const blogRoutes = [route("/", Blog), route("/:slug", BlogPost)];
