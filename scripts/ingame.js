var socket = io();
var scores_global;
var localstorage = window.localStorage;

window.onload = function () {
  document.getElementById("teamA").innerHTML = localstorage.getItem("teamA");
  document.getElementById("teamB").innerHTML = localstorage.getItem("teamB");
  document.getElementById("teamA_score").innerHTML =
    localstorage.getItem("teamA_score");
  document.getElementById("teamB_score").innerHTML =
    localstorage.getItem("teamB_score");
};

socket.on("teams", async function (names, scores) {
  scores_global = scores;
  document.getElementById("teamA").innerHTML = names.teamA;
  document.getElementById("teamB").innerHTML = names.teamB;

  var lastScoreA = document.getElementById("teamA_score").innerHTML;
  var lastScoreB = document.getElementById("teamB_score").innerHTML;
  if (lastScoreA != scores.teamA) {
    var change = scores.teamA - lastScoreA;
    animate("A", change);
  } else if (lastScoreB != scores.teamB) {
    var change = parseInt(scores.teamB) - parseInt(lastScoreB);
    animate("B", change);
  }

  localstorage.setItem("teamA", names.teamA);
  localstorage.setItem("teamB", names.teamB);
  localstorage.setItem("teamA_score", scores.teamA);
  localstorage.setItem("teamB_score", scores.teamB);
});
function animate(team, change) {
  if (team === "A") {
    var overlay = document.getElementById("overlayA");
  } else if (team === "B") {
    var overlay = document.getElementById("overlayB");
  }
  var tl = anime.timeline({
    targets: overlay,
    easing: "easeInOutExpo",
    duration: 800,
  });
  tl.add({
    innerHTML: change,
    round: 1,
    duration: 100,
  })
  tl.add({
    height: "106px",
    opacity: 1,
  });
  if (team === "A") {
    tl.add({
      targets: "#teamA_score",
      round: 1,
      innerHTML: scores_global.teamA,
      duration: 100,
    });
  } else {
    tl.add({
      targets: "#teamB_score",
      round: 1,
      innerHTML: scores_global.teamB,
      duration: 100,
    });
  }
  tl.add({
    height: 0,
    opacity: 0,
    duration: 800,
  });
}

socket.on("clear", () => {
  localstorage.clear();
  localstorage.setItem("teamA_score", 0);
  localstorage.setItem("teamB_score", 0);
  location.reload();
});
