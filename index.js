
var coll = document.getElementsByClassName("atividade-título");
var i;
console.log(coll)

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
 } 

function onlyOne(checkbox) {
    const checkboxes = document.getElementsByClassName("atividade-título");
    console.log(checkboxes);
    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });
    console.log(test)
  }

