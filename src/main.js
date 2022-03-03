import App from './App.svelte';
//Estilos y notificaciones
import 'bootswatch/dist/vapor/bootstrap.min.css';
import "toastify-js/src/toastify.css";

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;