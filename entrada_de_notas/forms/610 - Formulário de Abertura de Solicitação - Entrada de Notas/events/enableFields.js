function enableFields(form) {
	var activity = getValue('WKNumState');
	/*
	if (activity == 18) {
		form.setEnabled('nomeSolicitante', false);
		form.setEnabled('unidade', false);
		form.setEnabled('segmento', false);
		form.setEnabled('contato', false);
		form.setEnabled('assunto', false);
		form.setEnabled('categoria', false);
		form.setEnabled('mensagem', false);
		form.setEnabled('atendente', false);
		form.setEnabled('despesaReceita', false);
		form.setEnabled('mensagemTratati', false);
	}
	if (activity == 4) {
		form.setEnabled('nomeSolicitante', false);
		form.setEnabled('unidade', false);
		form.setEnabled('contato', false);
		form.setEnabled('assunto', false);
		form.setEnabled('mensagem', false);
		form.setEnabled('segmento', false);
		form.setEnabled('revisaoEntrada', false);
	}
	if (activity == 8) {
		form.setEnabled('nomeSolicitante', false);
		form.setEnabled('revisaoSolicita', false);
		form.setEnabled('mensagemTratati', false);
		form.setEnabled('atendente', false);
		form.setEnabled('despesaReceita', false);
	}
	if (activity == 24) {
		form.setEnabled('nomeSolicitante', false);
		form.setEnabled('unidade', false);
		form.setEnabled('segmento', false);
		form.setEnabled('contato', false);
		form.setEnabled('assunto', false);
		form.setEnabled('categoria', false);
		form.setEnabled('mensagem', false);
		form.setEnabled('atendente', false);
		form.setEnabled('revisaoSolicita', false);
		form.setEnabled('despesaReceita', false);
		form.setEnabled('revisaoEntrada', false);
		form.setEnabled('atendenteDespes', false);
		form.setEnabled('mensagemDespesa', false);
	}
	*/

	/** Negações */
	if (activity != 0 && activity != 3 && activity != 8) {
		form.setEnabled('nomeSolicitante', false);
		form.setEnabled('unidade', false);
		form.setEnabled('categoria', false);
		form.setEnabled('contato', false);
		form.setEnabled('assunto', false);
		form.setEnabled('mensagem', false);
		form.setEnabled('segmento', false);
	}
	if (activity != 4 && activity != 24) {
		form.setEnabled('mensagemTratati', false);
	}
	if (activity != 4) {
		form.setEnabled('atendente', false);
		form.setEnabled('revisaoSolicita', false);
		form.setEnabled('despesaReceita', false);
	}
	if (activity != 18) {
		form.setEnabled('revisaoEntrada', false);
		form.setEnabled('atendenteDespes', false);
		form.setEnabled('mensagemDespesa', false);
	}
	if (activity != 37) {
		form.setEnabled('gest_logistica_aprovado', false);
		form.setEnabled('gest_logistica_obs', false);
	}
}