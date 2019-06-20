import Route from "@ember/routing/route";

export default Route.extend({
  actions: {
    nextpage() {
      this.transitionTo("createuser.contact");
    },
    didTransition() {
      this.controllerFor("createuser.general").send("myinit");
    }
  }
});
