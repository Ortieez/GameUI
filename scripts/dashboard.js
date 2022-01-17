var socket = io();
var localstorage = window.localStorage;

window.onload = async function () {
  document.getElementById("teamA").value = localstorage.getItem("teamA");
  document.getElementById("teamB").value = localstorage.getItem("teamB");
  if (localstorage.getItem("scoreA") === null || localstorage.getItem("scoreB") === null) {
    return
  } else {
    document.getElementById("scoreA").innerHTML = localstorage.getItem("scoreA");
    document.getElementById("scoreB").innerHTML = localstorage.getItem("scoreB");
  }
};

async function submit() {
  var form = document.getElementById("dashboard").elements;
  var names = {
    teamA: form["teamA"].value,
    teamB: form["teamB"].value,
  };

  var scores = {
    teamA: parseInt(document.getElementById("scoreA").innerHTML),
    teamB: parseInt(document.getElementById("scoreB").innerHTML),
  };

  console.log(names);
  if (names.first_team === "" || names.second_team === "") {
    alert("Please enter a team name");
  } else {
    await socket.emit("teams", names, scores);
    if (scores.teamA === null || scores.teamB === null) {
      localstorage.setItem("teamA", names.teamA);
      localstorage.setItem("teamB", names.teamB);
      localstorage.setItem("scoreA", 0);
      localstorage.setItem("scoreB", 0);
    } else {
      localstorage.setItem("teamA", names.teamA);
      localstorage.setItem("teamB", names.teamB);
      localstorage.setItem("scoreA", scores.teamA);
      localstorage.setItem("scoreB", scores.teamB);
    }
  }
}

function plus(num, id) {
  var span = document.getElementById("score" + id);
  var score = parseInt(span.innerHTML);

  score = score + num;
  span.innerHTML = score;
}

async function clearInfo() {
  await socket.emit("clear");
  localstorage.clear();
  location.reload(true);
}
