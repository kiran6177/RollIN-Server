import { connection } from "./adapters/database/connection.js";
import createServer from './frameworks/express.js'

const app = createServer();
connection()

export default app