var socket = io();
var scores = document.getElementById("table");
var localstorage = window.localStorage;

window.onload = function () {
  document.getElementById("teamA").innerHTML = localstorage.getItem("teamA");
  document.getElementById("teamB").innerHTML = localstorage.getItem("teamB");
  document.getElementById("teamA_score").innerHTML =
    localstorage.getItem("teamA_score");
  document.getElementById("teamB_score").innerHTML =
    localstorage.getItem("teamB_score");
};

socket.on("teams", function (names, scores) {
  document.getElementById("teamA").innerHTML = names.teamA;
  document.getElementById("teamB").innerHTML = names.teamB;

  document.getElementById("teamA_score").innerHTML = scores.teamA;
  document.getElementById("teamB_score").innerHTML = scores.teamB;

  localstorage.setItem("teamA", names.teamA);
  localstorage.setItem("teamB", names.teamB);
  localstorage.setItem("teamA_score", scores.teamA);
  localstorage.setItem("teamB_score", scores.teamB);

  animate();
});

function animate() {
  anime({
    targets: document.getElementById("teamA_score"),
    translateX: 0,
    rotate: "1turn",
    duration: 800,
  });
}

socket.on("clear", () => {
  localstorage.clear();
  location.reload();
});
