export type Priority = "높음" | "보통" | "낮음";
export type Category = "공부" | "일상" | "쇼핑" | "기타";
export type FilterType = "전체" | "진행중" | "완료";

export interface Todo {
  id: number;
  text: string;
  priority: Priority;
  category: Category;
  completed: boolean;
  createdDate: string;
  dueDate: string;
}