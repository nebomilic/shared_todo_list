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
  
  def add_todo(server, %Todo{} = new_todo) do
    GenServer.call(server, {:add_todo, new_todo})
  end
  
  def delete_todo(server, item_id) do
    GenServer.call(server, {:delete_todo, item_id})
  end
  
  def mark_as_done(server, item_id) do
    GenServer.call(server, {:mark_as_done, item_id})
  end
  
  def unmark_as_done(server, item_id) do
    GenServer.call(server, {:unmark_as_done, item_id})
  end
  
  # Server API
  
  def handle_call(:get_all_todos, _from, todos) do
    # Possible misuse of web socket here, http request could be more appropriate in this case
    {:reply, {:ok, todos}, todos}
  end
  
  def handle_call({:add_todo, %Todo{} = new_todo}, _from, todos) do
    {:reply, :ok, todos ++ [new_todo]}
  end
  
  def handle_call({:delete_todo, item_id}, _from, todos) do
    {:reply, :ok, Enum.filter(todos, fn (item) -> item.id !== item_id end)}
  end
  
  def handle_call({:mark_as_done, replace}, _from, todos) do
  #def handle_call({:unmark_as_done, replace}, _from, todos) do
  #def handle_call({:rename_item, replace}, _from, todos) do
    {:reply, :ok, Enum.map(todos, fn item -> if item.id === replace.id do replace else item end end)}
  end
  
   
  
end
