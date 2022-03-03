<script>
	//Modules
	import { onDestroy } from "svelte";
	import { db } from "./firebase";
	import {
		collection,
		doc,
		addDoc,
		deleteDoc,
		updateDoc,
		onSnapshot,
	} from "firebase/firestore";
	import Toastify from "toastify-js";

	//Variables
	let tasks = []; //Array Documents
	let task = {
		//Document
		title: "",
		description: "",
	};
	let currentId = "";
	let statusEdit = false;

	//Funciones del Document

	const addTask = async () => {
		try {
			const docRef = await addDoc(collection(db, "tasks"), {
				...task,
				createdAt: new Date(),
			});
			console.log("New Task added with Id: " + docRef.id);
			Toastify({
				text: "Task added Successfully",
				className: "info",
				close: true,
				style: {
					background: "linear-gradient(to right, #00b09b, #96c93d)",
				},
			}).showToast();
		} catch (err) {
			console.log("Error: " + err);
		}
	};

	const deleteTask = async (id) => {
		//console.log("Eliminando task "+id);
		try {
			let res = confirm("Are you sure to delete it?");
			if (res) {
				await deleteDoc(doc(db, "tasks", id));
				console.log("Task No. " + id + " deleted.");
				Toastify({
					text: "Task Deleted Successfully",
					className: "danger",
					close: true,
					style: {
						background: "#FF5733",
					},
				}).showToast();
			}
		} catch (err) {
			console.error("Error: " + err);
		}
	};

	const editTaskk = async (currentTask) => {
		//console.log("Editing Task. No "+id);
		currentId = currentTask.id;
		task.title = currentTask.title;
		task.description = currentTask.description;
		statusEdit = true;
	};

	const updateTask = async () => {
		try {
			let res = confirm("Are you suer todo update this task?");
			if (res) {
				await updateDoc(doc(db, "tasks", currentId), {
					...task,
					updatedAt: new Date(),
				});
				console.log("Task updated successfully.");
				Toastify({
					text: "Task added Successfully",
					className: "info",
					close: true,
					style: {
						background: "linear-gradient(#40bade )",
					},
				}).showToast();
			}
		} catch (err) {
			console.error("Error: " + err);
		}
	};

	const onsub = onSnapshot(
		//Llenar variable tasks con la data de Firestore
		collection(db, "tasks"),
		(querySnapshot) => {
			/* querySnapshot.forEach((doc) => {
				tasks.push(doc.data(), doc.id);
			}); */
			tasks = querySnapshot.docs.map((doc) => {
				return { ...doc.data(), id: doc.id };
			});

			console.log(tasks);
		},
		(err) => {
			console.log("Error: " + err);
		}
	);

	const handleSubmit = async () => {
		//Manejar los posibles estados del formulario
		let form = document.getElementById("form");
		//Cancelando comportamiento del form desde Svelte
		try {
			if (statusEdit) {
				updateTask();
			} else {
				addTask();
			}
		} catch (err) {
			console.log("Error: " + err);
		}

		//Resetear formulario and variables
		statusEdit = false;
		currentId = "";
		form.reset();
		task = {
			title: "",
			description: "",
		};
	};

	onDestroy(onsub); //Destruir la suscripcion del onSnapshot
</script>

<main>
	<div class="container">
		<div class="row">
			<div class="col-md-6">
				<h3>Form Task</h3>
				<form
					class="form card card-body bg-dark p5"
					id="form"
					on:submit|preventDefault={handleSubmit}
				>
					<div class="mb-3">
						<label for="title" class="text-secondary fs-7"
							>Title</label
						>
						<input
							bind:value={task.title}
							id="title"
							title="title of Task"
							type="text"
							placeholder="Write a Title"
							class="form-control"
							required
						/>
					</div>

					<div class="mb-3">
						<label for="description" class="text-secondary fs-7"
							>Description</label
						>
						<textarea
							bind:value={task.description}
							id="description"
							title="description of Task"
							rows="5"
							placeholder="Write a description"
							class="form-control"
							required
						/>
					</div>

					<button class="btn btn-success mt-2" title="Submit"
						>Submit</button
					>
				</form>
			</div>
			<div class="col-md-6">
				<h3 class="mt-3">Tasks</h3>
				<!--{JSON.stringify(tasks)} MOSTRAR DATA DEL SERVER-->
				<div class="overflow-auto p-3 mb-3 mb-md-0 me-md-3"
				style="max-width: 600px; max-height: 550px;"> 
					{#each tasks as task}
						<!-- Realizando un recorrido de nuestro arreglo de tareas-->
						<div class="card card-body mt-2">
							<div class="d-flex justify-content-between">
								<h2>{task.title}</h2>
								<button
									on:click={editTaskk(task)}
									title="Edit Task"
									class="btn btn-info"
								>
									<i class="material-icons">edit</i>
								</button>
							</div>
							<p>{task.description}</p>
							<button
								on:click={deleteTask(task.id)}
								title="Delete Task"
								class="btn btn-danger"
							>
								<i class="material-icons">delete</i>
							</button>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
