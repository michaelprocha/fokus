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
	renderSaveEditTask(editLi: HTMLElement): void;
	renderDeleteEditTask(editLi: HTMLElement): void;
	renderCompletedTask(btnElement: HTMLButtonElement, imgButton: HTMLImageElement, completed: boolean, liElement: HTMLLIElement, textComplete: HTMLParagraphElement): void;
    renderOpenTask(listElement: HTMLUListElement): void;
	renderAddTask(idTask: number, listElement: HTMLUListElement, liElement: HTMLElement): void
	renderCancelAddTask(liCancel: HTMLElement): void;
	renderSetTimer(groupSet: HTMLElement, setTimer: HTMLButtonElement, timer: HTMLParagraphElement): void;
	renderPlayTimer(timer: HTMLParagraphElement, button: HTMLButtonElement): void;
	renderSong(): void;
}

interface TaskController {
	setupEventListeners(): void;
	handleStartView(): void;
    handleOpenTaks(): void;
	handelCancelAddTask(liElement: HTMLElement): void 
	handleAddTask(liElement: HTMLElement, list: HTMLUListElement): void;
	handleOpenEditTask(liElement: HTMLLIElement): void;
	handleDeleteTask(liElement: HTMLElement): void;
	handleSaveEditTask(liElement: HTMLElement): void;
	handleCompleteTaks(imgElement: HTMLElement): void;
	// handleSetTimer(set: string): void;
	// handleSong(): void;
	// handlePlayTimer(): void;
}

export type { Task, TaskCreate, TaskModel, TaskView, TaskController };
