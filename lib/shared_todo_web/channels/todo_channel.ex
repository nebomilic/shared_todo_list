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
    new_todo =  %Todo{id: UUID.uuid4, text: todo_text}
    SharedTodo.State.add_todo(:state, new_todo)
    broadcast!(socket, "added_todo", %{body: Poison.encode!(new_todo)})
    {:noreply, socket}
  end
  
  @doc """
    handle deletion of a todo
    deletes a todo from state
    broadcasts deleted todo's id
  """
  def handle_in("delete_todo", %{"todo_id" => todo_id}, socket) do
    SharedTodo.State.delete_todo(:state, todo_id)
    broadcast!(socket, "deleted_todo", %{body: todo_id})
    {:noreply, socket}
  end
  
  @doc """
    handle checking a todo
  """
  def handle_in("check_todo", %{"todo_id" => todo_id}, socket) do
    SharedTodo.State.check_todo(:state, todo_id)
    broadcast!(socket, "checked_todo", %{body: todo_id})
    {:noreply, socket}
  end
  
  @doc """
    handle unchecking a todo
  """
  def handle_in("uncheck_todo", %{"todo_id" => todo_id}, socket) do
    SharedTodo.State.uncheck_todo(:state, todo_id)
    broadcast!(socket, "unchecked_todo", %{body: todo_id})
    {:noreply, socket}
  end
  
   @doc """
    returns all todos from the state, doesn't dispatch anything
  """
  def handle_in("get_all_todos", _, socket) do
    {_, all_todos} = SharedTodo.State.get_all_todos(:state)
    {:reply, {:ok, %{body: Poison.encode!(all_todos)}}, socket}
  end
  
end
