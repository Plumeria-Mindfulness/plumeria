var idUsuarioDash = sessionStorage.ID_USUARIO;
console.log(idUsuarioDash);

b_usuario.innerHTML = sessionStorage.NOME_USUARIO;
b_usuarioDropDown.innerHTML = sessionStorage.NOME_USUARIO;

let proximaAtualizacao;
    
window.onload = obterDadosGrafico(idUsuarioDash);

// Função para criar navbar dropdown
var subMenu = document.getElementById("subMenu")

function alternarMenu() {
    subMenu.classList.toggle("open-menu")
}

function obterDadosGrafico(idUsuarioDash) {
    idUsuarioDash = sessionStorage.ID_USUARIO;

    console.log(`O ID É ===> ${idUsuarioDash}`);

    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    var medidasDash1 = []
    var somaMedidasDash1 = 0
    var largestMedidasDash1
    
    fetch(`/medidas/ultimas/${idUsuarioDash}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                for (var i = 0; i < resposta.length; i++) {
                    medidasDash1.push(Number(resposta[i].duracao))
                    somaMedidasDash1 += Number(resposta[i].duracao)
                }
                console.log(`APENAS AS DURAÇÕES: ${medidasDash1}`)
                console.log(`Somatória da duração da semana: ${somaMedidasDash1}`)
                

                largestMedidasDash1 = Math.max.apply(null, medidasDash1);
                console.log(`A maior duração foi: ${largestMedidasDash1}`)
                    
                if (somaMedidasDash1 == 0) {
                    var mensagem = document.getElementById(dash_mensagem) 
                    mensagem.style.display == "none";
                } else if (somaMedidasDash1 < 50) {
                    h2_mensagem.innerHTML = `
                        Parabéns! A somatória da duração semanal de suas sessões foi de <span>${somaMedidasDash1}</span>min. 
                        <br> 
                        E a duração máxima de sessão dessa semana foi de <span>${largestMedidasDash1}</span> min. 👏
                    `

                    p_mensagem.innerHTML = `
                        "Conhecer a si mesmo é o começo de toda a sabedoria" (como já dizia Aristóteles). Então, continue nessa jornada. Sua Plumeria sempre estará aqui!
                    `
                } else if (somaMedidasDash1 < 100) {
                    h2_mensagem.innerHTML = `
                        Uau! O total da duração semanal de suas sessões foi de <span>${somaMedidasDash1}</span>min. 
                        <br>
                        E a duração máxima de sessão dessa semana foi de <span>${largestMedidasDash1}</span>min. Parabéns 👏
                    `

                    p_mensagem.innerHTML = `
                        "Tudo o que um sonho precisa para ser realizado é alguém que acredite que ele possa ser realizado" (já dizia Roberto Shinyashiki). <br> Então continue acreditando, pois nós acreditamos em ti!
                    `
                } else if (somaMedidasDash1 < 150) {
                    h2_mensagem.innerHTML = `
                        Uhuul! 🎉 A somatória da duração semanal de suas sessões foi de <span>${somaMedidasDash1}</span>min. 
                        <br>  
                        E a duração máxima de sessão dessa semana foi de <span>${largestMedidasDash1}</span>min! Parabéns 👏
                    `

                    p_mensagem.innerHTML = `
                        Mesmo que pareça difícil, tente continuar caminhando! Qualquer coisa, você sempre poderá contar com a sua Plumeria para te ajudar!
                    `
                } else if (somaMedidasDash1 < 200) {
                    h2_mensagem.innerHTML = `
                        Muito orgulho de você!🎉 Sabia que nessa semana você fez <span>${somaMedidasDash1}</span>min de sessão? 
                        <br>  
                        E nessa semana a maior duração de sessão foi de <span>${largestMedidasDash1}</span>min. Uma grande conquista merece comemorações. 👏
                    `

                    p_mensagem.innerHTML = `
                        "O otimismo é a fé daquele que conduz à realização; nada pode ser feito sem esperança" - Helen Keller!
                    `
                } else if (somaMedidasDash1 < 250) {
                    h2_mensagem.innerHTML = `
                        Temos quase um(a) guru aqui! 🎉 A somatória da duração semanal de suas sessões foi de <span>${somaMedidasDash1}</span>min. 
                        <br> 
                        Parabéns 👏! E nessa semana a maior duração de sessão foi de <span>${largestMedidasDash1}</span>min.
                    `

                    p_mensagem.innerHTML = `
                        "Nossa maior fraqueza está em desistir. O caminho mais certo de vencer é tentar mais uma vez." - Thomas Edison
                    `
                } else {
                    h2_mensagem.innerHTML = `
                        Opa! Já está se tornando um(a) mestre no mindfulness! 🏳️ 
                        <br>
                        A somatória da duração semanal de suas sessões foi de <span>${somaMedidasDash1}</span>min.
                        <br> 
                        Continue assim! E nessa semana a maior duração de sessão foi de <span>${largestMedidasDash1}</span>min.
                    `

                    p_mensagem.innerHTML = `
                        "Cada segundo é tempo para mudar tudo para sempre." - Charles Chaplin
                    `
                } 


                plotarGrafico(resposta, idUsuarioDash);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

    fetch(`/medidas/ultimas2/${idUsuarioDash}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                plotarGrafico2(resposta,idUsuarioDash);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGrafico(resposta, idUsuarioDash) {
    idUsuarioDash = sessionStorage.ID_USUARIO;
    console.log('iniciando plotagem do gráfico...');

    let labels = [];
    
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Total da duração (min)',
            data: [],
            backgroundColor: '#142E38',
            borderColor: '#142E38',
            tension: 0.1
        }]
    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)

    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];

        registro.momento_grafico = registro.momento_grafico.slice(5,10);

        var registro2 = registro.momento_grafico.split('-');
        var dia = Number(registro2[1]);
        var mes = Number(registro2[0]);
        console.log(`O dia é: ${dia}`);
        console.log(`O dia é: ${mes}`);

        var dataManipulada = dia + '/' + mes 
        console.log(`A data manipulada é: ${dataManipulada}`);

        console.log(registro.momento_grafico);
        labels.push(dataManipulada);
        dados.datasets[0].data.push(registro.duracao);
    }

    console.log('----------------------------------------------')
    console.log('O 1º gráfico (duração) será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')
    
    const config = {
        type: 'bar',
        data: dados,
        options: {
            layout: {
                padding: 4
            },
            scales: {
                y: {
                    ticks: {
                        color: '#FFF',
                        font: {
                            size: 15,
                        },
                        stepSize: 15,
                    },
                    beginAtZero: true,
                    type: 'linear',
                    grace: '5%',
                    grid: {
                        color: '#FFF'
                    },
                },
                x: {
                    ticks: {
                        color: '#FFF',
                        font: {
                            size: 15
                        }
                    },
                    grid: {
                        color: '#FFF'
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: "#142E38", 
                        font: {
                            size: 13,
                            weight: 500
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Somatória da duração diária das sessões realizadas por semana',
                    align: "center",
                    color: '#FFF',
                    font: {
                        size: 22,
                        weight: 500,
                        lineHeight: 1.0,
                    }
                }
            },
        },
    };

    let myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}

function plotarGrafico2(resposta, idUsuarioDash) {
    idUsuarioDash = sessionStorage.ID_USUARIO;
    console.log('iniciando plotagem do gráfico...');

    let labels2 = [];
    
    let dados2 = {
        labels: labels2,
        datasets: [{
            label: 'Total de sessões',
            data: [],
            backgroundColor: '#142E38',
            borderColor: '#142E38',
            tension: 0.1
        }]
    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico2":')
    console.log(resposta)

    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];

        registro.momento_grafico = registro.momento_grafico.slice(5,10);

        var registro2 = registro.momento_grafico.split('-');
        var dia = Number(registro2[1]);
        var mes = Number(registro2[0]);
        console.log(`O dia é: ${dia}`);
        console.log(`O dia é: ${mes}`);

        var dataManipulada = dia + '/' + mes 
        console.log(`A data manipulada é: ${dataManipulada}`);

        console.log(registro.momento_grafico);
        labels2.push(dataManipulada);
        dados2.datasets[0].data.push(registro.totalSessao);
    }

    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels2)
    console.log('Dados:')
    console.log(dados2.datasets)
    console.log('----------------------------------------------')
    
    const config2 = {
        type: 'bar',
        data: dados2,
        options: {
            layout: {
                padding: 4
            },
            scales: {
                y: {
                    ticks: {
                        color: '#FFF',
                        font: {
                            size: 15
                        }
                    },
                    beginAtZero: true,
                    type: 'linear',
                    grace: '5%',
                    grid: {
                        color: '#FFF'
                    }
                },
                x: {
                    ticks: {
                        color: '#FFF',
                        font: {
                            size: 15
                        }
                    },
                    grid: {
                        color: '#FFF'
                    },
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: "#142E38", 
                        font: {
                            size: 13,
                            weight: 500
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Somatória da quantidade diária de sessões realizadas por semana',
                    align: "center",
                    color: '#FFF',
                    font: {
                        size: 22,
                        weight: 500,
                        lineHeight: 1.0,
                    }
                }
            },
        },
    };

    let myChart2 = new Chart(
        document.getElementById('myChart2'),
        config2
    );
}