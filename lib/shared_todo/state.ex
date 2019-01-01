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
  
  def get_all_todos() do
    # TODO
  end
  
  def add_todo() do
    # TODO
  end
  
  def delete_todo() do
    # TODO
  end
  
   
  
end
