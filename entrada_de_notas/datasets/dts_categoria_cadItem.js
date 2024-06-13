function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
    //Cria as colunas
    dataset.addColumn("STATUS");
    dataset.addColumn("MENSAGEM");
    dataset.addColumn("CATEGORIA");
    dataset.addColumn("SUBCATEGORIA");


    var dept = ""

    if (constraints != null && constraints.length) {
        for (var c = 0; c < constraints.length; c++) {
            if (constraints[c].fieldName.toUpperCase() != "SQLLIMIT") {
                if (constraints[c].fieldName.trim().toUpperCase() == "DEPT") {
                    dept = constraints[c].initialValue.trim().toUpperCase();
                }
            }
        }
    }

    if (dept == "") {
        dataset.addRow(["NOK","Necessário informar o departamento!", "Informe o departamento!", null]);
        return dataset;
    }

    if (dept != "CONTROLADORIA" && dept != "FINANCEIRO") {
        dataset.addRow(["NOK","Departamento não localizado!", null, null]);
        return dataset;
    }



    if(dept == "CONTROLADORIA"){
        dataset.addRow(["OK", null, "Análise de cadastro de item", null]);
        dataset.addRow(["OK", null, "Cadastro de item", "Normal;;24h"]);
        dataset.addRow(["OK", null, "Cadastro de pessoa (Cliente/Fornecedor/Funcionário/Transportadora)", "Cliente;;Fornecedor;;Funcionário;;Transportadora"]);
        dataset.addRow(["OK", null, "Alteração de cadastro de pessoa", "Cliente;;Fornecedor;;Funcionário;;Transportadora"]);
        dataset.addRow(["OK", null, "Vínculo", null]);
    }

    if(dept == "FINANCEIRO"){
        dataset.addRow(["OK", null, "Cadastro de natureza financeira", null]);
        dataset.addRow(["OK", null, "Condições de pagamento", null]);
    }



    return dataset;
}
