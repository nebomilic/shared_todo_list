defmodule SharedTodoWeb.TodoChannel do
  
  use Phoenix.Channel, log: :debug
  
  def join("todo:edit", _message, socket) do
    {:ok, socket}
  end
  
  def join("todo:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end
  
  def handle_in("new_msg", %{"uid" => uid, "body" => body}, socket) do
    broadcast!(socket, "new_msg", %{uid: uid, body: body})
    {:noreply, socket}
  end
  
end
