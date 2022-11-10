<template>
  <div class="q-pa-md q-mt-lg q-ml-lg">
    <q-card bordered class="my-card" elevated>
      <q-card-section>
        <q-btn label="Add Payment Type Template" 
          elevated 
          class="q-mb-md q-mr-md" 
          size="md" 
          :to="{name: 'payment-add'}" 
          icon="add_circle" 
          color="primary" 
          id="addAscUser" v-if="is_list" />

        <q-btn label="Payment Type List" 
        elevated 
        class="q-mb-md q-mr-md" 
        size="md" 
        :to="{name: 'payment-lists'}" 
        icon="lists" 
        color="primary" 
        id="addAscUser" 
        v-if="is_form" />

        <div class="text-h6 page-title text-dark"><q-icon name="payment" /> Payment Type</div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <router-view />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>export default {
  computed: {
      route_name(){
        return this.$route.name;
      },
      is_list(){
        if(this.$route.name == 'payment-lists'){
          return true
        }
        return false;
      },
      is_form(){
        let forms = ['payment-add', 'payment-update'];
        if(forms.includes(this.$route.name)){
          return true;
        }
        return false;
      }
    }
  }</script>
