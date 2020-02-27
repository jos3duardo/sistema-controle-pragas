document.addEventListener('DOMContentLoaded', function() {

  //elemento collapseble
  var elems = document.querySelectorAll('.collapsible');
  var instances = M.Collapsible.init(elems);

  //consumindo os dados
  axios({
    method: 'get',
    url: 'http://www.mocky.io/v2/5e56eb9230000046d228eae4',
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  })
  .then(response => {
    montaTabela(response.data)
  })
  .catch(error => {
    console.log(error)
  })

  //criando html
  function montaTabela(data) {
    console.log(data)
    let area = 250;
    let percentual = 0.3;
    let lista = ''

    data.forEach(function (praga) {
      let cor = ((praga.quantity / area) * 100) > 30 ? 'red-text' : 'black-text'
      lista += "<li>"+
        "<div class='collapsible-header'><i class='material-icons "+cor+"'>bug_report</i>"+praga.name +"</div>"+
        "<div class='collapsible-body'><span>"+controle(praga.quantity, area)+"</span></div>"+
        "</li>"
    })
    let listaHTML = document.getElementById('dados')
    listaHTML.innerHTML = lista
  }

  //verificando propagação da praga
  function controle(quantidade, area) {
    let data = (quantidade / area) * 100
    return data > 30 ? "<b>" + data.toFixed(2) + "%</b> - A incidência dessa praga está <b>fora</b> do controle." : "<b>" + data.toFixed(2) + "%</b> - A incidência dessa praga está <b>dentro</b> do controle."
  }
});
