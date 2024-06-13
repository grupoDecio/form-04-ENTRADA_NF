function createDataset(fields, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	var dataSource = "/jdbc/Protheus";
	var ic = new javax.naming.InitialContext();
	var ds = ic.lookup(dataSource);

	var crudType = 'include';
	var crudTable = 'SZL010';
	var campos = ["R_E_C_D_E_L_", "ZL_CUSTO", "ZL_FILIAL", "ZL_GERENTE", "ZL_GESTOR", "ZL_GRUPO", "ZL_RESPONS", "R_E_C_N_O_"];

	var values = ["0", "1", "2", "3", "4", "5", "testes", "1"];
	var filtro = {};
	filtro.tipo = 'WHERE';
	filtro.campo = 'ZL_GRUPO';
	filtro.value = '13';

	var myQuery;
	switch (crudType) {
		case "include":
			var columns = campos.join(",");
			var placeholders = [];
			for (var i = 0; i < values.length; i++) {
				placeholders.push("?");
			}
			myQuery = "INSERT INTO " + crudTable + " (" + columns + ") VALUES (" + placeholders.join(",") + ")";
			break;
		case "update":
			var setcampos = [];
			for (var i = 0; i < campos.length; i++) {
				setcampos.push(campos[i] + " = ?");
			}
			// Corrigido: Concatenando os campos e valores corretamente usando join
			myQuery = "UPDATE " + crudTable + " SET " + setcampos.join(", ") + " " + filtro.tipo + " " + filtro.campo + " = ?";
			// Corrigido: Adicionando o filtro.value como último parâmetro
			values.push(filtro.value);
			break;
		case "delete":
			myQuery = "DELETE FROM " + crudTable + " " + filtro.tipo + " " + filtro.campo + " = ?";
			// Corrigido: Adicionando o filtro.value como parâmetro único
			values = [filtro.value];
			break;
		default:
			throw new Error("Tipo de operação desconhecido: " + crudType);
	}

	var conn = null;
	var stmt = null;
	var rs = null;

	try {
		conn = ds.getConnection();
		stmt = conn.prepareStatement(myQuery);

		// bind values to prepared statement
		for (var i = 0; i < values.length; i++) {
			stmt.setObject(i + 1, values[i]);
		}

		var result = stmt.execute();
		// Corrigido: não há necessidade de fazer log.dir(rs) aqui
		newDataset.addColumn("REGISTROS_ATUALIZADOS");
		newDataset.addRow([result ? "Erro ao executar operação." : "Operação realizada com sucesso."]);

	} catch (e) {
		log.error("ERRO==============> " + e.lineNumber + " " + e.message);
		newDataset.addColumn("QUERY");
		newDataset.addRow(["ERRO: " + e.message + " - Linha: " + e.lineNumber]);
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
