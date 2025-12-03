type Status = true | false;

interface Task {
    id: number;
    content: string;
    done: boolean;
}

type TaskCreate = Omit<Task, "id">;

interface TaskModel {
    tasks: Task[];
    getAllTasks(): Task[] | string;
    addTask(task: TaskCreate): Task | string;
    deleteTaks(id: number): string;
    editTask(id: number, content: string): string;
}

interface TaskView {
    renderAllTask(tasks: Task[] | string): void;
    renderAddTask(task: Task | string): void;
    renderRemoveTask(message: string): void;
    renderEditTask(message: string): void;
}

interface TaskController {
    model: TaskModel;
    view: TaskView;
    setupEventListeners(): void;
    handleStartView(): void;
    handleAddTask(): void;
    handleRemoveTask(id: number): void;
    handleEditTask(id: number): void;
}

export type { Status, Task, TaskCreate, TaskModel, TaskView, TaskController };