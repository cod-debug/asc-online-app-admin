<template>
  <q-expansion-item header-class="text-dark bg-blue-2 shadow-3"
                    bordered>
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar icon="label_important" color="blue-2" text-color="dark" />
      </q-item-section>

      <q-item-section style="font-size: 18px; flex-wrap: unset;">
        <div class="row q-pa-none">
          <div class="col-md-4">
            <strong>Material Information</strong>
          </div>
          <div class="col-md-4 text-grey-14">
            Ads Details
          </div>
        </div>
      </q-item-section>
      <q-item-section side>
        <div class="row items-center">
          <q-icon name="ads_click" color="dark" size="24px" />
        </div>
      </q-item-section>
    </template>


    <q-card class="text-dark border-dark q-mb-md" bordered>
      <q-card-section>
        <q-form>
          <q-card bordered :square="true" class="q-pa-md">
            <div class="row">
              <div class="col-sm-12 q-pa-sm">
                <q-input outlined label="Ad Title *" v-model="parentData.ad_title" disable />
              </div>
              <div class="col-sm-6 q-pa-sm">
                <q-select outlined label="Reference Code of Previously-Approved Material" v-model="parentData.referrence_code"  disable></q-select>
              </div>
              <div class="col-sm-6 q-pa-sm">
                <q-input type="text" outlined label="Tagline" v-model="parentData.tag_line" disable />
              </div>
            </div>
          </q-card>

          <q-card bordered :square="true" class="q-pa-md q-mt-md">
            <q-card-section class="q-pa-sm">
              <q-icon name="bookmark" class="text-red-15" style="font-size: 24px" /> Type of Medium
            </q-card-section>
            <div class="row">
              <div class="col-sm-12 q-pa-sm">
                <div class="q-gutter-sm">
                  <q-radio dense v-model="parentData.type_of_media" val="SINGLE MEDIA" label="Single Media" disable />
                  <q-radio dense v-model="parentData.type_of_media" val="MULTIMEDIA" label="Multimedia" disable />
                </div>
              </div>
            </div>

            <div v-if="parentData.type_of_media == 'SINGLE MEDIA'">
              <div v-for="(i, k) in parentData.type_of_medium" :key="k" class="row">
                <div class="col-12 col-md-12 q-pa-sm" v-if="k == 0">
                  <q-select outlined label="Single Media *" v-model="i.type_of_medium" :options="medium_options" option-label="desc" option-value="desc" disable>
                  </q-select>
                </div>
                <div class="col-4 col-md-4 q-pa-sm" v-if="i.type_of_medium.execution && k == 0">
                  <q-select outlined label="Execution *" v-model="i.execution" :options="execution_options" option-label="type" option-value="type" disable></q-select>
                </div>
                <div class="col-4 col-md-4 q-pa-sm"  v-if="i.type_of_medium.language && k == 0">
                  <q-select outlined label="Language / Dialect" v-model="i.dialect" :options="language_options" option-label="dialect" option-value="dialect" disable></q-select>
                </div>
                <div class="col-4 col-md-4 q-pa-sm"  v-if="i.type_of_medium.length && k == 0" >
                  <q-input outlined label="Duration (in seconds)" v-model="i.lengthSize" disable/>
                </div>
                <div class="col-4 col-md-4 q-pa-sm" v-if="i.type_of_medium.size && k == 0">
                  <q-input outlined label="Size / Length" v-model="i.lengthSize" hint="e.i format: 8 x 11 inches" disable />
                </div>
                <div class="col-4 col-md-4 q-pa-sm" v-if="i.type_of_medium.others && k == 0">
                  <q-input outlined label="Others" v-model="i.others" disable/>
                </div>
              </div>
            </div>
            
            
            <div v-if="parentData.type_of_media == 'MULTIMEDIA'">
              <div class="col-sm-12 q-pa-sm">
                <div class="q-gutter-sm">
                  <q-radio dense v-model="isMoving" :val="true" label="MULTIMEDIA-MOVING" disable />
                  <q-radio dense v-model="isMoving" :val="false" label="MULTIMEDIA-STATIC (MAX OF 5 LAYOUT)" disable />
                </div>
              </div>

              <div class="col-12">
                <div>
                  <table class="table w-100">
                    <tbody>
                      <tr v-for="(i, k) in type_of_medium_options" :key="k" class="row">
                        <td width="50%">
                          <q-checkbox :label="i.val" :val="i.type_of_medium" v-model="type_of_mediums_updated" disable />
                        </td>
                        <td v-if="!isMoving && i.val != 'DIGITAL STATIC'"  width="50%" class="q-pa-sm">
                          <q-input v-model="i.lengthSize" input-class="text-right" disable outlined />
                        </td>
                        <td v-else-if="isMoving && k == 0"  width="50%">
                          <q-input v-model="i.lengthSize" input-class="text-right" disable outlined />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <q-card-section>
              <!-- <q-btn label="Save updates" @click="saveUpdate" icon="save" size="sm" color="red-14" /> -->
            </q-card-section>
          </q-card>

          <q-card bordered :square="true" class="q-pa-md q-mt-md">

            <q-card-section class="q-pa-sm">
              <p class="text-center text-grey-14 q-ma-none">ORIGINAL</p>
              <hr />
            </q-card-section>
            <q-card-section>
              <q-card bordered class="q-pa-sm">
                <q-card-section class="q-pa-sm">
                  <b>ORIGINAL</b>
                  <br />
                  <div class="q-mt-sm">
                    <q-icon name="bookmark" class="text-red-15" style="font-size: 24px" /> MAIN DOCUMENT
                  </div>
                </q-card-section>

                <q-card-section>
                  <div class="row">
                    <div class="col-sm-12 q-pa-sm">
                      <div class="q-gutter-sm">
                        <div class="">
                          <label>File Path:</label>
                          <br />
                          <label class="text-grey-14">{{parentData.origMainDocUrl}}</label>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12 q-pa-sm text-right">
                      <q-btn color="red-14" @click="viewDoc(parentData.origMainDocUrl)">
                        <q-icon name="open_in_new" />
                        VIEW DOCUMENT
                      </q-btn>
                    </div>
                  </div>
                </q-card-section>
                <hr v-if="parentData.subDocUrl" />

                <q-card-section class="q-pa-sm" v-if="parentData.subDocUrl">
                  <div class="q-mt-sm">
                    <q-icon name="bookmark" class="text-red-15" style="font-size: 24px" /> SUPPORT DOCUMENT
                  </div>
                </q-card-section>

                <q-card-section v-if="parentData.subDocUrl">
                  <div class="row">
                    <div class="col-sm-12 q-pa-sm">
                      <div class="q-gutter-sm">
                        <div class="">
                          <label>File Path:</label>
                          <br />
                          <label class="text-grey-14">{{parentData.subDocUrl}}</label>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12 q-pa-sm text-right">
                      <q-btn color="red-14" @click="viewDoc(parentData.subDocUrl)">
                        <q-icon name="open_in_new" />
                        VIEW DOCUMENT
                      </q-btn>
                    </div>
                  </div>
                </q-card-section>
                
                
              <div class="q-ma-md" v-if="doc_types_current.length > 0">
                <q-table dense :columns="doc_types_columns" :rows="doc_types_current" square>
                  <template #body="props">
                    <q-tr
                      :props="props"
                      hover
                    >
                      <q-td
                        key="type_of_document"
                        :props="props"
                      >
                        {{ props.row.type_of_document || 'N/A' }}
                      </q-td>
                      <q-td
                        key="input"
                        :props="props"
                      >
                        {{ props.row.input || 'N/A' }}
                      </q-td>
                      <q-td
                        key="variant"
                        :props="props"
                      >
                        {{ props.row.variant || 'N/A' }}
                      </q-td>
                      <q-td
                        key="expiration_date"
                        :props="props"
                      >
                        {{ props.row.expiration_date || 'N/A' }}
                      </q-td>
                      <q-td
                        key="date_launch"
                        :props="props"
                      >
                        {{ props.row.date_launch ?  props.row.date_launch : 'N/A' }}
                      </q-td>
                      <q-td
                        key="remarks"
                        :props="props"
                      >
                        {{ props.row.remarks || 'N/A' }}
                      </q-td>
                      <q-td
                        key="actions"
                        :props="props"
                      >
                        <q-btn size="sm" color="red-14" icon="delete" @click="removeDoc(props.row.id, props.pageIndex)" />
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </div>

                <q-card-section class="q-pa-sm" v-if="parentData.revision_letter">
                  <div class="q-mt-sm">
                    <q-icon name="bookmark" class="text-red-15" style="font-size: 24px" /> REVISION LETTER
                  </div>
                </q-card-section>

                <q-card-section v-if="parentData.revision_letter">
                  <div class="row">
                    <div class="col-sm-12 q-pa-sm">
                      <div class="q-gutter-sm">
                        <div class="">
                          <label>File Path:</label>
                          <br />
                          <label class="text-grey-14">{{parentData.revision_letter}}</label>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12 q-pa-sm text-right">
                      <q-btn color="red-14" @click="viewDoc(parentData.revision_letter)">
                        <q-icon name="open_in_new" />
                        VIEW DOCUMENT
                      </q-btn>
                    </div>
                  </div>
                </q-card-section>
                
              </q-card>
            </q-card-section>
          </q-card>
        </q-form>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script>
