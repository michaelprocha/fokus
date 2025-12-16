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
	renderCompletedTask(
		btnElement: HTMLButtonElement,
		imgButton: HTMLImageElement,
		completed: boolean,
		liElement: HTMLLIElement,
		textComplete: HTMLParagraphElement
	): void;
	renderOpenTask(listElement: HTMLUListElement): void;
	renderAddTask(idTask: number, listElement: HTMLUListElement, liElement: HTMLElement): void;
	renderCancelAddTask(liCancel: HTMLElement): void;
	renderSetTimer(
		groupSet: HTMLElement,
		setTimer: HTMLButtonElement,
		timer: HTMLParagraphElement,
		btnPlayAndPause: HTMLButtonElement,
		mainImage: HTMLImageElement,
		body: HTMLBodyElement
	): void;
	renderPlayTimer(timer: HTMLParagraphElement, button: HTMLButtonElement, playSongPause: boolean): void;
	renderSong(btnSong: HTMLButtonElement, circleElement: HTMLElement): void;
}

interface TaskController {
	setupEventListeners(): void;
	handleStartView(): void;
	handleOpenTaks(): void;
	handelCancelAddTask(liElement: HTMLElement): void;
	handleCancelEditTask(liElement: HTMLElement): void
	handleAddTask(liElement: HTMLElement, list: HTMLUListElement): void;
	handleOpenEditTask(liElement: HTMLLIElement): void;
	handleDeleteTask(liElement: HTMLElement): void;
	handleSaveEditTask(liElement: HTMLElement): void;
	handleCompleteTasks(imgElement: HTMLElement): void;
	handlePlayTimer(btn: HTMLButtonElement): void
	handleSong(btnSong: HTMLButtonElement): void;
	handelSetTimer(e: Event, groupSetTimer: HTMLElement): void;
}

export type { Task, TaskCreate, TaskModel, TaskView, TaskController };
