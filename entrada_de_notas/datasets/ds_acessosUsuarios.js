function createDataset(fields, constraints, sortFields) {

    var newDataset = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/AppDS";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;

    var QUERY = ""

    if (constraints != null) {
        for (var x = 0; x < constraints.length; x++) {
            if (constraints[x].fieldName == "ULTIMOACESSO") {
                QUERY = "SELECT LOG.LOGIN, " +
                    " COUNT(ACCESSLOG_ID) AS QUANTIDADE_ACESSOS, " +
                    " DATE_FORMAT((SELECT MAX(LOG2.ACCESS_DATE)  " +
                    " FROM FDN_ACCESSLOG LOG2 " +
                    " WHERE LOG2.LOGIN = LOG.LOGIN), '%d/%m/%Y') AS ULTIMO_ACESSO, " +
                    " CASE WHEN(SELECT STA.USER_STATE FROM FDN_USERTENANT STA  " +
                    " WHERE STA.LOGIN = LOG.LOGIN) = 1 THEN 'NAO' ELSE 'SIM' END AS BLOQUEADO  " +
                    " FROM FDN_ACCESSLOG LOG WHERE(SELECT STA.USER_STATE FROM FDN_USERTENANT STA " +
                    " WHERE STA.LOGIN = LOG.LOGIN) = 1 GROUP BY LOG.LOGIN ORDER BY 2 ASC "
            }
            if (constraints[x].fieldName == "ACESSOSUSUARIO") {
                QUERY = "SELECT LOGIN, CAST(ACCESS_DATE AS DATETIME) AS DATA   FROM FDN_ACCESSLOG WHERE LOGIN = '" + constraints[x].initialValue + "'"
            }
            if (constraints[x].fieldName == "RANGEDATA") {
                QUERY = "SELECT LOGIN, CAST(ACCESS_DATE AS DATETIME) AS DATA " +
                    " FROM FDN_ACCESSLOG " +
                    " WHERE CAST(ACCESS_DATE AS DATETIME) BETWEEN '" + constraints[x].initialValue + "' AND '" + constraints[x].finalValue + "';"
            }
        }
    }

    try {
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(QUERY);
        var columnCount = rs.getMetaData().getColumnCount();
        while (rs.next()) {
            if (!created) {
                for (var i = 1; i <= columnCount; i++) {
                    newDataset.addColumn(rs.getMetaData().getColumnName(i));
                }
                created = true;
            }
            var Arr = [];
            for (var i = 1; i <= columnCount; i++) {
                var obj = rs.getObject(rs.getMetaData().getColumnName(i));
                if (null != obj) {
                    Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
                } else {
                    Arr[i - 1] = "null";
                }
            }
            newDataset.addRow(Arr);
        }
    } catch (e) {
        log.error("ERRO==============> " + e.message);
    } finally {
        if (stmt != null) {
            stmt.close();
        }
        if (conn != null) {
            conn.close();
        }
    }
    return newDataset;
}