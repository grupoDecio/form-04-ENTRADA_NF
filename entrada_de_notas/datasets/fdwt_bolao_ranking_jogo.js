function defineStructure() {} function onSync(lastSyncDate) {} function createDataset(fields, constraints, sortFields) { log.info("-> Início | Dataset | fdwt_bolao_ranking_jogo.js"); var dataset = DatasetBuilder.newDataset(); if (constraints != null) { for (var i = 0; i < constraints.length; i++) { if (constraints[i].fieldName == "pCampeonato") { c1 = DatasetFactory.createConstraint("pCampeonato", constraints[i].initialValue, constraints[i].initialValue, ConstraintType.MUST); } else if (constraints[i].fieldName == "pJogo") { c2 = DatasetFactory.createConstraint("pJogo", constraints[i].initialValue, constraints[i].initialValue, ConstraintType.MUST); } } } dataset.addColumn("JOGADOR_ID"); dataset.addColumn("JOGADOR_LOGIN"); dataset.addColumn("JOGADOR_NOME"); dataset.addColumn("PONTUACAO"); dataset.addColumn("TIME_A_PALPITE"); dataset.addColumn("TIME_B_PALPITE"); var dsPalpite = DatasetFactory.getDataset("fdwt_bolao_palpite", null, new Array(c1, c2), null); var hJogadorPontuacao = new java.util.HashMap(); for (var i = 0; i < dsPalpite.rowsCount; i++) { var DOCUMENTID = dsPalpite.getValue(i, "documentid"); var CAMPEONATO = dsPalpite.getValue(i, "pCampeonato"); var JOGADOR = dsPalpite.getValue(i, "pJogadorMatricula"); var JOGO_ID = dsPalpite.getValue(i, "pJogo"); var PALPITE_A = dsPalpite.getValue(i, "pPalpiteTimeA"); var PALPITE_B = dsPalpite.getValue(i, "pPalpiteTimeB"); var PONTUACAO = (dsPalpite.getValue(i, "pPontuacao") == null || dsPalpite.getValue(i, "pPontuacao") == "" ? "0" : dsPalpite.getValue(i, "pPontuacao")); if (hJogadorPontuacao.containsKey(JOGADOR)) { var pontuacaoAntiga = parseInt(hJogadorPontuacao.get(JOGADOR)); var pontuacaoNova = parseInt(PONTUACAO); var total = pontuacaoAntiga + pontuacaoNova; var valor = total + "," + PALPITE_A + "," + PALPITE_B; hJogadorPontuacao.put(JOGADOR, valor); } else { var valor = parseInt(PONTUACAO) + "," + PALPITE_A + "," + PALPITE_B; hJogadorPontuacao.put(JOGADOR, valor); } } var iterator = hJogadorPontuacao.keySet().iterator(); while (iterator.hasNext()) { var jogadorId = iterator.next(); var jogadorLogin = getColleagueName(jogadorId).getValue(0, "login"); var jogadorNome = getColleagueName(jogadorId).getValue(0, "colleagueName"); var valor = hJogadorPontuacao.get(jogadorId); var pontuacao = valor.split(",")[0]; var palpiteA = valor.split(",")[1]; var palpiteB = valor.split(",")[2]; dataset.addRow(new Array(jogadorId, jogadorLogin, jogadorNome, pontuacao, palpiteA, palpiteB)); } log.info("-> BeforeReturn | Dataset | fdwt_bolao_ranking_jogo.js"); return dataset; } function onMobileSync(user) {} function getColleagueName(colleagueId) { var c1 = DatasetFactory.createConstraint('colleaguePK.colleagueId', colleagueId, colleagueId, ConstraintType.MUST); var dsColleague = DatasetFactory.getDataset('colleague', new Array('login', 'colleagueName'), new Array(c1), null); return dsColleague; }