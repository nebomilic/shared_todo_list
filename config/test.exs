use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :shared_todo, SharedTodoWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :shared_todo, SharedTodo.Repo,
  username: "root",
  password: "password",
  database: "shared_todo",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
