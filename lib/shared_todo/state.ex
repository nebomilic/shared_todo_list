defmodule SharedTodo.State do
  
  @moduledoc """
  This is where we persist todo items.
  Currently only single todo list is persisted and shared between all users
  """
  
  use GenServer
  
  def start_link(opts) do
    GenServer.start_link(__MODULE__, :ok, opts)
  end
  
  def init(:ok) do
    # we can put initial state here
    {:ok, []}
  end
  
  def get_all_todos(server) do
    GenServer.call(server, :get_all_todos)
  end
  
  def add_todo(server, item_text) do
    GenServer.call(server, {:add_todo, item_text})
  end
  
  def delete_todo(server, item_id) do
    GenServer.call(server, {:delete_todo, item_id})
  end
  
  # Server API
  
  def handle_call(:get_all_todos, _from, todos) do
    {:reply, :ok, todos}
  end
  
  def handle_call({:add_todo, new_todo_text}, _from, todos) do
    new_todo = %Todo{text: new_todo_text}
    {:reply, :ok, todos ++ [new_todo]}
  end
  
  def handle_call({:delete_todo, item_id}, _from, todos) do
    {:reply, :ok, Enum.filter(todos, fn (item) -> item.id !== item_id end)}
  end
  
   
  
end
