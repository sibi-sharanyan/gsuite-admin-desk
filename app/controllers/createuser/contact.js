import Controller from "@ember/controller";

export default Controller.extend({
  cred: Ember.inject.service("cred"),
  streetAdress: null,
  locality: null,
  region: null,
  postalCode: null,
  phoneno: null
});
