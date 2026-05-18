
import { toNodeHandler } from "better-auth/node";
import { auth } from "../../../gli/auth";

export default toNodeHandler(auth.handler);