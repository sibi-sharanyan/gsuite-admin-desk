import Controller from "@ember/controller";

export default Controller.extend({
  cred: Ember.inject.service("cred"),
  general: Ember.inject.controller("createuser.general"),
  contact: Ember.inject.controller("createuser.contact"),
  orgname: null,
  workTitle: null,
  description: null,
  orglocation: null,
  orgdomain: null,
  opt: "gsuite",

  actions: {
    setdb() {
      this.set("opt", "db");
    },
    setgsuite() {
      this.set("opt", "gsuite");
    },
    submitval() {
      var name = this.get("general").name;
      var email = this.get("general").email;
      var password = this.get("general").password;
      var fname = this.get("general").fname;
      var passchange = this.get("general").passchange;
      var streetAddress = this.get("contact").streetAdress;
      var locality = this.get("contact").locality;
      var region = this.get("contact").region;
      var postalcode = this.get("contact").postalcode;
      var phoneno = this.get("contact").phoneno;
      var orgname = this.get("orgname");
      var workTitle = this.get("workTitle");
      var description = this.get("description");
      var orglocation = this.get("orglocation");
      var orgdomain = this.get("orgdomain");
      var dbopt = this.get("opt");
      $.ajax(
        "/processapp/createuser?name=" +
          name +
          "&email=" +
          email +
          "&password=" +
          password +
          "&fname=" +
          fname +
          "&passchange=" +
          passchange +
          "&streetAddress=" +
          streetAddress +
          "&locality=" +
          locality +
          "&region=" +
          region +
          "&postalcode=" +
          postalcode +
          "&phoneno=" +
          phoneno +
          "&orgname=" +
          orgname +
          "&worktitle=" +
          workTitle +
          "&description=" +
          description +
          "&orglocation=" +
          orglocation +
          "&orgdomain=" +
          orgdomain +
          "&dbopt" +
          dbopt +
          "&token=" +
          this.get("cred").mytoken
      ).then(data => {
        if (data.code == "200") {
          swal("Done!", "User Created Successfully", "success");
        } else {
          swal("Err!", "The User Could Not be created", "error");
        }
      });
    },
    myinit() {
      // alert("works");
      var nameToUpdate = this.get("cred").nameToUpdate;
      this.set("upuser", nameToUpdate);
    },
    updaterec() {
      var name = this.get("general").name;
      var email = this.get("general").email;
      var password = this.get("general").password;
      var fname = this.get("general").fname;
      var passchange = this.get("general").passchange;
      var streetAddress = this.get("contact").streetAdress;
      var locality = this.get("contact").locality;
      var region = this.get("contact").region;
      var postalcode = this.get("contact").postalcode;
      var phoneno = this.get("contact").phoneno;
      var orgname = this.get("orgname");
      var workTitle = this.get("workTitle");
      var description = this.get("description");
      var orglocation = this.get("orglocation");
      var orgdomain = this.get("orgdomain");
      var dbopt = this.get("opt");
      $.ajax(
        "/processapp/updateuser?name=" +
          name +
          "&email=" +
          email +
          "&password=" +
          password +
          "&fname=" +
          fname +
          "&passchange=" +
          passchange +
          "&streetAddress=" +
          streetAddress +
          "&locality=" +
          locality +
          "&region=" +
          region +
          "&postalcode=" +
          postalcode +
          "&phoneno=" +
          phoneno +
          "&orgname=" +
          orgname +
          "&worktitle=" +
          workTitle +
          "&description=" +
          description +
          "&orglocation=" +
          orglocation +
          "&orgdomain=" +
          orgdomain +
          "&dbopt" +
          dbopt +
          "&token=" +
          this.get("cred").mytoken +
          "&userid=" +
          this.get("cred").nameToUpdate.id
      ).then(data => {
        if (data.code == "200") {
          this.get("cred").setnameToUpdate(null);
          swal("Done!", "User Created Successfully", "success");
        } else {
          swal("Err!", "The User Could Not be created", "error");
        }
      });
    }
  }
});
