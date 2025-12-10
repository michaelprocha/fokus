import type { Task, TaskView } from "./types.js";
import green from "../images/icons/checkGreen.svg";
import white from "../images/icons/checkWhite.svg";
import edit from "../images/icons/edit.svg";

const checkers = {
	green,
	white,
};

export default class View implements TaskView {
	constructor() {}

	renderAllTask(tasks: Task[], tasksList: HTMLUListElement): void {
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
			} else {
				complete = "bg-pending";
				check = checkers.white;
				completeText = "Tarefa pendente";
				checkDesc = "Marcar tarefa como concluída";
				ariaPressed = false;
			}

			body += `<li data-complete="${ariaPressed}" data-id="${task.id}" class="task ${complete}">
						<div class="flex gap-4">
							<button data-button="complete" class="cursor-pointer" type="button" aria-pressed="${ariaPressed}" aria-label="${checkDesc}">
								<img data-button="complete" src="${check}" aria-hidden="true" />
							</button>
							<p class="font-bold text-deep-blue">${completeText}</p>
						</div>
						<button data-button="edit" class="cursor-pointer" type="button" aria-label="Editar tarefa">
							<img data-button="edit" src="${edit}" aria-hidden="true" />
						</button>
					</li>`;
		});

		tasksList.innerHTML = body;
		return;
	}

	renderOpenEditTask(task: Task, taskOpen: HTMLLIElement): void {
		taskOpen.classList.contains("bg-completed")
			? taskOpen.classList.remove("bg-completed")
			: taskOpen.classList.remove("bg-pending");
		this.renderOpenAddOrEditTask(task.content, taskOpen);
		return;
	}

	renderOpenAddOrEditTask(content?: string, liElement?: HTMLLIElement): void | string {
		if (liElement) {
			liElement.setAttribute("data-action", "edit");
			liElement.classList.add("edit");
			liElement.innerHTML = `<h3 class="text-deep-blue">Editando Tarefa</h3>
	    			    		    <textarea class="resize-none h-30 w-full bg-complementary4 rounded-lg p-4 flex items-start" placeholder="No que você está trabalhando?" name="taskName">${content}</textarea>
		    			    	    <div class="flex justify-between items-center w-full">
							        	<button data-button="delete" class="button cancel cursor-pointer text-deep-blue" type="button" aria-label="Deletar tarefa">
								        	<img data-button="delete" src="/images/icons/delete.svg" aria-hidden="true" />
								        	deletar
							         	</button>
										<div class="flex gap-4 md:gap-12">
			    		    	        	<button data-button="cancel" class="button cancel cursor-pointer text-deep-blue" type="button" aria-label="Cancelar mudança na tarefa">
	    		    		    	        	<img data-button="cancel" src="/images/icons/close.svg" aria-hidden="true" />
		    		    		            	Cancelar
    					                	</button>
    		    			            	<button data-button="save" class="button save cursor-pointer" type="button" aria-label="Salvar mudança na terefa">
    			    			            	<img data-button="save" src="/images/icons/save.svg" aria-hidden="true" />
		    		    		            	Salvar
			        			        	</button>
				        		    	</div>
									</div>`;
			return;
		}

		const li: string = `<li data-complete="false" class="edit" data-action="add">
							    <h3 class="text-deep-blue">Adicionando Tarefa</h3>
							    <textarea class="resize-none h-30 w-full bg-complementary4 rounded-lg p-4 flex items-start" placeholder="No que você está trabalhando?" name="taskName"></textarea>
						        <div class="flex justify-end items-center gap-4 w-full">
								    <button data-button="cancel" class="button cancel cursor-pointer text-deep-blue" type="button" aria-label="Cancelar, não adicionar tarefa">
									    <img data-button="cancel" src="/images/icons/close.svg" aria-hidden="true" />
							    	    Cancelar
							        </button>
							        <button data-button="save" class="button save cursor-pointer" type="button" aria-label="Adicionar terefa">
								        <img data-button="save" src="/images/icons/save.svg" aria-hidden="true" />
								        Salvar
							        </button>
						        </div>
					        </li>`;
		return li;
	}

	renderSaveEditTask(editLi: HTMLLIElement): void {
		editLi.removeAttribute("data-action");
		editLi.classList.remove("edit");

		let check: string;
		let completeText: string;
		let checkDesc: string;
		let ariaPressed: boolean;

		if (editLi.getAttribute("data-complete") === "true") {
			editLi.classList.add("task", "bg-completed");
			check = checkers.green;
			completeText = "Tarefa concluída";
			checkDesc = "Desmarcar tarefa concluída";
			ariaPressed = true;
		} else {
			editLi.classList.add("task", "bg-pending");
			check = checkers.white;
			completeText = "Tarefa pendente";
			checkDesc = "Marcar tarefa como concluída";
			ariaPressed = false;
		}

		editLi.innerHTML = `<div class="flex gap-4">
		    					<button data-button="complete" class="cursor-pointer" type="button" aria-pressed="${ariaPressed}" aria-label="${checkDesc}">
			    					<img data-button="complete" src="${check}" aria-hidden="true" />
				    			</button>
					    		<p class="font-bold text-deep-blue">${completeText}</p>
    						</div>
	        				<button data-button="edit" class="cursor-pointer" type="button" aria-label="Editar tarefa">
			    				<img data-button="edit" src="${edit}" aria-hidden="true" />
				    		</button>`;
		return;
	}

	renderDeleteEditTask(editLi: HTMLLIElement): void {
		editLi.remove();
	}

	renderCompletedTask(btnElement: HTMLButtonElement, imgButton: HTMLImageElement, completed: boolean): void {
		if (completed) {
			btnElement.setAttribute("aria-pressed", "true");
			btnElement.setAttribute("aria-label", "Desmarcar tarefa concluída");
			imgButton.setAttribute("src", checkers.green);
			return;
		}
		btnElement.setAttribute("aria-pressed", "false");
		btnElement.setAttribute("aria-label", "Marcar tarefa como concluída");
		imgButton.setAttribute("src", checkers.white);
		return;
	}

	renderOpenTask(listElement: HTMLUListElement): void {
		const li: string = this.renderOpenAddOrEditTask()!;
		listElement.innerHTML += li;
		return;
	}

	renderAddTask(idTask: number, listElement: HTMLUListElement): void {
		const addLi = document.createElement("li");
		addLi.setAttribute("data-complete", "false");
		addLi.setAttribute("data-id", `${idTask}`);
		addLi.classList.add("task", "bg-pending");

		addLi.innerHTML = `<div class="flex gap-4">
								<button data-button="complete" class="cursor-pointer" type="button" aria-pressed="false" aria-label="Marcar tarefa como concluída">
									<img data-button="complete" src="${checkers.white}" aria-hidden="true" />
								</button>
								<p class="font-bold text-deep-blue">Tarefa pendente</p>
							</div>
							<button data-button="edit" class="cursor-pointer" type="button" aria-label="Editar tarefa">
								<img data-button="edit" src="${edit}" aria-hidden="true" />
							</button>`;

		listElement.append(addLi);
		return;
	}

	renderCancelAddTask(liCancel: HTMLLIElement): void {
		liCancel.remove();
		return;
	}

	renderSetTimer(groupSet: HTMLElement, setTimer: HTMLButtonElement, timer: HTMLParagraphElement): void {
		const setElements: HTMLButtonElement[] = Array.from(groupSet.children) as HTMLButtonElement[];

		const chose: string = setTimer.getAttribute("data-mode")!;
		setTimer.classList.add("selected-mode");

		setElements.forEach((element) => {
			if (element.getAttribute("data-mode") !== chose) {
				element.classList.remove("selected-mode");
			}
		});

		switch (chose) {
			case "focus":
				timer.setAttribute("data-mode", "focus");
				timer.textContent = "25:00";
				break;

			case "short":
				timer.setAttribute("data-mode", "short");
				timer.textContent = "05:00";
				break;

			default:
				timer.setAttribute("data-mode", "long");
				timer.textContent = "15:00";
				break;
		}

		return;
	}

	renderPlayTimer(timer: HTMLParagraphElement, button: HTMLButtonElement): void {
		const attribute: string = timer.getAttribute("data-play")!;
		let play: boolean;

		if (attribute === "true") {
			play = true;
		} else {
			play = false;
		}

		const mode: string = timer.getAttribute("data-mode")!;

		const count = new Audio("../audio/Contagem regressiva e toque.mp3");
		count.loop = false;

		const beep = new Audio("../audio/Beep.mp3");
		beep.loop = false;
		
		let countdown: number

		if (play) {
			button.textContent = "Pausar";
			const audio = new Audio("../audio/Press play.wav");
			audio.loop = false;
			audio.play();

			if (timer.innerText === "00:00") {
				switch (mode) {
					case "focus":
						timer.textContent = "25:00";
						break;

					case "long":
						timer.textContent = "15:00";
						break;

					default:
						timer.textContent = "05:00";
						break;
				}
			}
			const partOneDate: string = "Tue Dec 09 2025 00:";
			const partTwoDate: string = " GMT-0300 (Horário Padrão de Brasília)";
			const dateTo: string = `${partOneDate}${timer.innerText}${partTwoDate}`;
			let timeStamp = Date.parse(dateTo);
			countdown = setInterval(() => {
				timeStamp -= 10;
				let showTime = new Date(timeStamp).toLocaleTimeString("pt-BR");
				showTime = showTime.substring(3);
				timer.textContent = showTime;
				if (showTime === "00:12") {
					count.play();
				}

				if (showTime === "00:00") {
					clearInterval(countdown);
					beep.play();
					button.textContent = "Começar";
					timer.setAttribute("data-play", "true");
				}
			}, 1000);
		}else{
			const audio = new Audio("../audio/Press stop button.mp3");
			count.pause();
			count.currentTime = 0;
			audio.loop = false;
			audio.play();
			button.textContent = "Começar";
			clearInterval(countdown!);
		}
	}

	renderSong(): void{
		const song = new Audio("../audio.Luna Rise, Part One.mp3");
		song.loop = true;
		if (song.paused) {
			song.play()
			return;
		}

		song.pause();
		return;
	}
}
