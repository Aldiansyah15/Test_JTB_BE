import { config } from "./src/config/config.js";
import app from "./app.js";


app.listen(config.port, () =>
  console.log(`🚀 Server running on port ${config.port}`)
);
