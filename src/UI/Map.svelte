<script lang="ts">
	import type { Meetup } from '../utils/model/Meetup.model';

	let ref: HTMLDivElement | null = null;
	export let meetup: Meetup | null = null;
	//@ts-ignore
	let map;
	const Lats = [
		{ lat: -34.397, lng: 150.644 },
		{ lat: -24.397, lng: 180.644 }
	];
	const contentString = `
        <div class="content-box">
		    <div class="site-image">
                <img src="http://localhost:5000/public/images/6ca95dc3-2eec-4ae3-95a7-b82290bf4966.jpeg" />
            </div>
            <div class="content-info">
                <p>At ${meetup?.address}</p>
                <h2 id="firstHeading" class="firstHeading">${meetup?.title}</h2>
                <div id="bodyContent">
                    <p></p>
                <p>${meetup?.description}</p>
                </div> 
            </div> 
		</div>`;
	let infoWindow;
	async function initMap() {
		//@ts-ignore
		const { Map } = await google.maps.importLibrary('maps');

		map = new Map(ref, {
			center: { lat: -34.397, lng: 150.644 },
			zoom: 8
		});
	}
	const eqfeed_callback = async (results: any) => {
		//@ts-ignore
		const { Marker } = await google.maps.importLibrary('marker');
		//@ts-ignore
		const { InfoWindow } = await google.maps.importLibrary('streetView');
		//@ts-ignore
		const infowindow = new InfoWindow({
			content: contentString,
			ariaLabel: 'Uluru'
		});
		for (let i = 0; i < results.length; i++) {
			let marker = new Marker({
				position: results[i],
				//@ts-ignore
				map: map
			});
			marker.addListener('click', () => {
				infowindow.open({
					anchor: marker,
					//@ts-ignore
					map
				});
			});
		}
	};
	initMap();
	eqfeed_callback(Lats);
</script>

<div id="map" bind:this={ref} />

<style>
	div {
		width: 100%;
		height: 25rem;
	}
</style>
