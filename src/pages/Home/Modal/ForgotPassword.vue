<template>
    <!-- DISAPPROVE MODAL -->
    <div class="q-pa-md q-gutter-sm">
        <q-dialog v-model="parentData.show_forgot_password_modal" persistent transition-show="scale" transition-hide="scale">
        <q-card class=""  style="width: 500px; max-width: 80vw;">
            <q-card-section class="bg-red-14 text-white">
                <div class="text-h6"><q-icon name="fa-solid fa-question" /> Forgot Password</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <q-card-section class="shadow-1 q-mt-sm text-grey">
                    <b class="text-red-14"><i class="fa fa-exclamation-triangle"></i> Note:</b>
                    <ol>
                        <li>Forget password using email</li>
                        <li>Temp password receive</li>
                        <li>If temp password use, then old password will be overwritten by temporary password upon login</li>
                        <li>If old password use after request a forget password, temp password will be clear, old password still active</li>
                    </ol>
                </q-card-section>
                <q-form>
                    <q-input label="Email Address * " outlined v-model="email_address" type="email" class="q-my-md" multiple option-label="reason" option-value="label" />
                </q-form>
                <div class="row">
                    <div class="col-md-6 q-px-sm">
                        <q-btn flat label="Reset Password" class="bg-red-14 text-white btn-block" @click="confirmForgotPassword()" icon="fa-solid fa-check-circle" v-close-popup />
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
import { Notify } from 'quasar';

    export default {
        props: {
            default_email: String,            
        },
        data: () => ({
            show_disapprove_modal: false,
            email_address: "",
        }),
        computed: {
            parentData(){
                return this.$parent;
            },
        },
        watch:{

        },
        mounted(){
            this.email_address = this.default_email;
        },
        methods: {
            async confirmForgotPassword() {
                let vm = this;

                let payload = {
                    email: this.email_address,
                }
                let {data, status } = await this.$store.dispatch('account/forgotPassword', payload);

                if([200, 201].includes(status)){
                    Notify.create({
                        message: data.message,
                        position: 'top-right',
                        closeBtn: "X",
                        timeout: 3000,
                    })
                } else {
                    Notify.create({
                        message: data.message,
                        position: 'top-right',
                        closeBtn: "X",
                        timeout: 3000,
                    })
                }
            }

        }
    }
</script>