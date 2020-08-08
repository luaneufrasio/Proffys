//procurar o botão
document.querySelector("#add-time").addEventListener("click", cloneField);

//quando clicar no botão

//Executar uma ação
function cloneField() {
  //duplicar os campos
  const newFieldContainer = document.querySelector(".schedule-item").cloneNode(true);

  //limpar os campos. Que campos ?
  const fields = newFieldContainer.querySelectorAll('input')

    //para cada campo,limpar
  fields.forEach(function(field) {
    field.value
  })

  //colocar na pagina
  document.querySelector("#schedule-items").appendChild(newFieldContainer);
}
