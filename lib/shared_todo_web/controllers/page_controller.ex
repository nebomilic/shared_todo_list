defmodule SharedTodoWeb.PageController do
  use SharedTodoWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
