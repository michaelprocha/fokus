interface Task {
	id: number;
	content: string;
	completed: boolean;
}

type TaskCreate = Omit<Task, "id">;

interface TaskModel {
	getAllTasks(): Task[];
    getTask(id: number): Task;
	addTask(task: TaskCreate): number;
	deleteTaks(id: number): void;
	editTask(id: number, content: string): void;
	completedTask(id: number): boolean;
}

interface TaskView {
	renderAllTask(tasks: Task[], tasksList: HTMLUListElement): void;
	renderOpenEditTask(task: Task, taskOpen: HTMLLIElement): void;
	renderSaveEditTask(editLi: HTMLLIElement): void;
	renderDeleteEditTask(editLi: HTMLLIElement): void;
	renderCompletedTask(btnElement: HTMLButtonElement, imgButton: HTMLImageElement, completed: boolean): void;
    renderOpenTask(listElement: HTMLUListElement): void;
	renderAddTask(idTask: number, listElement: HTMLUListElement): void
	renderCancelAddTask(liCancel: HTMLLIElement): void;
	renderSetTimer(groupSet: HTMLElement, setTimer: HTMLButtonElement, timer: HTMLParagraphElement): void;
	renderPlayTimer(timer: HTMLParagraphElement, button: HTMLButtonElement): void;
	renderSong(): void;
}

interface TaskController {
	model: TaskModel;
	view: TaskView;
	setupEventListeners(): void;
	handleStartView(): void;
	handleAddTask(): void;
	handleRemoveTask(id: number): void;
	handleEditTask(id: number): void;
	handleCompletedTaks(id: number): void;
    handleOpenTask(): void;
    handleCancelTask(): void;
	handleSetTimer(set: string): void;
	handleSong(): void;
	handlePlayTimer(): void;
}

export type { Task, TaskCreate, TaskModel, TaskView, TaskController };
