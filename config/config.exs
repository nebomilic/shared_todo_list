# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

#config :shared_todo,
  #ecto_repos: [SharedTodo.Repo]

# Configures the endpoint
config :shared_todo, SharedTodoWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "1x+9l0GRXlOXo+F07NOtDeR8gYaT3QDnGq+Q89xjHrgYjJkTpmVwejFKw5LcHywO",
  render_errors: [view: SharedTodoWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: SharedTodo.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
