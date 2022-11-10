<template>
  <div id="ServiceInvoiceReportHTML">
    <div class="row container-body">
      <div class="col">
        <img
          id="borough_img"
          src="~assets/bnw_borough2.png"
          style="height: 20px; width: 20px"
        />
      </div>
      <div class="col text-right">
        <div class="row">
          <div class="col"></div>
          <div class="col border-solid text-center">
            <div class="font-4 text-bold padding-1">Service Invoice</div>
            <div class="font-3 text-bold padding-1">2345678</div>
          </div>
        </div>
      </div>
    </div>
    <div class="row container-body">
      <div class="col">
        <div class="font-3 text-bold">
          Borough Medical Clinic Institute , Inc 2F Wellness Zone, North Wing SM
          MOA, Pasay
        </div>
        <div class="font-3">Non Vat Registered TIN :</div>
        <div class="font-3">PATIENTS NAME : JOHN TRAVOLTA</div>
        <div class="font-3">PATIENTS ADDRESS : BLK L MAKATI</div>
      </div>
      <div class="col text-right">
        <div class="font-3">Patient No : 67568</div>
        <div class="font-3">INVOICE DATE : 02-23-2012</div>
        <div class="font-3">ADMITTED DATE : 02-23-2012</div>
      </div>
    </div>
    <div class="row container-body">
      <div class="col font-3 border-dash q-mt-xs">
        <table style="width: 100%">
          <thead class="border-dash q-pa-xs">
            <tr class="text-center border-dash">
              <th>SERVICE RENDERED</th>
              <th>PHYSICIAN</th>
              <th>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-center">
              <td>John Meme</td>
              <td>123213213r</td>
              <td>21321323</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row container-body">
      <div class="col"></div>
      <div class="col"></div>
      <div class="col text-right font-3 q-mt-xs">
        <div class="row">
          <div class="col padding-1 text-right text-bold">Sub Total :</div>
          <div class="col padding-1">798789.00</div>
        </div>
        <div class="row">
          <div
            class="col padding-1 text-right text-bold"
            style="border-bottom: 0.1em solid #000"
          >
            Discount
          </div>
          <div class="col padding-1" style="border-bottom: 0.1em solid #000">
            798789.00
          </div>
        </div>
        <div class="row">
          <div class="col padding-1 text-left font-4 text-bold">
            Total Amount
          </div>
          <div class="col padding-1 font-4 text-bold">798789.00</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style>
.font-3 {
  font-size: 3px;
}
.font-4 {
  font-size: 4px;
}
.container-body {
  padding: 0 !important;
  margin: 0 !important;
  width: 190px;
}
.border-solid {
  border: 0.1pt solid #000;
}
.border-dash {
  border: 0.1em dashed #000;
}
.border-bt-dash {
  border-bottom: 0.1em dashed #000;
}
.padding-1 {
  padding: 1px;
}
</style>
