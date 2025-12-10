import type { Task, TaskCreate, TaskModel } from "./types.js";

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
		return [...this.tasks];
	}
	
	getTask(id: number): Task {
		let data = localStorage.getItem("tasks");
		if (!data) {
			this.tasks = [];
			return this.tasks[0];
		}
		this.tasks = JSON.parse(data);
		const task: Task[] = this.tasks.filter((task) => task.id === id);
		return task[0];
	}

	addTask(task: TaskCreate): number {
		const newTask: Task = {
			id: this.idGenerator(),
			content: task.content,
			completed: task.completed
		};

		this.tasks.push(newTask);
		localStorage.setItem('tasks', JSON.stringify(this.tasks));
		return newTask.id;
	}

	deleteTaks(id: number): void {
		this.tasks = this.tasks.filter((task) => task.id !== id);
		localStorage.setItem('tasks', JSON.stringify(this.tasks));
		return;
	}
	
	editTask(id: number, content: string): void {
		this.tasks.forEach((task, iTask, arrTask) => {
			if (task.id === id) {
				arrTask[iTask].content = content;
			}
		});
		localStorage.setItem('tasks', JSON.stringify(this.tasks));
		return;
	}
	
	completedTask(id: number): boolean {
		let completed: boolean;
		this.tasks.forEach((task, iTask, arrTask) => {
			if (task.id === id) {
				arrTask[iTask].completed = !task.completed;
				completed = !task.completed;
			}
		});
		localStorage.setItem('tasks', JSON.stringify(this.tasks));
		return completed!;
	}

	private idGenerator(): number {
		const tasks: Task[] = this.getAllTasks();
		let id: number = 1;
		if (tasks.length > 0) {
			tasks.forEach((task) => (id = task.id));
			id += 1;
		}
		return id;
	}
}
