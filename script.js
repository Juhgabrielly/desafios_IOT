fetch("dados.csv")
    .then(resposta => resposta.text())
    .then(dados => {
        const linhas = dados.trim().split("\n");
        linhas.shift();

        let registros = [];

        linhas.forEach(linha => {
            const colunas = linha.split(/[,;]/);

            if (colunas.length >= 2) {

                const data = colunas[0].trim();
                const hora = colunas[1].trim();

                registros.push({
                    data: data,
                    hora: hora
                });
            }
        });

        let dias = {};

        registros.forEach(registro => {
            if (dias[registro.data]) {
                dias[registro.data]++;
            } else {
                dias[registro.data] = 1;
            }
        });

        let semanas = {};
        registros.forEach(registro => {

            const partes = registro.data.split("/");

            const dia = parseInt(partes[0]);

            const semana = Math.ceil(dia / 7);

            if (semanas[semana]) {
                semanas[semana]++;
            } else {
                semanas[semana] = 1;
            }

        });

        const datas = Object.keys(dias);
        const quantidadeDias = Object.values(dias);

        new Chart(document.getElementById("graficoDiario"), {
            type: "bar",
            data: {
                labels: datas,
                datasets: [{
                    label: "Aberturas",
                    data: quantidadeDias,
                    backgroundColor: "#176582"
                }]
            },

            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },

                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }

        });

        const numeroSemanas = Object.keys(semanas);
        const quantidadeSemanas = Object.values(semanas);

        new Chart(document.getElementById("graficoSemanal"), {

            type: "bar",
            data: {
                labels: numeroSemanas,
                datasets: [{
                    label: "Aberturas",
                    data: quantidadeSemanas,
                    backgroundColor: "#176582"
                }]
            },

            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }

        });

        const tabela = document.getElementById("tabelaDados");

        registros.forEach(registro => {

            const partes = registro.data.split("/");

            const dia = parseInt(partes[0]);
            const semana = Math.ceil(dia / 7);

            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${registro.data}</td>
                <td>${registro.hora}</td>
                <td>${semana}</td>
            `;

            tabela.appendChild(linha);

        });

    })

    .catch(erro => {
        console.error("Erro ao carregar o arquivo CSV:", erro);
    });