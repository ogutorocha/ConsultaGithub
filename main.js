document.addEventListener("keyup", function (event) {
  if (document.getElementById("user").value != "") {
    if (event.key === "Enter") {
      document.getElementById("notf").style.setProperty("display", "none");
      procuraGit();
      buscaRep();
      limpaInput();
    }
  } else {
    document.getElementById("notf").style.setProperty("display", "block");
    
  }
});

function procuraGit() {
  
  let user = document.getElementById("user").value;
  let urlinfo = `https://api.github.com/users/${user}`;

  document.getElementById("box").style.setProperty("display", "block");
  document.getElementById("notfound").style.setProperty("display", "none");

  fetch(urlinfo)
    .then(function (response) {

      if (response.ok) {
        
        return response.json()
      } else if(response.status === 404) {
        document.getElementById("box").style.setProperty("display", "none");
        document.getElementById("notfound").style.setProperty("display", "block");
      }
    })
    .then(function (data) {
      let infonome = document.getElementById("name");
      let infologin = document.getElementById("login");
      let infoloc = document.getElementById("location");
      let infopic = document.getElementById("photo");
      
      infonome.innerHTML = data.name;
      infologin.innerHTML = `Usuário: ${data.login}`;
      infoloc.innerHTML = `Localização: ${data.location}`;
      infopic.innerHTML = `<img src="${data.avatar_url}" width="250px">`;
    });
}

function buscaRep() {
  document.getElementById("box").style.setProperty("display", "block");
  let user = document.getElementById("user").value;
  let urlrepo = `https://api.github.com/users/${user}/repos`;

  fetch(urlrepo)
    .then(function (response) {
      return response.json();
    })

    .then(function (data2) {
      limpaRepo();
      let repos = document.getElementById("repo");

      for (i = 0; i < data2.length; i++) {
        repos.innerHTML += `<a id="link${i}" href="${data2[i].html_url}" target="_blank">${data2[i].name}</a> `;
      }
    });
}

function limpaInput() {
  document.getElementById("user").value = "";
}

function limpaRepo() {
  document.getElementById("repo").innerHTML = ``;
  
  
}
