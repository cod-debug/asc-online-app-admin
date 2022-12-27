<template>
	<div class="q-pa-md q-mt-lg q-ml-lg">
		<q-card bordered class="my-card" elevated>
			<q-card-section>
				<div class="text-h6 page-title"><q-icon name="badge" /> User Account</div>
			</q-card-section>

			<q-separator inset />

			<q-card-section>
				<q-tabs v-model="tab"
								dense
								align="left"
								class="text-dark"
								indicator-color="blue"
								:no-caps="true">

					<q-tab name="nonasc" label="Non ASC Users" @click="setActiveTab('nonasc')" />

					<q-tab name="asc" label="ASC Users" @click="setActiveTab('asc')" />
					
					<q-btn label="Add ASC User" elevated class="q-my-md" id="addAscUser" size="sm" icon="add_circle" v-if="tab == 'asc'" color="primary" @click="showAddASCUser(false)" />
				</q-tabs>

				<hr class="q-tabs-gutter" color="lightgray" />

				<app-non-asc-table v-if="tab == 'nonasc'" ref="nonasc" />
				<app-asc-table v-else-if="tab == 'asc'" ref="asc" :update="is_update" />
			</q-card-section>
		</q-card>
	</div>
</template>

<script>
	
import { ref } from 'vue';
import NonAscTable from "./Tables/NonAsc.vue";
import AscTable from "./Tables/AscUser.vue";
export default {
		name: 'AdminAnnouncements',
		data: () => ({
			active_tab: "nonasc",
			all_nonc: [],
			loading: true,
			tab: "nonasc",
			is_update: false,
		}),

		components: {
					AppNonAscTable: NonAscTable,
					AppAscTable: AscTable,
		},
        mounted(){
		  // this.getAllNONASC();
          this.active_tab = "nonasc"
        },
		methods: {
			setActiveTab(tab){
				this.tab = tab;
			},
			showAddASCUser(up) {
				this.$refs.asc.show_modal_user = true;
				this.$refs.asc.is_update = up;
			}
		},
		setup () {
			return {

			}
		}
}
</script>
