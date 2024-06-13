function createDataset(fields, constraints, sortFields) {
    var newDataset = DatasetBuilder.newDataset();

    // var pasta = "/app/fluig/appserver/domain/servers/";
    // var diretorio = new java.io.File(pasta);
    // var arquivos = diretorio.listFiles();
    // var linhaDeComando2 = String(arquivos[0]);
    // var pasta = new java.nio.file.Path.of(String(linhaDeComando2 + "/log/server.log"));
    // var retorno4 = new java.nio.file.Files.writeString(pasta, "");

    // linhaDeComando1 = new java.lang.Runtime.getRuntime().exec("./bin/jboss-cli.sh --connect command=/host=master:reload");


    var minhaQuery = "SELECT 'CONSULTA' AS 'QUERY';";
    var minhaQuery1 = "";
    var minhaQuery2 = "";
    var minhaQuery3 = "";
    var minhaQuery4 = "";
    var minhaQuery5 = "";
    if (constraints != null) {
        minhaQuery = constraints[0].fieldName == "QUERY" ? constraints[0].initialValue : minhaQuery;
    }

    var dataSource = "/jdbc/AppDS";

    var conn = null;
    var stmt = null;
    var rs1 = null;
    var rs2 = null;
    var rs3 = null;
    var rs4 = null;
    var rs5 = null;
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;

    /*
    minhaQuery = "SELECT MAX(NUM_SEQ_MOVTO) AS MAX_NUM_SEQ_MOVTO, NUM_PROCES, LOG_ATIV, histor_proces.* " +
    " FROM histor_proces " +
    " GROUP BY NUM_PROCES " +
    " HAVING MAX_NUM_SEQ_MOVTO = MAX(NUM_SEQ_MOVTO) " +
    " ORDER BY NUM_PROCES DESC limit 100 "*/


    // minhaQuery1 = "UPDATE histor_proces hp1 " +
    // " JOIN ( " +
    // " SELECT NUM_PROCES, MAX(NUM_SEQ_MOVTO) AS MAX_NUM_SEQ_MOVTO " +
    // " FROM histor_proces " +
    // " GROUP BY NUM_PROCES " +
    // " HAVING MAX(LOG_ATIV = false) " +
    // " ORDER BY NUM_PROCES DESC " +
    // " " +
    // " ) hp2 ON hp1.NUM_PROCES = hp2.NUM_PROCES AND hp1.NUM_SEQ_MOVTO = hp2.MAX_NUM_SEQ_MOVTO " +
    // " SET hp1.LOG_ATIV = true; " ;

    // minhaQuery = "SELECT * FROM estado_proces where NUM_SEQ = 877 AND "; 

    // minhaQuery = "SELECT * FROM estado_proces where IDI_TIP_BPMN IN (81, 32) "; 
    // minhaQuery = "SELECT * FROM estado_proces where IDI_TIP_BPMN IN (81) "; 

    // minhaQuery = "SELECT * FROM PROCES_WORKFLOW WHERE STATUS = 0 AND NUM_VERS < 12 AND COD_DEF_PROCES = 'aprovacao_sol_compras'"; 

    // minhaQuery = "SELECT * FROM histor_proces where LOG_ATIV = false AND NUM_PROCES = 89977 AND NUM_SEQ_MOVTO < 1495 AND NUM_SEQ_ESTADO IN (287, 38, 286)";

    // minhaQuery = "SELECT * FROM histor_proces where NUM_SEQ_MOVTO > 300 LIMIT 1000 "; 
    // minhaQuery1 = "DELETE FROM histor_proces where LOG_ATIV = false AND NUM_PROCES = 89977 AND NUM_SEQ_MOVTO < 1495 AND NUM_SEQ_ESTADO IN (287, 38, 286)";

    // minhaQuery1 = "DELETE FROM histor_proces where LOG_ATIV = false AND NUM_SEQ_MOVTO > 10 AND NUM_SEQ_ESTADO IN (287, 38, 286, 312, 286, 377, 821, 294)";

    // minhaQuery = "SELECT * FROM process_observation where NUM_PROCESS = 89977 limit 1000";

    // minhaQuery = "SELECT * FROM process_observation where NUM_PROCESS = 91665 AND MOV_SEQ > 2 AND OBSERVATION LIKE '%Integração executada com sucesso%'";

    // minhaQuery1 = "DELETE FROM process_observation where NUM_PROCESS = 91665 AND MOV_SEQ > 2 AND OBSERVATION LIKE '%Integração executada com sucesso%'";
    // minhaQuery1 = "DELETE FROM process_observation where NUM_PROCESS > 91665 AND MOV_SEQ > 2 AND OBSERVATION LIKE '%Integração executada com sucesso%'";

    // minhaQuery1 = "DELETE FROM process_observation where NUM_PROCESS = 89977 AND OBSERVATION LIKE '%Tarefa Automática%'";

    // minhaQuery1 = "UPDATE histor_proces SET NUM_SEQ_ESTADO = 39 where NUM_PROCES = 76621 and LOG_ATIV = true";

    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 18 WHERE STATUS = 0 AND NUM_VERS = 17 AND NUM_PROCES = 86028 "; // COD_DEF_PROCES = 'aprovacao_sol_compras'"; 

    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 44 WHERE NUM_VERS > 0 and STATUS = 0 and COD_DEF_PROCES = 'rotina_aprovacao_por_item'";

    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 28 WHERE NUM_VERS > 21 and STATUS = 0 and COD_DEF_PROCES = 'aprovacao_sol_compras'";

    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 28 WHERE NUM_VERS > 1 and STATUS = 0 AND NUM_PROCES IN (68020, 69910, 70715, 70840, 70840, 70840, 70840, 70840, 70840, 70840, 70840, 71011, 71011, 71034, 71034, 71034, 71034, 71034, 73357, 73357, 73357, 74190, 74190, 74190, 74190, 74190, 74190, 74684, 74684, 74684, 74684, 74684, 74684, 74684, 74684, 74684, 74684, 74684, 74684, 75958, 75958, 75958, 76191, 76191, 76191, 76191, 76410, 76432, 76432, 76432, 76432, 76432, 76432, 76432, 76432, 76432, 76432, 76630, 77415, 78224, 79777, 79813, 79813, 79816, 79816, 79816, 79816, 79816, 79816, 80082, 80577, 81098, 81098, 81098, 81786, 81786, 81836, 81836, 82251, 82267, 82605, 83112, 83168, 84822, 86106, 86241, 86946, 93239)";

    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 2 WHERE NUM_VERS > 0 and STATUS = 0 and COD_DEF_PROCES = 'repasse_ao_polo_ead'";

    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 27 WHERE NUM_VERS = 25 and STATUS = 0 and COD_DEF_PROCES = 'aprovacao_ordem_compras'";


    // minhaQuery = "SELECT * FROM PROCES_WORKFLOW WHERE NUM_PROCES = 81635 ";

    // minhaQuery1 = "DELETE FROM PROCES_WORKFLOW WHERE NUM_PROCES = 81635 ";
    // minhaQuery2 = "DELETE FROM histor_proces where NUM_PROCES = 81635 ";


    // minhaQuery1 = "DELETE FROM PROCES_WORKFLOW WHERE COD_DEF_PROCES = 'rotina_aprovacao_por_item_contrato'";

    // minhaQuery1 = "DELETE FROM PROCES_WORKFLOW WHERE NUM_PROCES in (2756, ) ";
    // minhaQuery1 = "UPDATE histor_proces SET LOG_ATIV = false where LOG_ATIV = true";


    // Aguardando liberação do orçamento


    // minhaQuery = "SELECT JSON_EXTRACT(vl_num_solicitacao_realoca, '$[0].instanceId') AS instanceId1 FROM ML001013 where vl_num_solicitacao = '89492' LIMIT 10 ";

    // minhaQuery = "SELECT * FROM def_proces WHERE COD_DEF_PROCES = 'rotina_aprovacao_por_item'; ";

    // minhaQuery = "SELECT * FROM doc_proces WHERE COD_DEF_PROCES = 'rotina_aprovacao_por_item'; ";

    // minhaQuery = "SELECT * FROM anexo_proces WHERE COD_DEF_PROCES = 'rotina_aprovacao_por_item'; ";

    // minhaQuery = "SELECT * FROM vers_def_proces WHERE COD_DEF_PROCES = 'rotina_aprovacao_por_item'; ";

    // minhaQuery1 = "UPDATE vers_def_proces SET NUM_PASTA_FORM = 184603 WHERE COD_DEF_PROCES = 'rotina_aprovacao_por_item'; ";



    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET STATUS = 1 WHERE STATUS = 2 and NUM_PROCES = 81859";
    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_PROCES = 81859 WHERE NUM_PROCES = 97873 ";
    // minhaQuery = "SELECT * FROM PROCES_WORKFLOW WHERE NUM_PROCES = 82159 ";

    // minhaQuery1 = "INSERT INTO PROCES_WORKFLOW (NUM_PROCES, STATUS, COD_EMPRESA, COD_DEF_PROCES, NOTIFY_DELAY) VALUES (82159, 0, 1, 'prestacao_de_contas', false);"

    // minhaQuery1 = "DELETE FROM PROCES_WORKFLOW WHERE NUM_PROCES = 82159 ";
    // minhaQuery2 = "DELETE FROM histor_proces where NUM_PROCES = 82159 ";

    // minhaQuery1 = "UPDATE histor_proces SET NUM_SUB_PROCES = 97885 where NUM_SUB_PROCES = 82159 ";
    // minhaQuery1 = "DELETE FROM histor_proces where NUM_SUB_PROCES = 97885 AND NUM_PROCES = 81859 ";

    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 35 WHERE STATUS = 0 and COD_DEF_PROCES = 'aprovacao_ordem_compras' AND NUM_PROCES IN (SELECT NUM_PROCES FROM histor_proces WHERE NUM_SEQ_ESTADO = 294 and LOG_ATIV = true)";

    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 14 WHERE STATUS = 0 and COD_DEF_PROCES = 'solicitacao_de_viagens' AND NUM_PROCES IN (SELECT NUM_PROCES FROM histor_proces WHERE NUM_SEQ_ESTADO = 38 and LOG_ATIV = true)";

    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 11 WHERE STATUS = 0 and COD_DEF_PROCES = 'aprovacao_de_rpa' AND NUM_PROCES IN (SELECT NUM_PROCES FROM histor_proces WHERE NUM_SEQ_ESTADO = 38 and LOG_ATIV = true)";

    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 13 WHERE STATUS = 0 and COD_DEF_PROCES = 'contrato_apr_ordem_compras' AND NUM_PROCES IN (SELECT NUM_PROCES FROM histor_proces WHERE NUM_SEQ_ESTADO = 38 and LOG_ATIV = true)";

    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 34 WHERE STATUS = 0 and COD_DEF_PROCES = 'liberacao_de_contratos' AND NUM_PROCES IN (SELECT NUM_PROCES FROM histor_proces WHERE NUM_SEQ_ESTADO = 747 and LOG_ATIV = true)";

    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 35 WHERE STATUS = 0 and COD_DEF_PROCES = 'aprovacao_sol_compras' AND NUM_PROCES IN (SELECT NUM_PROCES FROM histor_proces WHERE NUM_SEQ_ESTADO = 294 and LOG_ATIV = true)";


    /** TRATAR ERRO  */
    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 35 WHERE STATUS = 0 and COD_DEF_PROCES = 'aprovacao_ordem_compras' AND NUM_PROCES IN (SELECT NUM_PROCES FROM histor_proces WHERE NUM_SEQ_ESTADO = 312 and LOG_ATIV = true)";

    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 35 WHERE STATUS = 0 and COD_DEF_PROCES = 'aprovacao_sol_compras' AND NUM_PROCES IN (SELECT NUM_PROCES FROM histor_proces WHERE NUM_SEQ_ESTADO = 312 and LOG_ATIV = true)";

    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 14 WHERE STATUS = 0 and COD_DEF_PROCES = 'solicitacao_de_viagens' AND NUM_PROCES IN (SELECT NUM_PROCES FROM histor_proces WHERE NUM_SEQ_ESTADO = 312 and LOG_ATIV = true)";

    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 8 WHERE STATUS = 0 and COD_DEF_PROCES = 'realizacao_orcamento' AND NUM_PROCES IN (SELECT NUM_PROCES FROM histor_proces WHERE NUM_SEQ_ESTADO in (34, 46, 39) and LOG_ATIV = true)";


    // minhaQuery1 = "DELETE FROM histor_proces WHERE NUM_SEQ_ESTADO = 38 and LOG_ATIV = true AND NUM_PROCES = 96644 ";

    // minhaQuery1 = "DELETE FROM histor_proces WHERE NUM_SEQ_ESTADO = 312 and LOG_ATIV = true AND NUM_PROCES = 78957 LIMIT 1 ";

    // minhaQuery1 = "DELETE FROM histor_proces WHERE NUM_SEQ_ESTADO = 747 and LOG_ATIV = true AND NUM_PROCES = 95444 ";

    // minhaQuery1 = "DELETE FROM histor_proces WHERE NUM_SEQ_ESTADO = 294 and LOG_ATIV = true AND NUM_PROCES IN (95387, 95183) ";


    // minhaQuery = "SELECT * FROM PROCES_WORKFLOW WHERE STATUS = 0 and COD_DEF_PROCES = 'aprovacao_ordem_compras' AND NUM_PROCES IN (SELECT NUM_PROCES FROM histor_proces WHERE NUM_SEQ_ESTADO = 294 and LOG_ATIV = true) ";
    // minhaQuery = "SELECT NUM_PROCES FROM histor_proces WHERE NUM_SEQ_ESTADO = 294 and LOG_ATIV = true  ";

    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 36 WHERE STATUS = 0 and COD_DEF_PROCES = 'liberacao_de_contratos' AND NUM_PROCES IN (SELECT NUM_PROCES FROM histor_proces WHERE NUM_SEQ_ESTADO = 515 and LOG_ATIV = true)";

    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 15 WHERE STATUS = 0 and COD_DEF_PROCES = 'rotina_padrao_de_aprovacoes' AND  NUM_VERS IN (11, 14);"

    // minhaQuery1 = "DELETE FROM histor_proces WHERE NUM_SEQ_ESTADO = 75 and LOG_ATIV = true AND NUM_PROCES IN (3399, 3402, 3404, 3410, 3543) ";


    // minhaQuery = "SELECT NUM_PROCES FROM histor_proces WHERE NUM_SEQ_ESTADO = 75 and LOG_ATIV = true  ";

    // minhaQuery = "SELECT * FROM estado_proces where IDI_TIP_BPMN IN (82) AND COD_DEF_PROCES = 'aprovacao_sol_compras' AND NUM_VERS = (SELECT NUM_VERS FROM vers_def_proces where LOG_ATIV = true AND COD_DEF_PROCES =  estado_proces.COD_DEF_PROCES)"
    //  NUM_TENTATIVAS, NUM_TEMPO, 
    // minhaQuery = "SELECT * from estado_proces_service WHERE COD_DEF_PROCES = 'aprovacao_sol_compras' AND NUM_VERS = (SELECT NUM_VERS FROM vers_def_proces where LOG_ATIV = true AND COD_DEF_PROCES =  estado_proces_service.COD_DEF_PROCES)"


    // minhaQuery = "SELECT DISTINCT * FROM vers_def_proces where LOG_ATIV = true   ";

    // minhaQuery = "SELECT * FROM  estado_proces WHERE COD_DEF_PROCES = 'liberacao_de_contratos' AND NUM_SEQ = 1001 LIMIT 10 ";

    // var NOME = "Contrato sem orçamento disponível, favor providenciar verba abrindo uma solicitação para realocação";

    // minhaQuery1 = "UPDATE  estado_proces SET DES_ESTADO =  '" + NOME + "', NOM_ESTADO = '" + NOME + "' WHERE COD_DEF_PROCES = 'liberacao_de_contratos' AND NUM_SEQ = 1001 ";


    // minhaQuery1 = "UPDATE estado_proces_service SET NUM_TENTATIVAS = 3, NUM_TEMPO = 15 WHERE NUM_VERS = (SELECT NUM_VERS FROM vers_def_proces where LOG_ATIV = true AND COD_DEF_PROCES =  estado_proces_service.COD_DEF_PROCES)";

    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 8 WHERE STATUS = 0 and COD_DEF_PROCES = 'realizacao_orcamento' "; //AND NUM_PROCES IN (SELECT NUM_PROCES FROM histor_proces WHERE NUM_SEQ_ESTADO in (34, 46, 39, 30, 47, 38, 1) and LOG_ATIV = true)";

    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 17 WHERE STATUS = 0 and COD_DEF_PROCES = 'rotina_padrao_de_aprovacoes' "; //AND NUM_PROCES IN (SELECT NUM_PROCES FROM histor_proces WHERE NUM_SEQ_ESTADO in (34, 46, 39, 30, 47, 38, 1) and LOG_ATIV = true)";

    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 36 WHERE STATUS = 0 and COD_DEF_PROCES = 'aprovacao_sol_compras' AND NUM_PROCES IN (SELECT NUM_PROCES FROM histor_proces WHERE NUM_SEQ_ESTADO = 877 and LOG_ATIV = true)";
    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 36 WHERE STATUS = 0 and COD_DEF_PROCES = 'aprovacao_sol_compras' AND NUM_PROCES IN (106237)";

    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 37 WHERE STATUS = 0 and COD_DEF_PROCES = 'liberacao_de_contratos' AND NUM_PROCES IN (SELECT NUM_PROCES FROM histor_proces WHERE NUM_SEQ_ESTADO = 515 and LOG_ATIV = true)";

    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 38 WHERE STATUS = 0 and COD_DEF_PROCES = 'aprovacao_sol_compras' AND NUM_PROCES IN (SELECT NUM_PROCES FROM histor_proces WHERE NUM_SEQ_ESTADO = 312 and LOG_ATIV = true)";

    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 9 WHERE NUM_VERS = 8 AND STATUS = 0 and COD_DEF_PROCES = 'repasse_ao_polo_ead' ";


    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 38 WHERE STATUS = 0 and COD_DEF_PROCES = 'aprovacao_sol_compras' and NUM_VERS = 30  " // AND NUM_PROCES IN (SELECT NUM_PROCES FROM histor_proces WHERE NUM_SEQ_ESTADO = 515 and LOG_ATIV = true)";



    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 9 WHERE COD_DEF_PROCES = 'repasse_ao_polo_ead' and NUM_VERS > 2 AND NUM_VERS < 8  " // AND NUM_PROCES IN (SELECT NUM_PROCES FROM histor_proces WHERE NUM_SEQ_ESTADO = 515 and LOG_ATIV = true)";

    // minhaQuery1 = "UPDATE histor_proces SET NUM_SEQ_ESTADO = 52 WHERE NUM_SEQ_ESTADO = 31 AND NUM_PROCES IN (SELECT NUM_PROCES FROM PROCES_WORKFLOW WHERE NUM_VERS = 9 AND COD_DEF_PROCES = 'repasse_ao_polo_ead' )  ";

    // minhaQuery = "SELECT * FROM histor_proces WHERE NUM_SEQ_ESTADO = 52 AND NUM_PROCES IN (SELECT NUM_PROCES FROM PROCES_WORKFLOW WHERE NUM_VERS = 9 AND COD_DEF_PROCES = 'repasse_ao_polo_ead' )  ";

    //    minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 5 WHERE NUM_VERS > 0 AND STATUS = 0 and COD_DEF_PROCES = 'rotina_aprovacao_por_item_contrato' ";



    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 42 WHERE NUM_VERS > 0 AND STATUS = 0 and COD_DEF_PROCES = 'liberacao_de_contratos' ";



    // minhaQuery = "SELECT * FROM histor_proces WHERE LOG_ATIV = true  and NUM_SEQ_ESTADO NOT IN (762, 760, 333) and   NUM_PROCES IN (SELECT NUM_PROCES FROM PROCES_WORKFLOW WHERE NUM_VERS > 0 AND STATUS = 0 AND COD_DEF_PROCES = 'liberacao_de_contratos' AND NUM_PROCES < 97330)"

    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 10 WHERE NUM_VERS > 0 AND STATUS = 0 and COD_DEF_PROCES = 'liberacao_de_contratos' AND   NUM_PROCES IN (65931, 67069, 67264, 67738, 67771, 68183, 68241, 68271, 68328, 68926, 68949, 68956, 68962, 69203, 69639, 69647, 72566, 67102, 67103, 67104, 68186, 68197, 68204, 68211, 68214, 68219, 68226, 68235, 68961, 68997, 71058, 72027, 72690, 72730, 73191, 73409, 73502, 73783, 73868, 73920, 73970, 74077, 74248, 74337, 74579, 74591, 74734, 75028, 75031, 78115, 78116, 78365, 78854, 79285, 79677, 79742, 80539, 82078, 85256, 87464, 93921, 94113, 94421, 94426, 95555, 95556, 96270, 96571, 97281, 97289)"

    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 1 WHERE NUM_VERS > 0 AND STATUS = 0 and COD_DEF_PROCES = 'liberacao_de_contratos' AND   NUM_PROCES IN (68328, 67264, 67069, 67771)"

    // minhaQuery = "SELECT * FROM histor_proces WHERE  NUM_PROCES IN (68328, 67264, 67069, 67771)"
    // minhaQuery1 = "DELETE FROM histor_proces WHERE NUM_SEQ_MOVTO > 100 AND  NUM_PROCES IN (68328, 67264, 67069, 67771)"


    // minhaQuery = "SELECT NUM_PROCES FROM PROCES_WORKFLOW WHERE NUM_VERS > 10 AND STATUS = 0 AND COD_DEF_PROCES = 'liberacao_de_contratos' AND NUM_PROCES < 97330"

    // minhaQuery = "SELECT * FROM histor_proces WHERE LOG_ATIV = true  and NUM_SEQ_ESTADO IN (489) and   NUM_PROCES IN (SELECT NUM_PROCES FROM PROCES_WORKFLOW WHERE NUM_VERS > 0 AND STATUS = 0 AND COD_DEF_PROCES = 'solicitacao_de_viagens' AND NUM_PROCES > 0)"

    /*
            minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 18 WHERE COD_DEF_PROCES = 'solicitacao_de_viagens' and NUM_VERS > 2 AND NUM_VERS < 20  AND NUM_PROCES IN (SELECT NUM_PROCES FROM histor_proces WHERE NUM_SEQ_ESTADO = 489 and LOG_ATIV = true)";
    
    
    "
       */

    // ALTER TABLE ML001118 ADD INDEX (companyid, documentid, version, DRT_APROVADOR, GRUPO);


    // minhaQuery1 = "UPDATE estado_proces_service SET NUM_TENTATIVAS = 3, NUM_TEMPO = 15 WHERE NUM_VERS = (SELECT NUM_VERS FROM vers_def_proces where LOG_ATIV = true AND COD_DEF_PROCES =  estado_proces_service.COD_DEF_PROCES)";
    // minhaQuery3 = "DELETE FROM fdn_datasethistory WHERE DATASET_ID IN ('dsConsulta', 'dsConsulta3');"
    // minhaQuery4 = "DELETE FROM serv_dataset WHERE COD_DATASET IN ('dsConsulta', 'dsConsulta3'); "


    // minhaQuery = "SHOW INDEXES  FROM ML001118;    "
    // minhaQuery = "SHOW INDEXES  FROM estado_proces_service;    "
    // minhaQuery = "SHOW INDEX FROM ch6sty_137421_fl_pd.ML001118"

    // minhaQuery1 = "CREATE INDEX PROCESSO_BI ON ML001118(companyid, documentid, version)"
    // minhaQuery1 = "CREATE INDEX FLUIG_PROCESS_01_SISTEMAS_BI ON ML001183(companyid, documentid, version)"
    // minhaQuery1 = "CREATE INDEX FLUIG_PROCESS_23_TI_GDIN ON ML001219(companyid, documentid, version)"
    // minhaQuery2 = "CREATE INDEX FLUIG_PROCESS_00_FLUIG ON ML001182(companyid, documentid, version)"
    // minhaQuery3 = "CREATE INDEX FLUIG_PROCESS_22_TI_ACESSOS ON ML001217(companyid, documentid, version)"
    // minhaQuery1 = "CREATE INDEX FLUIG_PROCESS_AB_VAGAS ON ML001101(companyid, documentid, version)"

    minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 60 WHERE NUM_VERS > 60 and STATUS = 0 and COD_DEF_PROCES = '03-CADASTRO'";

    minhaQuery4 = "DELETE FROM fdn_datasethistory WHERE DATASET_ID IN ('dsConsulta', 'dsConsulta3');"
    minhaQuery5 = "DELETE FROM serv_dataset WHERE COD_DATASET IN ('dsConsulta', 'dsConsulta3'); "


    try {
        conn = ds.getConnection();
        stmt = conn.createStatement();
        if (minhaQuery1.indexOf("DELETE") == 0 || minhaQuery1.indexOf("INSERT") == 0 || minhaQuery1.indexOf("UPDATE") == 0 || minhaQuery1.indexOf("CREATE") == 0) {
            rs1 = minhaQuery1 != "" ? parseInt(stmt.executeUpdate(minhaQuery1)) : null;
            rs2 = minhaQuery2 != "" ? parseInt(stmt.executeUpdate(minhaQuery2)) : null;
            rs3 = minhaQuery3 != "" ? parseInt(stmt.executeUpdate(minhaQuery3)) : null;
            rs4 = minhaQuery4 != "" ? parseInt(stmt.executeUpdate(minhaQuery4)) : null;
            rs5 = minhaQuery5 != "" ? parseInt(stmt.executeUpdate(minhaQuery5)) : null;

            newDataset = DatasetBuilder.newDataset();
            newDataset.addColumn("CAMPO");
            newDataset.addColumn("REGISTROS_ATUALIZADOS");
            if (rs1) newDataset.addRow(["rs1", parseInt(rs1)]);
            if (rs2) newDataset.addRow(["rs2", parseInt(rs2)]);
            if (rs3) newDataset.addRow(["rs3", parseInt(rs3)]);
            if (rs4) newDataset.addRow(["rs4", parseInt(rs4)]);
            if (rs5) newDataset.addRow(["rs5", parseInt(rs5)]);
        } else {
            rs = stmt.executeQuery(minhaQuery);

            var columnCount = rs.getMetaData().getColumnCount();
            for (var i = 1; i <= columnCount; i++) {
                newDataset.addColumn(rs.getMetaData().getColumnName(i));
            }
            // newDataset.addColumn("QUERY");

            while (rs.next()) {
                var Arr = new Array();
                for (var i = 1; i <= columnCount; i++) {
                    if (rs.getObject(rs.getMetaData().getColumnName(i))) {
                        Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
                    }
                    else {
                        Arr[i - 1] = "null";
                    }
                }
                // Arr.push(minhaQuery);
                newDataset.addRow(Arr);
            }
        }
    } catch (e) {
        // newDataset = DatasetBuilder.newDataset();
        newDataset.addColumn("QUERY");
        newDataset.addColumn("ERRO1");
        newDataset.addRow(["ERRO: " + String(e) + " - Linha: " + e.lineNumber, e.lineNumber]);
    } finally {
        try {
            if (rs1 != null && rs1 < 0) rs.close();
            if (stmt != null) stmt.close();
            if (conn != null) conn.close();
        } catch (er) {
            // newDataset = DatasetBuilder.newDataset();
            newDataset.addColumn("QUERY");
            newDataset.addColumn("ERRO2");
            newDataset.addRow(["ERRO: " + String(er) + " - Linha: " + er.lineNumber, er.lineNumber]);
        }
    }
    return newDataset;
}