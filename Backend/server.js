require("dotenv").config();

const app = require("./src/app");
const connectToDb = require("./src/Config/database");

const PORT = process.env.PORT || 3000;

async function bootstrap() {
    await connectToDb();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

bootstrap().catch((err) => {
    console.error("Failed to start server:", err.message);
    process.exit(1);
});