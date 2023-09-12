import app from "./app";

const PORT = process.env.PORT || 3000; // Default to port 3000 if PORT environment variable is not set

app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}!`);
  console.log(`📚 API docs are available on: http://localhost:${PORT}/api-docs`);
}).on("error", (error) => {
  console.error("Error occurred while starting the server:", error);
});
