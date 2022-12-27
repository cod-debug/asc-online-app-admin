<template>
  <div class="q-mt-md">
    <q-table :columns="columns" table-class="screenwide">

    </q-table>
  </div>
</template>
<script>
  export default {
    data: () => ({
      columns: [
        { name: 'reference', align: 'left', label: 'AD TITLE', field: 'reference', sortable: true },
        { name: 'type', align: 'left', label: 'TYPE OF APPLICATION', field: 'type', sortable: true, },
        { name: 'company_name', align: 'left', label: 'COMPANY NAME', field: 'company_name', sortable: true, },
        { name: 'brand', align: 'left', label: 'BRAND', field: 'brand', sortable: true, },
        // { name: 'type_of_medium', align: 'left', label: 'TYPE OF MEDIUM', field: 'type_of_medium', sortable: true, },
        { name: 'status', align: 'left', label: 'APP STATUS', field: 'status', sortable: true, },
        // { name: 'payment_status', align: 'left', label: 'PAYMENT STATUS', field: 'payment_status', sortable: true, },
        // { name: 'internal_status', align: 'left', label: 'INTERNAL STATUS', field: 'internal_status', sortable: true, },
      ],
    }),
  }
</script>
