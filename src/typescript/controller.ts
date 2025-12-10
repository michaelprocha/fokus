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
					const parentElement: HTMLElement = element.parentElement!.parentElement!;
					const attributeParentElement: string | null = parentElement.getAttribute("data-action");
					if (attributeParentElement) {
                        if (attributeParentElement === "add" && attributeElement === "save") {
                            this.handleAddTask(parentElement, list);
						}
					} else {
                        const grandfatherElement = parentElement.parentElement as HTMLLIElement;
                        const attributeGrandfatherElement: string = grandfatherElement.getAttribute("data-action")!;
					}
				}
				console.log(element.getAttribute("data-button"));
				console.log(element.parentElement);
				console.log(element.parentElement!.parentElement);
				console.log(element.parentElement!.parentElement?.getAttribute("data-action"));
			}
			if (element.getAttribute("data-action")) {
				console.log(element.getAttribute("data-button"));
			}
			// const typeOfElement = element.getAttribute("data-button");
		});

		const addButton = document.querySelector("#add-task") as HTMLButtonElement;
		addButton.addEventListener("click", this.handleOpenTaks);
	}

	handleOpenTaks = (): void => {
		const list = document.querySelector("#tasks-list") as HTMLUListElement;
		this.view.renderOpenTask(list);
	};

	private handleAddTask = (grandfatherElement: HTMLElement, list: HTMLUListElement): void => {
		const text = grandfatherElement.querySelector("textarea") as HTMLTextAreaElement;
		const task: TaskCreate = {
			content: text.value,
			completed: false,
		};
		const id: number = this.model.addTask(task);
		this.view.renderAddTask(id, list);
	};

	// handleActionTask(): void {}
}

const controller = new Controller();
