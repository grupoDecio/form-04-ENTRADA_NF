function defineStructure() {
    addColumn("NSOLIC");
    addColumn("LASTSYNC");

    setKey(['NSOLIC']);
}

function onSync(lastSyncDate) {
    try {
        logTexto("INICIOU O DATASET --> ")
        var dataset = DatasetBuilder.newDataset();

        var lastSync = lastSyncDate + ""
        

        var dataAtual = new Date()
        logTexto("DATA " + dataAtual)

        logTexto("dataAtual.getDay() " + dataAtual.getDay())

        var dia = dataAtual.getDate() + ""
        var diaDaSemana = getDiaDaSemana(dataAtual.getDay());

        logTexto("DIAAAAAA --> " + dia)
        logTexto("DIA SEMANA --> " + diaDaSemana)


        if (dia == "12" && (diaDaSemana != 'sabado' && diaDaSemana != 'domingo')) {
            var datasetEmpresas = DatasetFactory.getDataset("ds_empresasFechamento", null, null, null);

            logTexto("ROWSCOUNT --> " + datasetEmpresas.rowsCount)

            for (var p = 0; p < datasetEmpresas.rowsCount; p++) {
                var objEmpresa = {
                    RAZAOSOCIAL: datasetEmpresas.getValue(p, "RAZAOSOCIAL"),
                    NOMEFANTASIA: datasetEmpresas.getValue(p, "NOMEFANTASIA"),
                    CNPJ: datasetEmpresas.getValue(p, "CNPJ"),
                }

                var numSolic = iniciaSolicitacao(objEmpresa)

                dataset.addOrUpdateRow(new Array(numSolic, lastSync));
            }


        } else if (dia24CaiuNoFimDeSemana()) {
            var dataUltimaSincronizacao = new Date(lastSyncDate)

            var mesUltimaSync = getNomeDoMes(dataUltimaSincronizacao.getMonth())
            var mesAtual = getNomeDoMes(data.getMonth())

            if (mesUltimaSync != mesAtual) {
                dataset.addOrUpdateRow(new Array(numSolic, lastSync) );
            }
        }



    } catch (e) {
        log.error(" ERRO DS SYNC 20-FECHAMENTO --> " + e)
    }

    return dataset;
}

function iniciaSolicitacao(empresa) {
    logTexto("VAI INICIAR SOLICITACAO")
    log.dir(empresa)

    var card = JSONUtil.toJSON({
        nomeSolicitante: empresa.RAZAOSOCIAL,
        itxt_matricula_colab: empresa.CNPJ
    })


    var c1 = DatasetFactory.createConstraint('cardData', card, '', ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint('comments', '', '', ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint('attachments', '', '', ConstraintType.MUST);
    var c4 = DatasetFactory.createConstraint('colleagueIds', "['suporte6.fluig']", '', ConstraintType.MUST);
    var c5 = DatasetFactory.createConstraint('managerMode', 'false', '', ConstraintType.MUST);
    var c6 = DatasetFactory.createConstraint('appointment', '', '', ConstraintType.MUST);
    var c7 = DatasetFactory.createConstraint('choosedState', '19', '', ConstraintType.MUST);
    var c8 = DatasetFactory.createConstraint('userId', 'suporte6.fluig', '', ConstraintType.MUST);
    var c9 = DatasetFactory.createConstraint('completeTask', 'true', '', ConstraintType.MUST);
    var c10 = DatasetFactory.createConstraint('password', '123456', '', ConstraintType.MUST);
    var c11 = DatasetFactory.createConstraint('companyId', '1', '', ConstraintType.MUST);
    var c12 = DatasetFactory.createConstraint('processId', '20-FECHAMENTO', '', ConstraintType.MUST);
    var c13 = DatasetFactory.createConstraint('username', 'suporte6.fluig', '', ConstraintType.MUST);



    var ds = DatasetFactory.getDataset('ds_iniciaSolicitacoes', null, new Array(c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13), null);

    return ds.getValue(0, "iProcess")

}


function getDiaDaSemana(numeroDoDia) {
    if (numeroDoDia === 0) {
        return "domingo";
    } else if (numeroDoDia === 1) {
        return "segunda";
    } else if (numeroDoDia === 2) {
        return "terca";
    } else if (numeroDoDia === 3) {
        return "quarta";
    } else if (numeroDoDia === 4) {
        return "quinta";
    } else if (numeroDoDia === 5) {
        return "sexta";
    } else if (numeroDoDia === 6) {
        return "sabado";
    } else {
        return "Número de dia inválido";
    }
}


function getNomeDoMes(numeroDoMes) {
    if (numeroDoMes === 0) {
        return "janeiro";
    } else if (numeroDoMes === 1) {
        return "fevereiro";
    } else if (numeroDoMes === 2) {
        return "março";
    } else if (numeroDoMes === 3) {
        return "abril";
    } else if (numeroDoMes === 4) {
        return "maio";
    } else if (numeroDoMes === 5) {
        return "junho";
    } else if (numeroDoMes === 6) {
        return "julho";
    } else if (numeroDoMes === 7) {
        return "agosto";
    } else if (numeroDoMes === 8) {
        return "setembro";
    } else if (numeroDoMes === 9) {
        return "outubro";
    } else if (numeroDoMes === 10) {
        return "novembro";
    } else if (numeroDoMes === 11) {
        return "dezembro";
    } else {
        return "Número de mês inválido";
    }
}


function dia24CaiuNoFimDeSemana() {
    var dataAtual = new Date();
    var ano = dataAtual.getFullYear();
    var mes = dataAtual.getMonth();

    // Configura a data para o dia 24 do mês atual
    var dia24 = new Date(ano, mes, 24);

    // Obtém o dia da semana para o dia 24
    var diaDaSemana = dia24.getDay();

    // Verifica se o dia 24 foi um sábado (6) ou domingo (0)
    return diaDaSemana == 0 || diaDaSemana == 6;
}




function logTexto(texto){
    //log.info(texto)
}