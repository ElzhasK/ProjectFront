const signInBtn = document.querySelector(".signin-btn");
const signUpBtn = document.querySelector(".signup-btn");
const formbox = document.querySelector(".form-box");

signUpBtn.addEventListener("click", function () {
  formbox.classList.add("active");
});

signInBtn.addEventListener("click", function () {
  formbox.classList.remove("active");
});

let a;
let b;

function check(i1, i2, i3) {
  a = $("#f1").val();
  b = $("#f2").val();
  if (a != b) {
    $("#f1").css("border", "solid 2px red");
    $("#f2").css("border", "solid 2px red");
  }
  if (a == "") {
    $("#f1").css("border", "solid 2px red");
  }
  if (b == "") {
    $("#f2").css("border", "solid 2px red");
  }

  var c1 = $("#a1").val();
  if (c1 != "" && !c1.includes("@")) {
    $("#a1").css("border", "solid 2px red");
    alert("Should have - @ ");
  }
  var c2 = $("#a2").val();
  if (c1 == "") {
    $("#a1").css("border", "solid 2px red");
  }
  if (c2 == "") {
    $("#a2").css("border", "solid 2px red");
  }
  ee = $("#123").val();

  if (ee == "") {
    $("#123").css("border", "solid 2px red");
  }

  var tr = $("#1234").val();
  if (tr == "") {
    $("#1234").css("border", "solid 2px red");
  }

  if (a == b && a != "" && b != "" && c1 != "" && c2 != "") {
    reg_php(i1, i2, i3);
  } else {
    setTimeout(nameNull, 2000);
  }
}

function yspewno() {
  $("#f11").css("display", "none");
  $(".zareg").css("display", "flex");
  $(".zareg").css("text-align", "center");
  $(".zareg").css("margin-left", "70px");
}

let q;
let w;
function opend(uname, pass) {
  q = $("#em").val();
  w = $("#par").val();
  if (q == "") {
    $("#em").css("border", "solid 2px red");
  } else if (w == "") {
    $("#par").css("border", "solid 2px red");
  } else if (q == "") {
    $("#em").css("border", "solid 2px red");
  } else if (!q.includes("@")) {
    $("#em").css("border", "solid 2px red");
  } else if (true) {
    log_php(uname, pass);
  } else {
    alert(
      "Пользователя не существует, проверьте правильность написанных данных"
    );
  }
}

function vhodvyp() {
  $("#f22").css("display", "none");
  $(".vhod").css("display", "flex");
  $(".vhod").css("margin-left", "70px");
  setTimeout(open, 3000);
}

function cl() {
  $(".zareg").css("display", "none");
}
var user = "";
function nameNull() {
  $("#f1").css("border", "solid 1px black");
  $("#f2").css("border", "solid 1px black");
  $("#a1").css("border", "solid 1px black");
  $("#a2").css("border", "solid 1px black");
  $("#123").css("border", "solid 1px black");
}
function log_php(uname, pass) {
  $.ajax({
    url: "login.php",
    type: "POST",
    data: { username: uname, password: pass },
    success: function (result) {
      console.log(result);
      if (result == "Logged IN!") {
        vhodvyp();
      } else alert("Wrong input");
    },
    error: function () {
      console.log("error");
    },
  });
}

function reg_php(uname, pass, pass_again) {
  if (pass == pass_again) {
    $.ajax({
      url: "register.php",
      type: "POST",
      data: { username: uname, password: pass },
      success: function (result) {
        console.log(result);
        if (result == "Success!") yspewno();
        else alert("Wrong input");
      },
      error: function () {
        console.log("error");
      },
    });
  } else {
    alert("different password inputs!");
  }
}
