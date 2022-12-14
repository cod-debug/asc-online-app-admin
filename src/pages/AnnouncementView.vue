<template>
    <div class="q-pa-md q-mt-lg q-ml-lg">
        
        <div v-if="is_loading" class="text-center q-pa-lg">
          <div class="loading-page">
            <q-spinner-ios color="white" size="3rem" />
          </div>
        </div>
      <q-card bordered class="my-card" elevated v-else>
        <q-card-section class="row">
          <div class="text-h6 page-title text-dark col-12 col-md-8"><q-icon name="feedback" />  Announcements </div>
        </q-card-section>
  
        <q-separator inset />
  
        <q-card-section>
            <q-card class="bg-red-1 q-mb-md shadow-6" v-for="(item, key) in announcementsList" :key="key">
                <q-card-section class="row">
                    <div class="page-title text-red-15 col-12 col-md-8">
                        <q-icon name="campaign" class="text-h4" />  
                        <span class="text-h6">{{item.title}} </span>
                    </div>
                    <div class="col-12 col-md-4">
                        <div class="counters text-center">
                            <q-icon name="visibility" class="text-red-15" /> 
                            <b class="q-ml-md text-green-14">{{item.vcount}}</b>

                            <span class="q-mx-md">|</span>
                            
                            <q-icon name="event_available" class="text-red-15" /> 
                            <b class="q-ml-md text-green-14">{{formatDate(item.pdate)}}</b>
                        </div>
                    </div>
                </q-card-section>
                
                <q-card-section>
                    <small> {{item.details}}</small>
                </q-card-section>
            </q-card>

            <q-pagination v-model="current"
                            @update:model-value="getAllAnnouncements()"
                            :max="max_page"
                            direction-links
                            flat
                            color="grey"
                            active-color="primary" />
        </q-card-section>
        
      </q-card>
    </div>
  </template>
  
  
  <script>
    import { Notify } from 'quasar';

    export default {
      data: () => ({
        announcementsList: [],
        is_loading: true,

        // PAGINATION VARIABLES
        current: 1,
        size: 3,
        max_page: 0,
      }),
      computed:{
      },
      mounted(){
        this.initApp();
      },
      watch: {
      },
      methods:{
        initApp(){
            this.getAllAnnouncements();
        },
        async getAllAnnouncements(){
            let vm = this;
            vm.is_loading = true;
            let payload = {
                page: vm.current,
                size: vm.size,
                order: "id:desc",
                search: "",
            }

            let {data, status} = await vm.$store.dispatch("announcements/getAllAnnouncements", payload);
            if([200, 201].includes(status)){
                vm.announcementsList = data.rows;
                vm.max_page = data.tpage;
                vm.is_loading = false;
            } else {
                Notify.create("Something went during request for list of announcments", "red");
                vm.is_loading = false;
            }
        },
        formatDate(date){
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            const d = new Date(date);
            let month = months[d.getMonth()];

            return `${month} ${d.getDay()}, ${d.getFullYear()}`;
        }
        

      }
    }
  </script>
  
  