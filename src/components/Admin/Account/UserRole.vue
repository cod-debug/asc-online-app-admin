<template>
	<div class="q-pa-md q-mt-lg q-ml-lg">
		<q-card bordered class="my-card" elevated>
			<q-card-section>
				<div class="text-h6 page-title text-dark"><q-icon name="settings_accessibility" /> User Role</div>
			</q-card-section>

			<q-separator inset />

			<q-card-section>
				
			</q-card-section>
		</q-card>
	</div>
</template>

<script>
	
import { ref } from 'vue';
export default {
		name: 'AdminAnnouncements',
		data: () => ({
			active_tab: "nonasc",
			all_nonc: [],
			loading: true,
			tab: "nonasc",
		}),

		components: {
		},
        mounted(){
		  // this.getAllNONASC();
          this.active_tab = "nonasc"
        },
		methods: {
		},
}
</script>
