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
    getTask(id: number): Task | string;
	addTask(task: TaskCreate): Task | string;
	deleteTaks(id: number): string;
	editTask(id: number, content: string): string;
	completedTask(id: number): string;
}

interface TaskView {
	renderAllTask(tasks: Task[] | string): void; // when open or reload page
	renderOpenEditTask(task: Task | string): void; // ( edit task ) when click image edit
	renderCloseEditTask(message: string): void; // cancel or edit from edit task //
    renderOpenTask(): void; // ( open task ) when click button "Adicionar nova tarefa"
	renderAddTask(task: Task | string): void; // add from open task //
    renderRemoveTask(): void; // cancel from open task or delete from edit edit task //
	renderCompletedTask(message: string): void;
	renderSetTimer(set: string): void; // change clock time
	renderSong(): void; // play or pause song
	renderPlayTimer(): void; // start or pause clock
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

export type { Status, Task, TaskCreate, TaskModel, TaskView, TaskController };
