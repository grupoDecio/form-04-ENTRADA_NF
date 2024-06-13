function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	var dataSource = "/jdbc/AppDS";
	var ic = new javax.naming.InitialContext();
	var ds = ic.lookup(dataSource);
	var myQuery = "UPDATE md001206 SET Resp = 'Selecione uma opção:' where ID = 1";
	var conn = null;
	var stmt = null;
	var rs = null;
	var ic = new javax.naming.InitialContext();
	var ds = ic.lookup(dataSource);
	try {
		conn = ds.getConnection();
		stmt = conn.createStatement();
		rs = stmt.executeUpdate(myQuery);
		log.dir(rs);
		newDataset.addColumn("REGISTROS_ATUALIZADOS");
		newDataset.addRow([String(rs)]);
	} catch (e) {
		log.error("ERRO==============> " + e.lineNumber + " " + e.message);
		newDataset.addColumn("QUERY");
		newDataset.addRow(["ERRO: " + e.message + " - Linha: " + e.lineNumber]);
		return newDataset;
	} finally {
		if (rs != null) {
			rs.close();
		}
		if (stmt != null) {
			stmt.close();
		}
		if (conn != null) {
			conn.close();
		}
	}
	return newDataset;
}