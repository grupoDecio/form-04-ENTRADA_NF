function createDataset(fields, constraints, sortFields) {
    log.info("INICIANDO DS DE ENVIO DE MENSAGEM")
    var dataset = DatasetBuilder.newDataset()
    dataset.addColumn("STATUS")
    dataset.addColumn("RETORNO")
    dataset.addColumn("MENSAGEM")


    var nome = ""
    var celular = ""
    var link = ""


    if (constraints != null && constraints.length) {
        for (var c = 0; c < constraints.length; c++) {
            if (constraints[c].fieldName.toUpperCase() != "SQLLIMIT") {
                if (constraints[c].fieldName.trim().toUpperCase() == "NOME") {
                    nome = constraints[c].initialValue.trim();
                }
                if (constraints[c].fieldName.trim().toUpperCase() == "CELULAR") {
                    celular = constraints[c].initialValue.trim();
                    celular = celular.replace("(", "").replace(")", "").replace(" ", "")
                }
                if (constraints[c].fieldName.trim().toUpperCase() == "LINK") {
                    link = constraints[c].initialValue.trim();
                }
            }
        }
    }

    var jsonToSend = {
        "name": nome,
        "phone": celular,
        "link": link
    }

    var returnApi = searchAPI(jsonToSend);
    var response = returnApi.getResult()
    response = JSON.parse(response)
    log.info("\n\n RESPONSE --> \n\n")
    log.dir(response)

    /*
    for (var p = 0; p < response.items.length; p++) {
        dataset.addRow(["OK", "OK", "OK"])
    }*/

    dataset.addRow(["OK", "OK", "OK"])
    return dataset;
}


function searchAPI(json) {
    var clientService = fluigAPI.getAuthorizeClientService();

    var data = {
        companyId : "1",
        serviceCode: "msgdesligamento",
        endpoint: "/api/bTcmxHcv0/disparo/pesquisaExColaborador",
        method: "post",
        dataType: "text",
        options: {
            encoding: "UTF-8",
            mediaType: "application/json",
            "mediaType": "application/x-www-form-urlencoded",
            "Accept-Charset": "utf-8",
            "Content-Type": "application/json",
            useSSL : true
        },
        headers: {
            "Content-Type": "application/json",
            "client_id": "b636e3e1-c5b6-46ee-8a29-79c48bb5fcdc"
        },
        params: json
    };

    var vo = clientService.invoke(data.toString());

    return vo;
}