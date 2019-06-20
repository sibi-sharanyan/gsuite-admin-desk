import Service from "@ember/service";
import config from "../config/environment";
export default Service.extend({
  name: null,
  nameToUpdate: null,
  init() {
    this._super(...arguments);
    this.set("mytoken", "noval");
    this.set("groupuser", "none");
    this.set("groupname", "No Group Selected");
  },
  setToken(token) {
    this.set("mytoken", token);
  },
  login() {
    window.open("http://localhost:8080/processapp/authapp");
    var timer = setInterval(checkChild, 500);

    function checkChild() {
      if (child.closed) {
        alert("Child window closed");
        clearInterval(timer);
      }
    }
  },
  setgroupuser(id, name) {
    this.set("groupuser", id);

    this.set("groupname", name);
  },
  resetgroup() {
    this.set("groupname", "No Group Selected");
    this.set("groupuser", "none");
  },
  setnameToUpdate(namedata) {
    this.set("nameToUpdate", namedata);
  }
});
