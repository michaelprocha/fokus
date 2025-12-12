import type { Task, TaskCreate, TaskController } from "./types.js";
import "../style.css";
import Model from "./model.js";
import View from "./view.js";

class Controller implements TaskController {
	private model = new Model();
	private view = new View();
	constructor() {
		this.handleStartView();
		this.setupEventListeners();
	}

	handleStartView(): void {
		const tasks: Task[] = this.model.getAllTasks();
		const list = document.querySelector("#tasks-list") as HTMLUListElement;
		this.view.renderAllTask(tasks, list);
		return;
	}

	setupEventListeners(): void {
		const list = document.querySelector("#tasks-list") as HTMLUListElement;
		list.addEventListener("click", (e: MouseEvent) => {
			const element = e.target as HTMLElement;
			const attributeElement: string | null = element.getAttribute("data-button");

			if (attributeElement) {
				if (attributeElement === "save" || attributeElement === "delete" || attributeElement === "cancel") {
					const parentElement: HTMLElement = element.parentElement!.parentElement as HTMLElement;
					const attributeParentElement: string | null = parentElement.getAttribute("data-action");

					const grandfatherElement = parentElement.parentElement as HTMLElement;
					const attributeGrandfatherElement: string | null = grandfatherElement.getAttribute("data-action");

					const greatGrandfatherElement = grandfatherElement.parentElement as HTMLElement;
					const attributeGreatGrandfatherElement: string | null = greatGrandfatherElement.getAttribute("data-action");

					if (attributeParentElement) {
						if (attributeParentElement === "add" && attributeElement === "save") {
							this.handleAddTask(parentElement, list);
						} else if (attributeParentElement === "add" && attributeElement === "cancel") {
							this.handelCancelAddTask(parentElement);
						} else if (attributeParentElement === "edit" && attributeElement === "delete") {
							console.log("delete");
							this.handleDeleteTask(parentElement);
						}
					} else if (attributeGrandfatherElement){
						if (attributeGrandfatherElement === "add" && attributeElement === "save") {
							this.handleAddTask(grandfatherElement, list);
						} else if (attributeGrandfatherElement === "add" && attributeElement === "cancel") {
							this.handelCancelAddTask(grandfatherElement);
						} else if(attributeGrandfatherElement === "edit" && attributeElement === "delete"){
							console.log("delete com img");
							this.handleDeleteTask(grandfatherElement);
						}else if(attributeGrandfatherElement === "edit" && attributeElement === "cancel"){
							console.log("cancel");
							this.handleCancelEditTask(grandfatherElement);
						}else if(attributeGrandfatherElement === "edit" && attributeElement === "save"){
							console.log("save");
							this.handleSaveEditTask(grandfatherElement);

						}
					}else if(attributeGreatGrandfatherElement){
						if(attributeGreatGrandfatherElement === "edit" && attributeElement === "cancel"){
							console.log("cancel com img");
							this.handleCancelEditTask(greatGrandfatherElement);
						}else if(attributeGreatGrandfatherElement === "edit" && attributeElement === "save"){
							console.log("save com img");
							this.handleSaveEditTask(greatGrandfatherElement);
						}
					}
				} else if (attributeElement === "edit") {
					const liElement = element.parentElement!.parentElement as HTMLLIElement;
					this.handleOpenEditTask(liElement);
				} else if (attributeElement === "complete") {
					this.handleCompleteTaks(element);
				}
			}
		});

		const addButton = document.querySelector("#add-task") as HTMLButtonElement;
		addButton.addEventListener("click", this.handleOpenTaks);
	}

	handleOpenTaks = (): void => {
		const list = document.querySelector("#tasks-list") as HTMLUListElement;
		this.view.renderOpenTask(list);
		return;
	};

	handelCancelAddTask = (liElement: HTMLElement): void => {
		this.view.renderCancelAddTask(liElement);
		return;
	};

	handleAddTask = (liElement: HTMLElement, list: HTMLUListElement): void => {
		const text = liElement.querySelector("textarea") as HTMLTextAreaElement;
		const task: TaskCreate = {
			content: text.value,
			completed: false,
		};
		const id: number = this.model.addTask(task);
		this.view.renderAddTask(id, list, liElement);
	};

	handleOpenEditTask = (liElement: HTMLLIElement): void => {
		const id = parseInt(liElement.getAttribute("data-id")!);
		const task = this.model.getTask(id);
		this.view.renderOpenEditTask(task, liElement);
		return;
	};

	handleCancelEditTask = (liElement: HTMLElement): void => {
		this.view.renderSaveEditTask(liElement);
		return;
	};

	handleSaveEditTask = (liElement: HTMLElement): void => {
		const id: number = parseInt(liElement.getAttribute("data-id")!);
		const content: string = liElement.querySelector("textarea")!.value;
		this.model.editTask(id, content);
		this.handleCancelEditTask(liElement);
	}

	handleDeleteTask = (liElement: HTMLElement): void => {
		const id: number = parseInt(liElement.getAttribute("data-id")!)
		this.model.deleteTaks(id);
		this.view.renderDeleteEditTask(liElement);
		return;
	}

	handleCompleteTaks = (element: HTMLElement): void => {
		const imgElement = element as HTMLImageElement;
		const liElement = imgElement.parentElement!.parentElement!.parentElement as HTMLLIElement;
		const pElement = imgElement.parentElement!.parentElement!.querySelector("p") as HTMLParagraphElement;
		const btnElement = imgElement.parentElement as HTMLButtonElement;
		const id: number = parseInt(liElement.getAttribute("data-id")!);
		const completed: boolean = this.model.completedTask(id);
		this.view.renderCompletedTask(btnElement, imgElement, completed, liElement, pElement);
		return;
	}
}

const controller = new Controller();
