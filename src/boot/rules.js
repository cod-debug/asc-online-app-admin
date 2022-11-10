import { Notify } from "quasar";
import { boot } from "quasar/wrappers";

const rules = {
  required(val) {
    console.log(val, "value");
    return [(val) => (val && val.length > 0) || "This field is required!"];
  },
  requiredSelect(val) {
    return [(val) => val || "This field is required!"];
  },
  validateEmail(val) {
    const emailPattern =
      /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
    return emailPattern.test(val) || "Invalid email format";
  },
  confirmPassword(val, cpass) {
    return val === cpass || "Confirm password does not  match!";
  },
  validateContact(val) {
    var mobile = /^\(?([0-9]{11})\)?$/;
    return mobile.test(val) || "Invalid contact number format";
  },
  fileSizeRestrict(files) {
    console.log(files.size);
    const size = 3145728;
    return files.size < size || "Maximum of 3mb only";
  },
  fileTypeRestrict(files) {
    console.log(files);
    return files.type == "application/pdf" || "Accepts PDF file only";
  },
  imageRestriction(rejectedEntries) {
    // Notify plugin needs to be installed
    // https://quasar.dev/quasar-plugins/notify#Installation
    Notify.create({
      type: "negative",
      message: `${rejectedEntries.length} Images does not pass on validation`,
    });
  },
  filterSelect(val, update, options) {
    if (val === "") {
      update(() => {
        options.value = stringOptions;

        // here you have access to "ref" which
        // is the Vue reference of the QSelect
      });
      return;
    }
  },

  update() {
    const needle = val.toLowerCase();
    options.value = stringOptions.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  },
};
export default boot(({ app }) => {
  app.config.globalProperties.$rules = rules;
});

export { rules };
