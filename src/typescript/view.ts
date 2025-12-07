import type { Task, TaskCreate, TaskView } from "./types";
import green from "../images/icons/checkGreen.svg";
import white from "../images/icons/checkWhite.svg";
import edit from "../images/icons/edit.svg";

const checkers = {
    green,
    white
}

export default class View implements TaskView {
	constructor() {}

	renderAllTasks(tasks: Task[], list: HTMLUListElement) {
		if (tasks.length === 0) {
			return;
		}

		let body: string = "";
		tasks.forEach((task) => {
            let complete: string;
            let check: string;
            let completeText: string;
            let checkDesc: string;
            let ariaPressed: boolean;

            if (task.completed === true) {
                complete = "bg-completed";
                check = checkers.green;
                completeText = "Tarefa concluída";
                checkDesc = "Desmarcar tarefa concluída";
                ariaPressed = true;
            }else{
                complete = "bg-pending";
                check = checkers.white;
                completeText = "Tarefa concluída";
                checkDesc = "Marcar tarefa como concluída";
                ariaPressed = false;
            }

			body += `<li data-id="${task.id}" class="task ${complete}">
						<div class="flex gap-4">
							<button data-button="complete" class="cursor-pointer" type="button" aria-pressed="${ariaPressed}" aria-label="${checkDesc}">
								<img src="${check}" aria-hidden="true" />
							</button>
							<p class="font-bold text-deep-blue">${completeText}</p>
						</div>
						<button data-button="edit" class="cursor-pointer" type="button" aria-label="Editar tarefa">
							<img src="${edit}" aria-hidden="true" />
						</button>
					</li>`;
		});

        list.innerHTML = body;
		return;
	}
}
