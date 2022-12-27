<template>
    <!-- DISAPPROVE MODAL -->
    <div class="q-pa-md q-gutter-sm">
        <q-dialog v-model="parentData.show_disapprove_modal" persistent transition-show="scale" transition-hide="scale">
        <q-card class=""  style="width: 600px; max-width: 80vw;">
            <q-card-section class="bg-red-14 text-white">
            <div class="text-h6"><q-icon name="fa-solid fa-exclamation-triangle" /> Reasons for Rejection</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
            <q-form>
                <q-select label="Select Reason:" :options="reason_options" outlined v-model="reasons" class="q-my-md" multiple option-label="reason" option-value="label" />
                <q-input type="textarea" label="Remarks:" outlined class="q-my-md" />
            </q-form>
            </q-card-section>

            <q-card-section align="right" class="bg-white text-teal">
            <div class="row">
                <div class="col-md-6 q-px-sm">
                    <q-btn flat label="Submit Rejection" class="bg-red-14 text-white btn-block" @click="verifyApp(false)" icon="fa-solid fa-check-circle" v-close-popup />
                </div>
                <div class="col-md-6 q-px-sm">
                    <q-btn flat label="Cancel" class="bg-red-14 text-white btn-block" icon="fa-solid fa-times-circle" v-close-popup />
                </div>
            </div>
            </q-card-section>
        </q-card>
        </q-dialog>
    </div>
</template>
<script>
    export default {
        props: {
            disapproveFunction: Function,
        },
        data: () => ({
            show_disapprove_modal: false,
            reason_options: [],
            reasons: [],
        }),
        computed: {
            parentData(){
                return this.$parent.$parent;
            },
            reasons_parsed(){
                if (this.reasons.length > 0){
                    return this.reasons.map((item) => {
                        return item.reason;
                    })
                }
                return []
            }, 
        },
        watch:{

        },
        mounted(){
            this.initApp();
        },
        methods: {
            verifyApp(ver){
                this.disapproveFunction(ver);
            },

            initApp(){
                this.getAllReasons();
            },

            async getAllReasons(){
                let vm = this;

                let payload = {
                    page: 1,
                    size: 1000,
                    order: "reason:asc",
                    search: "",
                }

                let {data, status} = await vm.$store.dispatch('admin_api/getAllReasons', payload);
                vm.reason_options = data.rows;
                // getAllExecutionTypes
            },

        }
    }
</script>