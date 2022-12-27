<template>
  <div class="q-pa-md q-mt-lg q-ml-lg">
    <q-card bordered class="my-card" elevated>
      <q-card-section class="row">
        <div class="text-h6 page-title text-dark col-md-6"><q-icon name="list" />  S1 APPLICATION -  MULTIPLE</div>
        <div class="text-right col-md-6">
          <!-- <q-btn label="NEW APPLICATION" elevated class="q-mr-sm position-right" size="md" icon="add" color="red-14" /> -->
          <q-btn :label="refresh_sec == 0 ? '' : refresh_sec + ' sec'" elevated size="md" icon="sync" @click="refresh" :disabled="refresh_sec > 0" color="primary" />
        </div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <div class="row q-my-lg">
          <div class="col-md-9 col-sm-12">
            <q-input outlined label="Search Applications" class="q-mt-md" />
          </div>
          <div class="col-md-3 q-px-md col-sm-12">
            <div class="shadow-2 q-pa-sm" >
              <b>Legend: </b>
              <table width="100%">
                <tr v-for="(item, key) in legends" :key="key">
                  <td width="5%">
                    <div :class="`legend ${item.color}`"></div>
                  </td>
                  <td class="q-pt-xs"><small><strong>{{item.title}}</strong></small></td>
                </tr>
              </table>
            </div>
          </div>
        </div>

        <MultipleTbl />
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
  import MultipleTbl from "./Tables/SpecialMultiple";

  export default {
    components: {
      MultipleTbl,
    },
    data: () => ({
      legends: [
        {
          color: "blue",
          title: "ORIGINAL",
        },
        {
          color: "gold",
          title: "FOR COMPLIANCE",
        },
        {
          color: "green",
          title: "REVISION",
        }
      ],

      refresh_sec: 0,
      active_tab: "ORIG",
    }),
    methods: {
      setActiveTab(tab) {
        this.active_tab = tab;
      },
      refresh() {
        let vm = this;

        vm.refresh_sec = 60;

        setInterval(() => {
          if (vm.refresh_sec > 0) {
            vm.refresh_sec--;
          }
        }, 1000);
      }
    }
  }
</script>
