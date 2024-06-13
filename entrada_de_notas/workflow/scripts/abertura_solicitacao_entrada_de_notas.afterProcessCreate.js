function afterProcessCreate(processId){
	hAPI.setCardValue('numSolicitacao', processId);
	hAPI.setCardValue('numeroSolicitacao', processId);

	var proxAtividade = getValue("WKNextState")
	var nSolicitacao = getValue("WKNumProces");
	nSolicitacao = nSolicitacao.toString();
	///nSolicitacao = nSolicitacao.replace(/./g, "");
	if (proxAtividade == 27) 
	{
		var data = new Date();
		var dataParamsEmail = 
		{ 
			usuario 	: hAPI.getCardValue("nomeSolicitante"),
			unidade     : hAPI.getCardValue("unidade"),
			segmento    : hAPI.getCardValue("segmento"),
			assunto     : hAPI.getCardValue("assunto"),
			processo    : "Ab. Solicitação - Entrada de Notas",
			atividade   : "Abertura de Solicitação",
			matriculaUserEmail  : hAPI.getCardValue("cTask013")
		}
		/// Get Dataset para uma variavel;
		var parametros = new java.util.HashMap();
		parametros.put("USUARIO", dataParamsEmail.usuario);

		parametros.put("lbl_EMPRESA", "Unidade");
		parametros.put("EMPRESA", dataParamsEmail.unidade);

		parametros.put("lbl_FILIAL", "Segmento");
		parametros.put("FILIAL", dataParamsEmail.segmento);

		parametros.put("lbl_CENTRO_CUSTO", "Assunto");
		parametros.put("CENTRO_CUSTO", dataParamsEmail.assunto);

		parametros.put("lbl_PROCESSO", "Processo");
		parametros.put("PROCESSO", dataParamsEmail.processo);

		parametros.put("lbl_ATIVIDADE", "Atividade");
		parametros.put("ATIVIDADE", dataParamsEmail.atividade);

		parametros.put("lbl_RESPONSAVEL", "Responsável");
		parametros.put("RESPONSAVEL", dataParamsEmail.usuario);

		parametros.put("lbl_DATAEXPIRADO", "Data Solicitação");
		parametros.put("DATAEXPIRADO", data.toString());

		parametros.put("lbl_SOLICITACAO", "Solicitação");
		parametros.put("SOLICITACAO", nSolicitacao);
		
		parametros.put("Destino", "Notificação");

		///Este parâmetro é obrigatório é o assunto do e-mail
		parametros.put("subject", "Abertura de Solicitação do colaborador "+dataParamsEmail.usuario);

		console.log("afterProcessCreate_057");
		///Aqui gerar um array para os destinatários
		parametros.put("USUARIO", dataParamsEmail.usuario);
		var destinatarios = new java.util.ArrayList();

		var constraint = DatasetFactory.createConstraint("colleaguePK.colleagueId", dataParamsEmail.matriculaUserEmail, dataParamsEmail.matriculaUserEmail, ConstraintType.MUST)
		var getDataset = DatasetFactory.getDataset("colleague", null, [constraint], null)

		var email = ""

		if (getDataset.rowsCount > 0) 
		{
			email = getDataset.getValue(0, "mail")
		}
		destinatarios.add(email);
		destinatarios.add("agcoimbra@gmail.com");
		///notifier.notify("admin", 'Aviso_000', parametros, destinatarios, "text/html");
		notifier.notify("admin", "Aviso_001", parametros, destinatarios, "text/html");
	}
}
