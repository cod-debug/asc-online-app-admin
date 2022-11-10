<template>
  <div class="q-pa-md items-start q-gutter-md bg-grey-2">
    <h3>WELCOMEssss!</h3>
    <!-- <q-card class="my-card">
      <q-card-section>
        <div class="row">
          <div class="col q-ma-xs">
            <div class="row">
              <div class="col bg-indigo-12">
                <q-avatar icon="people " size="6em" />
              </div>
              <div class="col-8 text-center bg-indigo-13">
                <q-avatar>100</q-avatar>
                <div class="text-subtitle2">User Accounts</div>
              </div>
            </div>
          </div>
          <div class="col q-ma-xs">
            <div class="row">
              <div class="col bg-pink-12">
                <q-avatar icon="contacts " size="6em" />
              </div>
              <div class="col-8 text-center bg-pink-13">
                <q-avatar>100</q-avatar>
                <div class="text-subtitle2">Patients</div>
              </div>
            </div>
          </div>

          <div class="col q-ma-xs">
            <div class="row">
              <div class="col bg-teal-12">
                <q-avatar icon="medical_services " size="6em" />
              </div>
              <div class="col-8 text-center bg-teal-13">
                <q-avatar>100</q-avatar>
                <div class="text-subtitle2">Services</div>
              </div>
            </div>
          </div>
          <div class="col q-ma-xs">
            <div class="row">
              <div class="col bg-lime-12">
                <q-avatar icon="discount " size="6em" />
              </div>
              <div class="col-8 text-center bg-lime-13">
                <q-avatar>100</q-avatar>
                <div class="text-subtitle2">Discounts</div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="my-card">
      <q-card-section>
        <div class="row">
          <div class="col">
            <LineChart :series="series" :labels="labels" />
          </div>
          <div class="col">
            <PieChart :series="PieSeries" :labels="labels2" />
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="my-card">
      <q-card-section>
        <div class="row">
          <div class="col q-ma-xs">
            <div class="text-h6">Page Visitors</div>
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label>Single line item</q-item-label>
                  <q-item-label caption lines="2"
                    >Secondary line text. Lorem ipsum dolor sit amet,
                    consectetur adipiscit elit.</q-item-label
                  >
                </q-item-section>

                <q-item-section side top>
                  <q-item-label caption>5 min ago</q-item-label>
                  <q-icon name="star" color="yellow" />
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label>Single line item</q-item-label>
                  <q-item-label caption
                    >Secondary line text. Lorem ipsum dolor sit amet,
                    consectetur adipiscit elit.</q-item-label
                  >
                </q-item-section>

                <q-item-section side top>
                  <q-item-label caption>Voted!</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label>Single line item</q-item-label>
                  <q-item-label caption
                    >Secondary line text. Lorem ipsum dolor sit amet,
                    consectetur adipiscit elit.</q-item-label
                  >
                </q-item-section>

                <q-item-section side top>
                  <q-badge color="teal" label="10k" />
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label>Single line item</q-item-label>
                  <q-item-label caption
                    >Secondary line text. Lorem ipsum dolor sit amet,
                    consectetur adipiscit elit.</q-item-label
                  >
                </q-item-section>

                <q-item-section side top>
                  <q-item-label caption>2 min ago</q-item-label>
                  <div class="text-orange">
                    <q-icon name="star" />
                    <q-icon name="star" />
                    <q-icon name="star" />
                  </div>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label>Single line item</q-item-label>
                  <q-item-label caption
                    >Secondary line text. Lorem ipsum dolor sit amet,
                    consectetur adipiscit elit.</q-item-label
                  >
                </q-item-section>

                <q-item-section side top>
                  <q-item-label caption>meta</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="col q-ma-xs">
            <div class="text-h6">User Activity Logs</div>
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label>Single line item</q-item-label>
                  <q-item-label caption lines="2"
                    >Secondary line text. Lorem ipsum dolor sit amet,
                    consectetur adipiscit elit.</q-item-label
                  >
                </q-item-section>

                <q-item-section side top>
                  <q-item-label caption>5 min ago</q-item-label>
                  <q-icon name="star" color="yellow" />
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label>Single line item</q-item-label>
                  <q-item-label caption
                    >Secondary line text. Lorem ipsum dolor sit amet,
                    consectetur adipiscit elit.</q-item-label
                  >
                </q-item-section>

                <q-item-section side top>
                  <q-item-label caption>Voted!</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label>Single line item</q-item-label>
                  <q-item-label caption
                    >Secondary line text. Lorem ipsum dolor sit amet,
                    consectetur adipiscit elit.</q-item-label
                  >
                </q-item-section>

                <q-item-section side top>
                  <q-badge color="teal" label="10k" />
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label>Single line item</q-item-label>
                  <q-item-label caption
                    >Secondary line text. Lorem ipsum dolor sit amet,
                    consectetur adipiscit elit.</q-item-label
                  >
                </q-item-section>

                <q-item-section side top>
                  <q-item-label caption>2 min ago</q-item-label>
                  <div class="text-orange">
                    <q-icon name="star" />
                    <q-icon name="star" />
                    <q-icon name="star" />
                  </div>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label>Single line item</q-item-label>
                  <q-item-label caption
                    >Secondary line text. Lorem ipsum dolor sit amet,
                    consectetur adipiscit elit.</q-item-label
                  >
                </q-item-section>

                <q-item-section side top>
                  <q-item-label caption>meta</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-card-section>
    </q-card> -->
  </div>
</template>

<script>
import LineChart from "components/LineChart.vue";
import PieChart from "components/PieChart.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  // components: { LineChart, PieChart },
  data() {
    return {
      labels: ["Doctors", "Nurses", "Receptionist", "Invoice", "Patients"],
      labels2: ["Doctors", "Nurses", "Receptionist", "Invoice", "Patients"],
      PieSeries: [14, 15, 16, 20, 21],
      series: [
        {
          type: "line",
          data: [14, 15, 16, 20, 21],
        },
        {
          type: "column",
          data: [14, 15, 16, 20, 21],
        },
      ],
    };
  },
});
</script>
