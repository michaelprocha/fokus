import type { Task, TaskCreate, TaskModel } from "./types";

export default class Model implements TaskModel {
	private tasks: Task[] = [];

	constructor() {}

	getAllTasks(): Task[] {
		let data = localStorage.getItem("tasks");
		if (!data) {
			this.tasks = [];
			return [];
		}
		this.tasks = JSON.parse(data);
		return this.tasks;
	}

	getTask(id: number): Task {
		const task: Task[] = this.tasks.filter((task) => task.id === id);
		return task[0];
	}

	addTask(task: TaskCreate): Task {
		const newTask: Task = {
			id: this.idGenerator(),
			content: task.content,
			completed: task.completed
		};

		this.tasks.push(newTask);
		return newTask;
	}

	deleteTaks(id: number): void {
		this.tasks = this.tasks.filter((task) => task.id !== id);
		return;
	}

	editTask(id: number, content: string): void {
		this.tasks.forEach((task, iTask, arrTask) => {
			if (task.id === id) {
				arrTask[iTask].content = content;
			}
		});
		return;
	}

	completedTask(id: number): void {
		this.tasks.forEach((task, iTask, arrTask) => {
			if (task.id === id) {
				arrTask[iTask].completed = !task.completed;
			}
		});
		return;
	}

	private idGenerator(): number {
		let id: number = 0;
		if (this.tasks.length > 0) {
			this.tasks.forEach((task) => (id = task.id));
			id += 1;
		}
		return id;
	}
}
