import Route from "@ember/routing/route";

export default Route.extend({
  actions: {
    prevpage() {
      this.transitionTo("createuser.contact");
    },
    didTransition() {
      this.controllerFor("createuser.organization").send("myinit");
    }
  }
});
