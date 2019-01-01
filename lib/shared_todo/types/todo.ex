defmodule Todo do
  defstruct id: UUID.uuid1, text: "", status: 0 
end
