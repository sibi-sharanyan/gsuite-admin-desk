import Controller from "@ember/controller";
import EmberObject, { computed, observer } from "@ember/object";

export default Controller.extend({
  cred: Ember.inject.service("cred"),
  name: null,
  email: null,
  password: null,
  fname: null,
  passchange: false,
  rand: false,
  samename: false,
  typenow: true,
  blank: false,
  updateuser: false,
  actions: {
    rand() {
      $("#passbox").hide();
      this.set("password", "rand");
      this.set("rand", true);
      this.set("samename", false);
      this.set("typenow", false);
      this.set("blank", false);
    },
    samename() {
      $("#passbox").hide();
      this.set("password", this.get("name"));
      this.set("rand", false);
      this.set("samename", true);
      this.set("typenow", false);
      this.set("blank", false);
    },
    typenow() {
      $("#passbox").show();
      this.set("rand", false);
      this.set("samename", false);
      this.set("typenow", true);
      this.set("blank", false);
    },
    blank() {
      $("#passbox").hide();
      this.set("password", "");
      this.set("rand", false);
      this.set("samename", false);
      this.set("typenow", false);
      this.set("blank", true);
    },
    checkboxact() {
      if (this.get("passchange") == false) {
        this.set("passchange", true);
      } else {
        this.set("passchange", false);
      }
    },
    myinit() {
      if (this.get("cred").nameToUpdate != null) {
        this.set("upuser", this.get("cred").nameToUpdate.id);
        this.set("name", this.get("cred").nameToUpdate.name.givenName);
        this.set("fname", this.get("cred").nameToUpdate.name.familyName);
        this.set("email", this.get("cred").nameToUpdate.primaryEmail);
        this.set("updateuser", true);
      }
      //this.get("cred").setnameToUpdate(null);
    },
    cancelupdate() {
      this.get("cred").setnameToUpdate(null);
      this.set("updateuser", false);
      this.set("upuser", null);
      this.set("name", null);
      this.set("fname", null);
      this.set("email", null);
    }
  }
});
