import type { Task, TaskView } from "./types.js";
import green from "../images/icons/checkGreen.svg";
import white from "../images/icons/checkWhite.svg";
import edit from "../images/icons/edit.svg";
import contagemRegressiva from "../audio/Contagem regressiva e toque.mp3";
import audioBeep from "../audio/Beep.mp3";
import audioPlay from "../audio/Press play.wav";
import audioStop from "../audio/Press stop button.mp3";
import playImage from "../images/icons/playArrow.svg";
import pauseImage from "../images/icons/pause.svg";
import song from "../audio/Luna Rise, Part One.mp3";

export default class View implements TaskView {
	private count = new Audio(contagemRegressiva) as HTMLAudioElement;
	private beep = new Audio(audioBeep) as HTMLAudioElement;
	private audioPlayI = new Audio(audioPlay) as HTMLAudioElement;
	private audioStopI = new Audio(audioStop) as HTMLAudioElement;
	private audioSong = new Audio(song) as HTMLAudioElement;
	private checkers = { green, white };
	private intervalPlay: number = 0;
	private elementImage = document.createElement("img") as HTMLImageElement as HTMLImageElement;
	private playTimer: boolean = true;

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
				check = this.checkers.green;
				completeText = "Tarefa concluída";
				checkDesc = "Desmarcar tarefa concluída";
				ariaPressed = true;
			} else {
				complete = "bg-pending";
				check = this.checkers.white;
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
			? taskOpen.classList.remove("bg-completed", "task")
			: taskOpen.classList.remove("bg-pending", "task");
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

	renderSaveEditTask(editLi: HTMLElement): void {
		editLi.removeAttribute("data-action");
		editLi.classList.remove("edit");

		let check: string;
		let completeText: string;
		let checkDesc: string;
		let ariaPressed: boolean;

		if (editLi.getAttribute("data-complete") === "true") {
			editLi.classList.add("task", "bg-completed");
			check = this.checkers.green;
			completeText = "Tarefa concluída";
			checkDesc = "Desmarcar tarefa concluída";
			ariaPressed = true;
		} else {
			editLi.classList.add("task", "bg-pending");
			check = this.checkers.white;
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

	renderDeleteEditTask(editLi: HTMLElement): void {
		editLi.remove();
	}

	renderCompletedTask(
		btnElement: HTMLButtonElement,
		imgButton: HTMLImageElement,
		completed: boolean,
		liElement: HTMLLIElement,
		textComplete: HTMLParagraphElement
	): void {
		if (completed) {
			btnElement.setAttribute("aria-pressed", "true");
			btnElement.setAttribute("aria-label", "Desmarcar tarefa concluída");
			imgButton.setAttribute("src", this.checkers.green);
			liElement.classList.add("bg-completed");
			liElement.classList.remove("bg-pending");
			textComplete.textContent = "Tarefa concluída";
			return;
		}
		btnElement.setAttribute("aria-pressed", "false");
		btnElement.setAttribute("aria-label", "Marcar tarefa como concluída");
		imgButton.setAttribute("src", this.checkers.white);
		liElement.classList.add("bg-pending");
		liElement.classList.remove("bg-completed");
		textComplete.textContent = "Tarefa pendente";
		return;
	}

	renderOpenTask(listElement: HTMLUListElement): void {
		const li: string = this.renderOpenAddOrEditTask()!;
		listElement.innerHTML += li;
		return;
	}

	renderAddTask(idTask: number, listElement: HTMLUListElement, liElement: HTMLElement): void {
		const addLi = document.createElement("li");
		addLi.setAttribute("data-complete", "false");
		addLi.setAttribute("data-id", `${idTask}`);
		addLi.classList.add("task", "bg-pending");

		addLi.innerHTML = `<div class="flex gap-4">
								<button data-button="complete" class="cursor-pointer" type="button" aria-pressed="false" aria-label="Marcar tarefa como concluída">
									<img data-button="complete" src="${this.checkers.white}" aria-hidden="true" />
								</button>
								<p class="font-bold text-deep-blue">Tarefa pendente</p>
							</div>
							<button data-button="edit" class="cursor-pointer" type="button" aria-label="Editar tarefa">
								<img data-button="edit" src="${edit}" aria-hidden="true" />
							</button>`;
		liElement.remove();
		listElement.append(addLi);
		return;
	}

	renderCancelAddTask(liCancel: HTMLElement): void {
		liCancel.remove();
		return;
	}

	renderSetTimer(
		groupSet: HTMLElement,
		setTimer: HTMLButtonElement,
		timer: HTMLParagraphElement,
		btnPlayAndPause: HTMLButtonElement
	): void {
		const setElements = Array.from(groupSet.children) as HTMLButtonElement[];

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

		this.playTimer = false;

		this.renderPlayTimer(timer, btnPlayAndPause, false);
		return;
	}

	renderPlayTimer(timer: HTMLParagraphElement, button: HTMLButtonElement, playSongPause: boolean = true): void {
		const mode: string = timer.getAttribute("data-mode")!;

		if (this.playTimer) {
			this.playTimer = false;
			button.innerText = "Pausar";
			this.elementImage.setAttribute("src", pauseImage);
			button.prepend(this.elementImage);
			timer.setAttribute("data-play", "false");

			this.audioPlayI.play();

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

			let timeStamp: number = this.convertsTime(timer);
			this.playOrPauseTimer(timer, button, true, playSongPause, timeStamp);
		} else {
			this.playTimer = true;
			this.playOrPauseTimer(timer, button, false, playSongPause);
		}
	}

	private convertsTime(timer: HTMLParagraphElement): number {
		const partOneDate: string = "Tue Dec 09 2025 00:";
		const partTwoDate: string = " GMT-0300 (Horário Padrão de Brasília)";
		const dateTo: string = `${partOneDate}${timer.innerText}${partTwoDate}`;
		return Date.parse(dateTo);
	}

	private playOrPauseTimer(timer: HTMLParagraphElement, button: HTMLButtonElement, playOrPause: boolean, playSongPause: boolean, timeStamp?: number) {
		if (playOrPause) {
			this.intervalPlay = setInterval(() => {
				if (timeStamp) {
					timeStamp -= 1000;
					let showTime = new Date(timeStamp).toLocaleTimeString("pt-BR");
					showTime = showTime.substring(3);
					timer.textContent = showTime;

					if (showTime === "00:12") {
						this.count.play();
					}

					if (showTime === "00:00") {
						clearInterval(this.intervalPlay);
						this.beep.play();
						button.textContent = "Começar";
						this.elementImage.setAttribute("src", playImage);
						button.prepend(this.elementImage);
						timer.setAttribute("data-play", "true");
					}
				}
			}, 1000);
		} else {
			timer.setAttribute("data-play", "true");
			this.count.pause();
			this.count.currentTime = 0;
			button.textContent = "Começar";
			this.elementImage.setAttribute("src", playImage);
			button.prepend(this.elementImage);
			clearInterval(this.intervalPlay);
			if (playSongPause) {
				this.audioStopI.play();
			}
		}
	}

	renderSong(btnSong: HTMLButtonElement, circleElement: HTMLElement): void {
		this.audioSong.loop = true;
		if (this.audioSong.paused) {
			btnSong.classList.add("song-button-on");
			circleElement.classList.add("song-circle-on");
			btnSong.classList.remove("song-button-off");
			circleElement.classList.remove("song-circle-off");
			this.audioSong.play();
			return;
		}

		this.audioSong.pause();
		btnSong.classList.add("song-button-off");
		circleElement.classList.add("song-circle-off");
		btnSong.classList.remove("song-button-on");
		circleElement.classList.remove("song-circle-on");
		return;
	}
}
