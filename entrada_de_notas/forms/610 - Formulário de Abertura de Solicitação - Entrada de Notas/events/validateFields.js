function validateForm(form) {

	var activity = getValue('WKNumState');
	var msg = "";

	function campoVazio(nomeCampo) {
		if (form.getValue(nomeCampo) == null || form.getValue(nomeCampo) == "") {
			return true;
		}
		return false;
	}
	if (activity == 3 || activity == 0) {
		if (campoVazio("nomeSolicitante") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
			msg += "<br/><span class=\"text-danger\"><strong>O campo Nome do solicitante \u00E9 obrigat\u00F3rio</strong></span>";
		}
		if ((form.getValue("unidade") == 'Selecione uma opção:')) {
			msg += "<br/><span class=\"text-danger\"><strong>Selecione uma op\u00E7\u00E3o v\u00E1lida no campo Unidade</strong></span>";
		}
		if (campoVazio("contato") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
			msg += "<br/><span class=\"text-danger\"><strong>O campo Contato (telefone ou e-mail) \u00E9 obrigat\u00F3rio</strong></span>";
		}
		if (campoVazio("assunto") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
			msg += "<br/><span class=\"text-danger\"><strong>O campo Assunto \u00E9 obrigat\u00F3rio</strong></span>";
		}
		if ((form.getValue("categoria") == 'Selecione uma opção')) {
			msg += "<br/><span class=\"text-danger\"><strong>Selecione uma op\u00E7\u00E3o v\u00E1lida no campo Categoria</strong></span>";
		}
		if (campoVazio("mensagem") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
			msg += "<br/><span class=\"text-danger\"><strong>O campo Mensagem \u00E9 obrigat\u00F3rio</strong></span>";
		}
		if ((form.getValue("segmento") == 'Selecione uma opção:')) {
			msg += "<br/><span class=\"text-danger\"><strong>Selecione uma op\u00E7\u00E3o v\u00E1lida no campo Segmento</strong></span>";
		}
	}
	else if (activity == 18) {
		if (campoVazio("atendenteDespes") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
			msg += "<br/><span class=\"text-danger\"><strong>O campo Atendente despesas \u00E9 obrigat\u00F3rio</strong></span>";
		}
		if (campoVazio("mensagemDespesa") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
			msg += "<br/><span class=\"text-danger\"><strong>O campo Mensagem tratativa despesas \u00E9 obrigat\u00F3rio</strong></span>";
		}
	}
	else if (activity == 4) {
		if ((form.getValue("revisaoSolicita") == 'Selecione uma opção')) {
			msg += "<br/><span class=\"text-danger\"><strong>Selecione uma op\u00E7\u00E3o v\u00E1lida no campo Necess\u00E1rio revis\u00E3o do solicitante?</strong></span>";
		}
		if (campoVazio("mensagemTratati") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
			msg += "<br/><span class=\"text-danger\"><strong>O campo Mensagem tratativa \u00E9 obrigat\u00F3rio </strong></span>";
		}
		if (campoVazio("atendente") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
			msg += "<br/><span class=\"text-danger\"><strong>O campo Atendente entrada de notas \u00E9 obrigat\u00F3rio</strong></span>";
		}
		if ((form.getValue("despesaReceita") == 'Selecione uma opção')) {
			msg += "<br/><span class=\"text-danger\"><strong>Selecione uma op\u00E7\u00E3o v\u00E1lida no campo Necess\u00E1rio lan\u00E7amento de despesas / receita?</strong></span>";
		}
	}
	else if (activity == 8) {
		if ((form.getValue("unidade") == 'Selecione uma opção:')) {
			msg += "<br/><span class=\"text-danger\"><strong>Selecione uma op\u00E7\u00E3o v\u00E1lida no campo Unidade</strong></span>";
		}
		if (campoVazio("contato") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
			msg += "<br/><span class=\"text-danger\"><strong>O campo Contato (telefone ou e-mail) \u00E9 obrigat\u00F3rio</strong></span>";
		}
		if (campoVazio("assunto") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
			msg += "<br/><span class=\"text-danger\"><strong>O campo Assunto \u00E9 obrigat\u00F3rio</strong></span>";
		}
		if ((form.getValue("categoria") == 'Selecione uma opção')) {
			msg += "<br/><span class=\"text-danger\"><strong>Selecione uma op\u00E7\u00E3o v\u00E1lida no campo Categoria</strong></span>";
		}
		if (campoVazio("mensagem") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
			msg += "<br/><span class=\"text-danger\"><strong>O campo Mensagem \u00E9 obrigat\u00F3rio</strong></span>";
		}
		if ((form.getValue("segmento") == 'Selecione uma opção:')) {
			msg += "<br/><span class=\"text-danger\"><strong>Selecione uma op\u00E7\u00E3o v\u00E1lida no campo Segmento</strong></span>";
		}
	}
	else if (activity == 37 && form.getValue("gest_logistica_aprovado") == "Não" && campoVazio("gest_logistica_obs")) {
		msg += "<br/><span class=\"text-danger\"><strong>O campo 'Observações' \u00E9 obrigat\u00F3rio</strong></span>";
	}

	if (msg != "") {
		throw msg;
	}


}