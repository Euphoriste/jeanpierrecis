$(document).ready(function () {
  const correctPassword = "RonaldinhoBruxo";

  $("#submit-btn").on("click", checkPassword);
  

  $("#password-input").on("keypress", function (e) {
    if (e.which === 13) {
      checkPassword();
    }
  });

  function checkPassword() {
    const enteredPassword = $("#password-input").val();

    if (enteredPassword === correctPassword) {
      $("#login-screen").fadeOut(500, function () {
        $("#hello-screen").fadeIn(500);
      });
    } else {
      $("#error-message")
        .text("ACCESS DENIED")
        .fadeIn()
        .delay(1500)
        .fadeOut();

      $("#password-input").val("");
    }
  }
});

