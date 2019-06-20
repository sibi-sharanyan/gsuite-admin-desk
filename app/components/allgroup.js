import Component from "@ember/component";
export default Component.extend({
  cred: Ember.inject.service("cred"),
  router: Ember.inject.service("router"),
  init() {
    this._super(...arguments);

    var token = this.get("cred").mytoken;
    $.ajax({
      url: "/processapp/getgroups?token=" + this.get("cred").mytoken,
      type: "GET"
    }).then(data => {
      this.set("groups", data.groups);
    });
  },
  actions: {
    setgroupuser(id, name) {
      this.get("cred").setgroupuser(id, name);
      this.get("router").transitionTo("alluser");
    }
  }
});
