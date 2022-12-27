<template>
    <div class="q-mt-md">
        
        <q-card bordered class="my-card" elevated>
            <q-card-section>
                <q-avatar icon="label_important" /> Stamped Material and Decision Forms
            </q-card-section>
            

            <q-separator inset />

            <q-card-section>
                <q-table :columns="columns">

                </q-table>
            </q-card-section>
        </q-card>

    </div>
</template>
<script>
    
  export default {
    
    data: () => ({
      pinkModel: false,
      columns: [
        { name: 'decision_file', align: 'left', label: 'Decision File Path', field: 'decision_file', sortable: true },
        { name: 'stamp_material', align: 'left', label: 'Stamp Material File Path', field: 'stamp_material', sortable: true, },
        { name: 'decision_status', align: 'left', label: 'Decision Status', field: 'company_name', sortable: true, },
        { name: 'decision_date', align: 'left', label: 'Decision Date', field: 'decision_date', sortable: true, },
      ],
    }),
    computed:{
      parentData(){
        return this.$parent.$parent.$parent.$parent;
      },
    },
  }
</script>