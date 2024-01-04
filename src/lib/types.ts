// types.ts
export interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

export type TodoAction =
  | { type: "ADD_TODO"; payload: Todo }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "DELETE_TODO"; payload: number }
  | { type: "EDIT_TODO"; payload: { id: number; task: string } };

export type TodoFilter = "ALL" | "ACTIVE" | "COMPLETED";

export interface Paging {
  page: number;
  size: number;
}
