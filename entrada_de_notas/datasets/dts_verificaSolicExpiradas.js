


function defineStructure() {
    addColumn("ENCONTRADO");
    addColumn("STATUS");
    

    setKey(["ENCONTRADO"]);
    addIndex(["ENCONTRADO"]);
}
function onSync(lastSyncDate) {
    var ds = DatasetBuilder.newDataset();

    var resposta = {
        ENCONTRADO: "Não encontrado",
        STATUS: "OK"
    }

    try {
        var cstWkfProc = [];
        cstWkfProc.push(DatasetFactory.createConstraint("processId", "15-JURIDICO", "15-JURIDICO", ConstraintType.MUST));
        cstWkfProc.push(DatasetFactory.createConstraint("active", true, true, ConstraintType.MUST));

        var dtsWkf = DatasetFactory.getDataset("workflowProcess", null, cstWkfProc, null);

        for (var p = 0; p < dtsWkf.rowsCount; p++) {
            //var processId = dtsWkf[p]["workflowProcessPK.processInstanceId"];
            var processId = dtsWkf.getValue(p, "workflowProcessPK.processInstanceId");
            var cstProcessTask = []
            cstProcessTask.push(DatasetFactory.createConstraint("processTaskPK.processInstanceId", processId, processId, ConstraintType.MUST))
            var dtsProcessTask = DatasetFactory.getDataset("processTask", null, cstProcessTask, ["assignDate; asc"])



            if (dtsProcessTask.rowsCount > 0) {
        

                if (dtsProcessTask.getValue(0, "choosedSequence") == 4 || dtsProcessTask.getValue(0, "choosedSequence") == 63) {
                    //var timestamp = dtsProcessTask[0].assignDate
                    var timestamp = dtsProcessTask.getValue(0, "assignDate")
                    timestamp = timestamp.toString()
                    var dataEntrada = convertStringToDate(timestamp);


                    var documentId = dtsWkf.getValue(0, "cardDocumentId")

                    var cstSol = DatasetFactory.createConstraint("documentid", documentId, documentId, ConstraintType.MUST)

                    var dtsSol = DatasetFactory.getDataset("ds_15-JURIDICO", null, [cstSol], null)

                    var valorHoraExpira = 0

                    
                    if (dtsProcessTask.getValue(0, "choosedSequence") == 4) {
                        valorHoraExpira = dtsSol.getValue(0, "nTask004")
                    } else {
                        valorHoraExpira = dtsSol.getValue(0, "nTask063")
                    }

                    if (valorHoraExpira != null || valorHoraExpira != undefined) {
                        valorHoraExpira = valorHoraExpira.replace(":", ".")
                        valorHoraExpira = parseFloat(valorHoraExpira)
                    } else {
                        continue
                    }
                    

                    var dataComparacao = new Date(dataEntrada.getTime() + valorHoraExpira * 60 * 60 * 1000);
                    var dataAtual = new Date()

                    var responsavel = ""

                    if (dataAtual.getTime() > dataComparacao.getTime()) {
                        resposta.ENCONTRADO = "Encontrado"



                        var idProcesso = processId.toString()
                        idProcesso = idProcesso.replace(".", "").replace(",", "")
                        var etapa = dtsProcessTask.getValue(0, "choosedSequence")
                        if (etapa == 4) {
                            etapa = "Analisar solicitação"
                            responsavel = dtsSol.getValue(0, "cTask004")
                        } else {
                            etapa = "Atuar solicitação"
                            responsavel = dtsSol.getValue(0, "cTask063")
                        }


                        var usuario = dtsSol.getValue(0, "nomeSolicitante")
                        var unidadeSol = dtsSol.getValue(0, "zUnidade")
                        var setor = dtsSol.getValue(0, "zSegmento")

                        /// Get Dataset para uma variavel;
                        var parametros = new java.util.HashMap();
                        parametros.put("USUARIO", usuario);
                        parametros.put("lbl_EMPRESA", "Empresa");
                        parametros.put("EMPRESA", "Décio Administração");
                        parametros.put("lbl_FILIAL", "Filial");
                        parametros.put("FILIAL", unidadeSol);
                        parametros.put("lbl_CENTRO_CUSTO", "Setor");
                        parametros.put("CENTRO_CUSTO", setor);
                        parametros.put("lbl_PROCESSO", "Processo");
                        parametros.put("PROCESSO", "15 - Jurídico");
                        parametros.put("lbl_ATIVIDADE", "Atividade");
                        parametros.put("ATIVIDADE", etapa);
                        parametros.put("lbl_RESPONSAVEL", "Responsável");
                        parametros.put("RESPONSAVEL", responsavel);
                        parametros.put("lbl_DATAEXPIRADO", "Data expirado:");
                        parametros.put("DATAEXPIRADO", formatarDataParaDDMMYYYY(dataComparacao));
                        parametros.put("lbl_SOLICITACAO", "Id da solicitação em atraso");
                        parametros.put("SOLICITACAO", idProcesso);
                        //parametros.put("Destino", "oficialguilima@gmail.com");


                        ///Este parâmetro é obrigatório e representa o assunto do e-mail
                        parametros.put("subject", "Atividade atrasada!");
                        ///Aqui gerar um array para os destinatários
                        parametros.put("USUARIO", usuario);
                        var destinatarios = new java.util.ArrayList();
                        //destinatarios.add("oficialguilima@gmail.com");

                        var grupoId = get_Atribuicao("15-JURIDICO-EMAIL_004")


                        var cstGrupo = DatasetFactory.createConstraint("colleagueGroupPK.groupId", grupoId, grupoId, ConstraintType.MUST)
                        var dtsGrupo = DatasetFactory.getDataset("colleagueGroup", null, [cstGrupo], null)


                        for (var f = 0; f < dtsGrupo.rowsCount; f++) {
                            var colleagueId = dtsGrupo.getValue(f, "colleagueGroupPK.colleagueId")

                            var cstColleague = DatasetFactory.createConstraint("colleaguePK.colleagueId", colleagueId, colleagueId, ConstraintType.MUST)

                            var dtsColleague = DatasetFactory.getDataset("colleague", null, [cstColleague], null)
                            destinatarios.add(dtsColleague.getValue(f, "mail"));

                        }

                        ///destinatarios.add( "agcoimbra@gmail.com");


                        ///notifier.notify("admin", 'Aviso_000', parametros, destinatarios, "text/html");
                        notifier.notify("admin", "Aviso_001", parametros, destinatarios, "text/html");
                    }


                }
            }

        }
    } catch (e) {
        resposta.ENCONTRADO = e
        resposta.STATUS = "NOK"
    }

    ds.addOrUpdateRow([resposta.ENCONTRADO, resposta.STATUS]);

    return ds;

}
function createDataset(fields, constraints, sortFields) {

} function onMobileSync(user) {

}


