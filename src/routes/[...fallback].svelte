<script context="module">
	export async function load({ page, fetch, session, context }) {
		if(page.params["fallback"]=="santi") {
			return {
				status: "301",
				//redirect: "https://mycook.es"
				redirect: "/popopo"
			}
		} else if(page.params["fallback"]=="juan/1") {
			return {
				props: {
					fallback: "SOY EL 1"
				}
			};
		} else if(page.params["fallback"]=="juan/2") {
			return {
				props: {
					fallback: "ME TOCA EL DOS"
				}
			};
		} else {
			return {
				props: {
					fallback: page.params['fallback']
				}
			};
		}
	}
</script>

<script>
	export let fallback;
</script>

<svelte:head>
	<title>FALLBACK</title>
</svelte:head>

<div class="content">
	<h1>FALLBACK</h1>
	<p>Hola Santi, estoy en el fallback!</p>
	<p>La ruta es: {fallback}</p>
</div>
