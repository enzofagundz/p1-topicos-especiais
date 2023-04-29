$(document).ready(function () {
    //NAO APAGUE OS CÓDIGOS A SEGUIR    
    $('.fixed-action-btn').floatingActionButton();
    $('.sidenav').sidenav();

    //retorna apenas as 11 primeiras palavras do texto
    function cortarDescricao(frase){
        return frase.split(' ', 11).join(" ");
    }

    //SEU CÓDIGO DAQUI PRA BAIXO (:

    $(".btn-floating i").click(function () {  
        let botaoClicado = $(this).attr("data-content");
        if (botaoClicado != undefined) {
            if (botaoClicado == "cadastro") {
                $("#lista").addClass("hide");
                $("#edicao").addClass("hide");
                $("#cadastro").removeClass("hide");
                let cidade = $("#cidade");
                let descricao = $("#descricao");
                let fotoURL = $("#foto");
                cidade.val('');
                descricao.val('');
                fotoURL.val('');        
            } else {
                $("#edicao").addClass("hide");
                $("#lista").removeClass("hide");
                $("#cadastro").addClass("hide");
            }
        }
    });
    
    let ultimoID = 0;

    $("#btn-cadastrar").click(function () { 
        let nomeCidade = $("#cidade").val();
        let descricaoCidade = $("#descricao").val();
        let fotoURL = $("#foto").val();
        let novoID = ultimoID + 1;
        ultimoID = novoID;
        if (nomeCidade == '' || descricaoCidade == '' || fotoURL == '') {
            alert("Os campos nao podem estar vazios");
            return false;
        } else {
            $("#cadastro").addClass("hide");
            $("#lista").removeClass("hide");
        }
        //let definirID = $("#lista-cidades").length;
        let card = `
        <div class="col s12 m6 l4">
        <div class="card">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" src="${fotoURL}">
        </div>
        <div class="card-content">
          <span class="card-title activator grey-text text-darken-4">#${novoID} - ${nomeCidade}<i
              class="material-icons right">more_vert</i></span>
          <p>${cortarDescricao(descricaoCidade)}...</p>
          <hr>
          <div class="btn-actions">
            <i class="material-icons btn-editar">edit</i>
            <i class="material-icons btn-delete">delete</i>
          </div>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">${nomeCidade}</span>
          <p>${descricaoCidade}</p>
        </div>
      </div>
      </div>`;
        $("#lista-cidades").append(card);
    });
    
    $("#lista-cidades").on("click", ".btn-actions i", function(){

        let $botaoClicado = $(this);

        let $spanIdCidade = $botaoClicado.closest('.card').find('.card-content .card-title').text().split((' ')[0]);
        let nomeCidade = $botaoClicado.closest('.card').find('.card-reveal .card-title').text();
        let descricaoCidade = $botaoClicado.closest('.card').find('.card-reveal p').text();
        let idCidade = $spanIdCidade[0].replace('#', '');
        let fotoURL = $botaoClicado.closest('.card').find('.card-image img').attr('src');

        if ($botaoClicado.hasClass("btn-editar")) {
            $("#edicao").removeClass("hide");
            $("#lista").addClass("hide");
            $("#cadastro").addClass("hide");

            $("#id").val(idCidade);
            $("#cidadeEdicao").val(nomeCidade);
            $("#descricaoEdicao").val(descricaoCidade);
            $("#fotoEdicao").val(fotoURL);

            $("#btn-editar").click(function () {
                let nomeCidade = $("#cidadeEdicao").val();
                let descricaoCidade = $("#descricaoEdicao").val();
                let fotoURL = $("#fotoEdicao").val();
                let idCidade = $("#id").val();

                $botaoClicado.closest('.card').find('.card-reveal .card-title').text(nomeCidade);
                $botaoClicado.closest('.card').find('.card-reveal p').text(descricaoCidade);
                $botaoClicado.closest('.card').find('.card-image img').attr('src', fotoURL);
                $botaoClicado.closest('.card').find('.card-content .card-title').text(`#${idCidade} - ${nomeCidade}`);

                $("#edicao").addClass("hide");
                $("#lista").removeClass("hide");
                $("#cadastro").addClass("hide");
            });
        } else {
            $botaoClicado.closest('.col').remove(); //antes era .card
        };
    });

    //Pesquisa o nome da cidade contendo o texto digitado no input, independente de ser identico ou não, encontrando inclusive partes do nome da cidade

    $("#pesquisar").keyup(function () {
        let pesquisa = $(this).val().toLowerCase();
        $("#lista-cidades .card").filter(function () {
            let cidade = $(this).find(".card-title").text().toLowerCase();
            return cidade.indexOf(pesquisa) > -1;
        }).parent().show();
        $("#lista-cidades .card").filter(function () {
            let cidade = $(this).find(".card-title").text().toLowerCase();
            return cidade.indexOf(pesquisa) === -1;
        }).parent().hide();
    });
    
});