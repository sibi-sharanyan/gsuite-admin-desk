import Controller from "@ember/controller";
import config from "../config/environment";

export default Controller.extend({
  cred: Ember.inject.service("cred"),

  init() {
    $.ajax("/processapp/gettoken").then(data => {
      this.get("cred").setToken(data.access_token);
      if (this.get("cred").mytoken != "noval") this.set("loggedin", "true");
    });
  },

  actions: {
    login() {
      let child = window.open(
        "http://localhost:8080/processapp/authapp",
        "popUpWindow",
        "width=400 , height=400"
      );
      var timer = setInterval(checkChild, 500);
      var self = this;
      function checkChild() {
        if (child.closed) {
          $.ajax("/processapp/gettoken").then(data => {
            self.get("cred").setToken(data.access_token);
            if (self.get("cred").mytoken != "noval")
              self.set("loggedin", "true");
          });
          clearInterval(timer);
        }
      }
    },
    logout() {
      this.get("cred").setToken("noval");
      this.set("loggedin", false);
      $.ajax("/processapp/deltoken");
    }
  }
});
