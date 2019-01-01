defmodule SharedTodoWeb.TodoChannel do
  
  use Phoenix.Channel, log: :debug
  
  def join("todo:edit", _message, socket) do
    {:ok, socket}
  end
  
  def join("todo:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end
  
  @doc """
    handle creation of a new todo
    creates and adds new todo element to the state
    broadcasts the new todo element
  """
  def handle_in("add_todo", %{"todo_text" => todo_text}, socket) do
    #SharedTodo.State.add_todo(:state, todo_text)
    new_todo =  %Todo{text: todo_text}
    broadcast!(socket, "added_todo", %{body: Poison.encode!(new_todo)})
    {:noreply, socket}
  end
  
  @doc """
    handle deletion of a todo
    deletes a todo from state
    broadcasts deleted todo's id
  """
  def handle_in("delete_todo", %{"body" => body}, socket) do
    broadcast!(socket, "deleted_todo", %{body: body})
    {:noreply, socket}
  end
  
   @doc """
    returns all todos from the state, doesn't dispatch anything
  """
  def handle_in("get_all_todos", _, socket) do
    #broadcast!(socket, "new_msg", %{body: body})
    #push(socket, "get_all_todos", %{id: 1, content: "All is good"})
    {:reply, {:ok, %{msg: "all good!"}}, socket}
  end
  
end
