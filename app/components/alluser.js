import Component from "@ember/component";
export default Component.extend({
  cred: Ember.inject.service("cred"),
  router: Ember.inject.service("router"),
  upuser: null,
  init() {
    this._super(...arguments);
    this.set("groupname", this.get("cred").groupname);
    var token = this.get("cred").mytoken;
    if (this.get("cred").groupuser == "none") {
      $.ajax({
        url: "/processapp/getusers?token=" + this.get("cred").mytoken,
        type: "GET"
      }).then(data => {
        this.set("users", data.users);
      });
    } else {
      $.ajax({
        url:
          "/processapp/getgroupusers?token=" +
          this.get("cred").mytoken +
          "&groupid=" +
          this.get("cred").groupuser,
        type: "GET"
      }).then(data => {
        this.set("userids", data.members);

        $.ajax({
          url: "/processapp/getusers?token=" + this.get("cred").mytoken
        }).then(data => {
          var groupusers = [];
          for (var i = 0; i < this.get("userids").length; i++) {
            for (var j = 0; j < data.users.length; j++) {
              if (this.get("userids")[i].id == data.users[j].id) {
                groupusers.push(data.users[j]);
                // alert("works");
              }
            }
          }
          this.set("users", groupusers);
        });
      });
    }
  },
  actions: {
    changepass(userid) {
      var pass = prompt("Enter New Password");
      $.ajax({
        url:
          "/processapp/changepass?token=" +
          this.get("cred").mytoken +
          "&userid=" +
          userid +
          "&password=" +
          pass,
        type: "GET"
      }).then(data => {
        if (data.code == "200") {
          swal("Done!", "Password Changed Successfully!", "success");
        } else {
          swal("Error!", "Error! Please enter A valid Password!", "error");
        }
      });
    },
    resetgroup() {
      this.get("cred").resetgroup();
      this.set("groupname", this.get("cred").groupname);
      $.ajax({
        url: "/processapp/getusers?token=" + this.get("cred").mytoken,
        type: "GET"
      }).then(data => {
        this.set("users", data.users);
      });
    },
    deleteuser(userid) {
      $.ajax({
        url:
          "/processapp/deleteuser?token=" +
          this.get("cred").mytoken +
          "&userid=" +
          userid,
        type: "GET"
      }).then(data => {
        if (data.code == "204") {
          let nameToRemove = this.get("users").findBy("id", userid);

          this.get("users").removeObject(nameToRemove);

          swal("Done!", "User Deleted!", "success");
        } else {
          swal("Error!", "The User cannot be deleted!", "error");
        }
      });
    },
    updateuser(userid) {
      let nameToUpdate = this.get("users").findBy("id", userid);
      this.set("upuser", nameToUpdate);
      this.get("cred").setnameToUpdate(this.get("upuser"));
      this.get("router").transitionTo("createuser.general");
    },
    suspend(id) {
      var status = $("#" + id).text();

      if (status == "Activate") {
        status = "true";
      } else {
        status = "false";
      }

      $.ajax(
        "/processapp/suspend?&token=" +
          this.get("cred").mytoken +
          "&userid=" +
          id +
          "&status=" +
          status
      ).then(data => {
        if (data.code == "200") {
          // this.get("users").findBy("id", id).suspended = !status;

          if (status == "false") {
            swal("Done!", "The user account has been Suspended", "success");
            $("#" + id).text("Activate");
          } else {
            swal("Done!", "The user account has been Activated", "success");
            $("#" + id).text("Suspend");
          }
        } else {
          swal(
            "Error!",
            "Something went wrong! Please try again later",
            "error"
          );
        }
      });
    }
  }
});