import { Notify } from 'quasar';

  export default {
    props: ["appId"],
    data: () => ({
      company_name: "",
      single_media: "",
      language: null,

      type_of_medium_options: [],
      type_of_mediums_updated: [],

      type_of_mediums_length: [],
      size: 0,
      length: 0,
      execution: "",
      others: [],
      execution_options: [],
      medium_options: [],
      language_options: [],
      multimedia_options: [],
      multimedia_moving_static: [],

      isMoving: null,
      is_moving_length: "",

      

      doc_types_columns: [
          { name: 'type_of_document', align: 'left', label: 'TYPE OF DOCUMENT', field: 'type_of_document', sortable: true },
          { name: 'input', align: 'left', label: 'INPUT', field: 'input', sortable: true, },
          { name: 'variant', align: 'left', label: 'VARIANT', field: 'variant', sortable: true, },
          { name: 'expiration_date', align: 'left', label: 'EXPIRES ON', field: 'expiration_date', sortable: true, },
          { name: 'date_launch', align: 'left', label: 'BASED ON', field: 'date_launch', sortable: true, },
          { name: 'remarks', align: 'left', label: 'REMARKS', field: 'remarks', sortable: true, },
        ],
      doc_types_current: [],

    }),
    computed:{
      parentData(){
        return this.$parent.$parent.$parent.$parent;
      },
    },

    watch:{
      isMoving(newVal, oldVal){
        let vm = this;
        if([true, false].includes(newVal)){
          this.type_of_medium_options = this.multimedia_options.filter((i) => {
            return i.isMoving == newVal;
          });
          
          if(this.parentData.type_of_media == 'MULTIMEDIA'){
            this.type_of_mediums_updated = this.parentData.type_of_medium_parsed;
            this.type_of_medium_options.map((opt) => {
              vm.parentData.type_of_medium.map((tom) => {
                if(opt.type_of_medium == tom.type_of_medium) {
                  return {...opt, lengthSize: tom.lengthSize};
                }
              });
            });
          }
        }
      },
    },
    mounted() {
      this.initApp();
    },
    methods:{
      async saveUpdate(){
        let vm = this;
        let payload = {
          
          form_group: this.parentData.form_group,
          type_of_media: this.parentData.type_of_media,
          // dialect:  this.parentData.dialect,
          ad_title: this.parentData.ad_title,
          tag_line: this.parentData.tag_line,
          application_type: this.parentData.application_type,
          type_of_mediums: [],
        }

        this.type_of_medium_options.map((o, p) => {
          return this.type_of_mediums_updated.map((i, k) => {
            if(o.type_of_medium == i){
              o.type_of_medium= i;
              // REMOVE VAL IN PAYLOAD
              delete o.val;  
              payload.type_of_mediums.push(o);
            }
          }) 
        });

        
        

        if(this.parentData.type_of_media == "SINGLE MEDIA"){
          console.log(this.parentData.type_of_medium, "CURRENT TYPE OF MEDIUM");
          payload.type_of_mediums = this.parentData.type_of_medium.map((i) => {
            return {...i, type_of_medium: i.type_of_medium.desc}
          });
        }
        
        payload = {
          data: payload,
          id: this.appId,
        }

        vm.parentData.type_of_medium_parsed = payload.data.type_of_mediums.map((i) => {
          return i.type_of_medium
        });

        console.log(payload, "UPDATE PAYLOAD");
        // return false;
        let {data, status} = await vm.$store.dispatch("s1/updateApp", payload);
        if([200, 201].includes(status)){
          Notify.create({
            message: data.message,
            position: 'top-right',
            closeBtn: "X",
            timeout: 2000,
            color: 'green',
          });
          
          vm.initApp();
        } else {
          Notify.create({
            message: data.message,
            position: 'top-right',
            closeBtn: "X",
            timeout: 2000,
            color: 'red',
          });
        }
      },  
      viewDoc(doc){
        // console.log(doc);
        // return false;
        window.open(doc, "_blank");
      },

      initApp(){
        let vm = this;
        vm.doc_types_current = vm.parentData.document_type;
        // this.single_media = this.$parent.$parent.$parent.$parent.type_of_medium.type_of_medium;
        if(this.parentData.type_of_media){
          // this.single_media = this.$parent.$parent.$parent.$parent.type_of_medium[0].type_of_medium;
        }
        
        // console.log(this.parentData, "PARENT DATA")
        // this.parentData.type_of_medium.map((i) => {
        //   this.type_of_mediums.push(i.type_of_medium);
        // });

        // console.log(this.type_of_mediums, "TYPE OF MEDIUM INIT");
        // this.isMoving = true;

        // this.getAllExecution();
        // this.getAllMediums();
        // this.getAllLanguage();
        this.multimedia_options = [
          {
            dialect: "",
            exececution: "",
            isMoving: true,
            length: "",
            lengthSize: "",
            others: "",
            val:"CINEMA",
            type_of_medium: "CINEMA",
          },
          {
            dialect: "",
            exececution: "",
            isMoving: true,
            length: "",
            lengthSize: "",
            others: "",
            val:"COLLATERALSC",
            type_of_medium: "COLLATERALSC",
          } ,
          {
            dialect: "",
            exececution: "",
            isMoving: true,
            length: "",
            lengthSize: "",
            others: "",
            val:"DIGITAL VIDEO",
            type_of_medium:"DIGITAL VIDEO",
          },
          {
            dialect: "",
            exececution: "",
            isMoving: true,
            length: "",
            lengthSize: "",
            others: "",
            val:"E-OOH",
            type_of_medium: "",
          },
          {
            dialect: "",
            exececution: "",
            isMoving: true,
            length: "",
            lengthSize: "",
            others: "",
            val:"TELEVISION",
            type_of_medium: "TELEVISION",
          },
          {
            dialect: "",
            exececution: "",
            isMoving: false,
            length: "",
            lengthSize: "",
            others: "",
            val:"COLLATERALS",
            type_of_medium: "COLLATERALS",
          },
          {
            dialect: "",
            exececution: "",
            isMoving: false,
            length: "",
            lengthSize: "",
            others: "",
            val:"DIGITAL STATIC",
            type_of_medium: "DIGITAL STATIC",
          } ,
          {
            dialect: "",
            exececution: "",
            isMoving: false,
            length: "",
            lengthSize: "",
            others: "",
            val:"OOH",
            type_of_medium: "OOH",
          },
          {
            dialect: "",
            exececution: "",
            isMoving: 0,
            length: "",
            lengthSize: "",
            others: "",
            val:"PRINT",
            type_of_medium: "PRINT",
          },
        ];
        this.isMoving = this.parentData?.type_of_medium ? this.parentData?.type_of_medium[0]?.isMoving == 0 ? false : true : false;
        
        
        if(this.parentData.type_of_media == 'MULTIMEDIA'){
          this.type_of_mediums_updated = this.parentData.type_of_medium_parsed;
          console.log(this.type_of_mediums_updated, "MULTIMEDIA!!!")
        }

        this.type_of_medium_options = this.multimedia_options.filter((i) => {
          return i.isMoving == vm.isMoving;
        });

        this.parentData.type_of_medium_new.map((i) => {
          this.type_of_medium_options.map((item, k) =>{
            if(i.type_of_medium == item.type_of_medium){
              vm.type_of_medium_options[k].lengthSize = i.lengthSize;
            }
          })
        });
        console.log(this.parentData.type_of_medium_parsed, "CHECK MEDIUMS");
        this.type_of_mediums_updated = this.parentData.type_of_medium_parsed;
      },

      async getAllExecution(){
        let vm = this;

        let payload = {
          page: 1,
          size: 1000,
          order: "type:asc",
          search: "",
        }

        let {data, status} = await vm.$store.dispatch('admin_api/getAllExecutionTypes', payload);
        vm.execution_options = data.rows;
        // getAllExecutionTypes
      },

      async getAllMediums(){
        let vm = this;

        let payload = {
          page: 1,
          size: 1000,
          order: "desc:asc",
          search: "",
        }

        let {data, status} = await vm.$store.dispatch('admin_api/getAllMediums', payload);
        vm.medium_options = data.rows;

        // GET CURRENT SELECTED TYPE OF MEDIUM AND CONVERT TO OBJECT TO MATCH THE OPTIONS
        let first_type = vm.parentData.type_of_medium_parsed[0];
        if(vm.parentData.type_of_media == "SINGLE MEDIA"){
          data.rows.map((i, key) => {
            if(first_type == i.desc){
              vm.parentData.type_of_medium[0].type_of_medium = i;
              console.log(i);
            }
          });
        }

        // this.multimedia_moving_options = data.rows.filter((i) => {
        //   return i.moving
        // });

        // this.multimedia_static_options = data.rows.filter((i) => {
        //   return i.static
        // });

        // console.log(this.multimedia_moving_options, "MOVING");
        // console.log(this.multimedia_static_options, "STATIC");

        // getAllExecutionTypes
      },

      async getAllLanguage(){
        let vm = this;

        let payload = {
          page: 1,
          size: 1000,
          order: "dialect:asc",
          search: "",
        }
        
        let {data, status} = await vm.$store.dispatch('admin_api/getAllDialects', payload);
        vm.language_options = data.rows;
        // getAllExecutionTypes
      },
    }
  }
</script>
