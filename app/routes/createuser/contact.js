import Route from "@ember/routing/route";

export default Route.extend({
  actions: {
    nextpage() {
      this.transitionTo("createuser.organization");
    },
    prevpage() {
      this.transitionTo("createuser.general");
    }
  }
});
