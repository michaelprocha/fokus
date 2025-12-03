interface Task {
    id: number,
    content: string;
    done: boolean;
}

type TaskCreate = Omit<Task, "id">;

type Status = true | false;

export type {Task, Status, TaskCreate};