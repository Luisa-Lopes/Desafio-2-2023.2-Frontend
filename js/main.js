import { connectApi } from "./connectApi.js";

const dataUF = await connectApi.getUF() // Obtendo todos os estados e colocando em dataUF
const listUF = document.querySelector("#list-uf") // Seleciona o datalist do HTML

//O forEach separa cada elemento do dataUF
dataUF.forEach(element => {
    //Cria um elemento "option" para cada estado 
    let option = document.createElement('option');
    option.value = element.sigla; // Cada option recebe um estado 
    listUF.appendChild(option); //O datalist no HTML recebe um filho "option"
});

// Const que filtra a siglas 
const FilterData = (data) => {
    let array = [] //Cria um array vazio 

    data.forEach(element => array.push(element.sigla)) //Coloca a sigla no array

    return array; // Retorna o array com cada sigla
}

const input = document.getElementById("input-list-uf"); //Seleciona o input do html
const list = document.querySelector("#list-city"); // Seleciona a section com id list que receberá os municípios

// Adiciona um evento ao campo input.
// Esse evento acontece quando ao digitar algo ou modificar o conteúdo dentro desse campo de entrada, o evento "input" é acionado.
input.addEventListener("input", function () {
    let selectedValue = (input.value.toUpperCase()); //Seleciona o conteúdo do input

    const UF = FilterData(dataUF); // Nessa const tem todas a siglas dos estados

    //Se o conteúdo do input existir em UF, siga as instruções abaixo.
    if (UF.includes(selectedValue)) {

        //Pega os filhos do id "list" que tem a classe list-item.
        var listItem = document.getElementsByClassName("list-item");
        //Se estiver selecionado um estado e selecionar outro, cada listItem será sabre escrito.
        //Para evitar isso, se o tamanho de listItem for maior que zero, todos são apagados.
        if (listItem.length > 0) {
            while (listItem.length > 0) {
                list.removeChild(listItem[0])
            }
            list.classList.remove("md:grid-cols-4") //Removemos essa classe para que o loader funcione corretamente
        }

        let timer = 0;
        const divLoader = document.querySelector("#div-loader"); // selecionamos o loader

        divLoader.classList.remove('hidden'); // Removemos a o hidden -> display:none

        //Loader roda por 1 segundo
        let interval = setInterval(function () {

            if (timer >= 1) {
                clearInterval(interval); // Isso irá parar a execução após 1 segundos.
                divLoader.classList.add('hidden'); // Colocamos o hidden -> display:none
                createList(selectedValue); //Cria a lista
            }

            timer++;
        }, 1000);

    }

});

async function createList(selectedValue) {
    const dataCity = await connectApi.getCity(selectedValue); //dataCity obtém todos os municípios a partir do estado selecionado 

    list.classList.add("md:grid-cols-4") // Para que a lista tenha 4 colunas

    const numberCells = (Math.ceil(dataCity.length / 3) * 3) //Pego o número de células mais próximo de ser divisível por 3 colunas 

    let col = 0; //Irá indicar se a coluna é a do meio. Se for igual á 1 é a coluna do meio
    for (let j = 0; j < numberCells; j++) {
        const cell = document.createElement('li'); //Crio o elemento li

        let cellText
        //Se o j for maior que a quantidade de municípios 
        if (j < dataCity.length) {
            cellText = document.createTextNode(`${dataCity[j].nome}`); // Texto a ser adicionado no li
        }
        else {
            cellText = document.createTextNode(``);
        }
        //Adiciono uma classe a cada item da lista
        cell.setAttribute('class', `list-item py-3 flex h-auto min-h-[45px] text-center justify-center items-center border-l-[1px] border-[#FF731A] 
        ${col == 1 ? 'md:col-start-2 md:col-end-4' : ''} `); //Se col for igual um, essa célula terá um espaço maior

        cell.appendChild(cellText);

        list.appendChild(cell) // A lista adiciona um novo filho
        col++;
        if (col == 3) { col = 0; }
    }


}