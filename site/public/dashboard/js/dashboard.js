// TESTE PARA GRÁFICOS
/*
    const labels_downtimes = [
        '30/10',
        '01/11',
        '02/11',
        '03/11',
        '04/11',
        '05/11',
        '06/11',
        ]
    
        const data_downtimes = {
        labels: labels_downtimes,
        datasets: [{
            label: 'Total de sessões',
            backgroundColor: '#142E38',
            borderColor: '#142E38',
            data: [2, 4, 6, 2, 1, 4, 2],
        }]
        };
    
        const config_downtimes = {
        type: 'bar',
        data: data_downtimes,
        options: {
            scales: {
            y: {
                ticks: {
                color: '#FFF'
                },
                beginAtZero: true,
                type: 'linear',
                grid: {
                color: '#FFF'
                }
            },
            x: {
                ticks: {
                color: '#FFF'
                }
            }
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
            title: {
                display: true,
                text: 'Total de sessões realizadas diaramente por semana',
                align: "start",
                color: '#FFF',
                font: {
                size: 20,
                weight: 600,
                lineHeight: 1.0,
                }
            }
            },
        },
        };
    
        const myChart_downtime = new Chart(
        document.getElementById('myChart'),
        config_downtimes
        );
    
        // 2º GRÁFICO P/ TESTE
        const labels_downtimes2 = [
        '30/10',
        '01/11',
        '02/11',
        '03/11',
        '04/11',
        '05/11',
        '06/11',
        ]
    
        const data_downtimes2 = {
        labels: labels_downtimes2,
        datasets: [{
            label: 'Total da duração de sessões (min)',
            backgroundColor: '#142E38',
            borderColor: '#142E38',
            data: [20, 40, 120, 60, 38, 42, 25],
        }]
        };
    
        const config_downtimes2 = {
        type: 'bar',
        data: data_downtimes2,
        options: {
            scales: {
            y: {
                ticks: {
                color: '#FFF'
                },
                beginAtZero: true,
                type: 'linear',
                grid: {
                color: '#FFF'
                }
            },
            x: {
                ticks: {
                color: '#FFF'
                }
            }
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
            title: {
                display: true,
                text: 'Duração diária das sessões por semana',
                align: "start",
                color: '#FFF',
                font: {
                size: 20,
                weight: 600,
                lineHeight: 1.0,
                }
            }
            },
        },
        };
    
        const myChart_downtime2 = new Chart(
        document.getElementById('myChart2'),
        config_downtimes2
        );
    */
    
var idUsuarioDash = sessionStorage.ID_USUARIO;
console.log(idUsuarioDash);

b_usuario.innerHTML = sessionStorage.NOME_USUARIO;
b_usuarioDropDown.innerHTML = sessionStorage.NOME_USUARIO;

let proximaAtualizacao;
    
window.onload = obterDadosGrafico(idUsuarioDash);

// Luiz => A OPÇÃO DE DROP DOWN DO MENU DIREITO FICA QUEBRADA QUANDO O COMANDO ABAIXO ESTÁ SEM COMENTÁRIO 
// verificar_autenticacao(); 

// Função para criar navbar dropdown
var subMenu = document.getElementById("subMenu")

function alternarMenu() {
    subMenu.classList.toggle("open-menu")
}


function alterarTitulo(idUsuarioDash) {
    var tituloDash = document.getElementById("tituloDash")
    tituloDash.innerHTML = "Sua métricas atualizadas!"
}

// O gráfico é construído com três funções:
// 1. obterDadosGrafico -> Traz dados do Banco de Dados para montar o gráfico da primeira vez
// 2. plotarGrafico -> Monta o gráfico com os dados trazidos e exibe em tela
// 3. atualizarGrafico -> Atualiza o gráfico, trazendo novamente dados do Banco

// Esta função *obterDadosGrafico* busca os últimos dados inseridos em tabela de medidas.
// para, quando carregar o gráfico da primeira vez, já trazer com vários dados.
// A função *obterDadosGrafico* também invoca a função *plotarGrafico*

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
    // Luiz =>  'SELECTS' AJUSTADOS NA medidaModel.js
function obterDadosGrafico(idUsuarioDash) {
    console.log(`O ID É ===> ${idUsuarioDash}`);
    
    alterarTitulo(idUsuarioDash)

    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    fetch(`/medidas/ultimas/${idUsuarioDash}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGrafico(resposta, idUsuarioDash);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

// Esta função *plotarGrafico* usa os dados capturados na função anterior para criar o gráfico
// Configura o gráfico (cores, tipo, etc), materializa-o na página e, 
// A função *plotarGrafico* também invoca a função *atualizarGrafico*
function plotarGrafico(resposta, idUsuarioDash) {
    console.log('iniciando plotagem do gráfico...');

    // Chart.js - 1º Gráfico - Relatório de sessões por semana 
    // Criando estrutura para plotar gráfico - labels
    let labels = [];
    
    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Duração das sessões',
            data: [],
            backgroundColor: '#142E38',
            borderColor: '#142E38',
            tension: 0.1
        }]
    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.momento_grafico);
        dados.datasets[0].data.push(registro.duracao);
    }
    
    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')
    
    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'bar',
        data: dados,
        options: {
            scales: {
            y: {
                ticks: {
                color: '#FFF'
                },
                beginAtZero: true,
                type: 'linear',
                grid: {
                color: '#FFF'
                }
            },
            x: {
                ticks: {
                color: '#FFF'
                }
            }
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
            title: {
                display: true,
                text: 'Duração diária das sessões por semana',
                align: "start",
                color: '#FFF',
                font: {
                size: 20,
                weight: 600,
                lineHeight: 1.0,
                }
            }
            },
        },
    };

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

    setTimeout(() => atualizarGrafico(idUsuarioDash, dados, myChart), 10000);
}


// Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
// buscando a última medida inserida em tabela contendo as capturas, 

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function atualizarGrafico(idUsuarioDash, dados, myChart) {

    fetch(`/medidas/tempo-real/${idUsuarioDash}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dados);

                document.getElementById("avisoCaptura").innerHTML = ""

                if (novoRegistro[0].momento_grafico == dados.labels[dados.labels.length - 1]) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                    document.getElementById("avisoCaptura").innerHTML = "Estes são os dados mais recentes do seu histórico de sessão. <br> Continue sua jornada pelo mindfulness e, assim, os gráficos atualizarão!"
                    console.log("Horário do novo dado capturado:")
                    console.log(novoRegistro[0].momento_grafico)
                    console.log("Horário do último dado capturado:")
                    console.log(dados.labels[dados.labels.length - 1])
                    console.log("---------------------------------------------------------------")
                } else {
                    // tirando e colocando valores no gráfico
                    dados.labels.shift(); // apagar o primeiro
                    dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento

                    dados.datasets[0].data.shift();  // apagar o primeiro dado da duração das sessões por dia 
                    dados.datasets[0].data.push(novoRegistro[0].duracao); // incluir uma nova medida da duração das sessões por dia


                    myChart.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGrafico(idUsuarioDash, dados, myChart), 10000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGrafico(idUsuarioDash, dados, myChart), 10000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}