function convertStringToDate(dateString) {
    var regex = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2}).\d+$/;
    var match = dateString.match(regex);
    if (match) {
        var year = parseInt(match[1]);
        var month = parseInt(match[2]) - 1; // Os meses em JavaScript são baseados em zero
        var day = parseInt(match[3]);
        var hour = parseInt(match[4]);
        var minute = parseInt(match[5]);
        var second = parseInt(match[6]);

        return new Date(year, month, day, hour, minute, second);
    } else {
        // Trate o caso em que a string não corresponde ao formato esperado
        return null;
    }
}


function get_Atribuicao(cCriterio) {
    /// Get Dataset para uma variavel;

    var aConstraint = [];
    aConstraint.push(DatasetFactory.createConstraint("iden_Atividade", cCriterio, cCriterio, ConstraintType.MUST));
    /// aciona o dataset ds_Constante
    var oAtribuicao = DatasetFactory.getDataset("ds_Atribuicao", null, null, null);

    for (var i = 0; i < oAtribuicao.rowsCount; i++) {
        if (oAtribuicao.getValue(i, "iden_Atividade").trim() == cCriterio.trim()) {
            return oAtribuicao.getValue(i, "atri_Atividade").trim();
        }
    }
    return "";
}



function get_Constante(cCriterio) {

    var aConstraint = [];
    aConstraint.push(DatasetFactory.createConstraint('id', cCriterio, cCriterio, ConstraintType.MUST));

    var oConstantes = DatasetFactory.getDataset('ds_Constantes', null, null, null);

    for (var i = 0; i < oConstantes.rowsCount; i++) {
        if (oConstantes.getValue(i, "id").trim() == cCriterio.trim()) {
            return oConstantes.getValue(i, "Valor").trim();
        }
    }
    return '0';
}


function formatarDataParaDDMMYYYY(data) {
    var dia = data.getDate();
    var mes = data.getMonth() + 1; // Lembrando que os meses em JavaScript são base 0, então você precisa adicionar 1.
    var ano = data.getFullYear();

    // Para garantir que o dia e o mês tenham dois dígitos, você pode adicionar zeros à esquerda, se necessário.
    if (dia < 10) {
        dia = "0" + dia;
    }
    if (mes < 10) {
        mes = "0" + mes;
    }

    return dia + "/" + mes + "/" + ano;
}