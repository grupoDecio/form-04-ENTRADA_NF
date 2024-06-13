function createDataset(fields, constraints, sortFields) { log.info("Digte Public Form - @@@ Inicio Dataset ds_dpf_validateCredentials.js"); var dataset = DatasetBuilder.newDataset(); var login = ""; var password = ""; var serverUrl = ""; var userLocale = "pt_BR"; var connection = null; var isr = null; var la = null; try { if (constraints != null) { for (var i = 0; i < constraints.length; i++) { if (constraints[i].fieldName == "login" && constraints[i].initialValue != "") { login = constraints[i].initialValue; } else if (constraints[i].fieldName == "password" && constraints[i].initialValue != "") { password = constraints[i].initialValue; } else if (constraints[i].fieldName == "serverUrl" && constraints[i].initialValue != "") { serverUrl = constraints[i].initialValue; } else if (constraints[i].fieldName == "userLocale" && constraints[i].initialValue != "") { userLocale = constraints[i].initialValue; } } var message = ""; if (login == "") { message = objLocale["param-login-" + userLocale]; } else if (password == "") { message = objLocale["param-password-" + userLocale]; } else if (serverUrl == "") { message = objLocale["param-serverUrl-" + userLocale]; } if (message != "") { dataset.addColumn("message"); dataset.addRow([message]); return dataset; } log.info('Digte Public Form - chamada rest: ' + serverUrl + '/webdesk/ECMTokenService?wsdl'); var url = new java.net.URL(serverUrl + "/webdesk/ECMTokenService?wsdl"); connection = url.openConnection(); connection.setDoOutput(true); var postData = new java.lang.StringBuilder(); postData.append('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dm.ecm.technology.totvs.com/">'); postData.append("<soapenv:Header/>"); postData.append("<soapenv:Body>"); postData.append("<ws:getToken>"); postData.append("<login>" + login + "</login>"); postData.append("<password>" + password + "</password>"); postData.append("</ws:getToken>"); postData.append("</soapenv:Body>"); postData.append("</soapenv:Envelope>"); connection.setRequestMethod("POST"); var SOAPAction = "getToken"; connection.setRequestProperty("Content-Type", "text/xml; charset=utf-8"); connection.setRequestProperty("SOAPAction", SOAPAction); var os = connection.getOutputStream(); os.write(postData.toString().getBytes()); os.flush(); var retorno = connection.getResponseCode(); isr = new java.io.InputStreamReader(connection.getInputStream()); la = new java.io.BufferedReader(isr); var mensagem = new java.lang.String(postData); var posIni = mensagem.indexOf("<password>") + 10; var posFim = mensagem.indexOf("</password>"); var senha = mensagem.substring(posIni,posFim); mensagem = mensagem.replace("<password>" + senha + "</password>", "<password>************</password>" ); log.info('Digte Public Form - xml: >>>>>>> '+mensagem); var responseString = ""; var outputString = ""; while ((responseString = la.readLine()) != null) { outputString = outputString + responseString; } var dbf = javax.xml.parsers.DocumentBuilderFactory.newInstance(); var db = dbf.newDocumentBuilder(); var stringReader = new java.io.StringReader(outputString); var xml = db.parse( new org.xml.sax.InputSource(stringReader)); var result = xml.getElementsByTagName("result"); var items = result.item(0).getChildNodes(); var itemsLength = items.getLength(); stringReader.close(); if (itemsLength > 0) { dataset.addColumn("message"); for (var i = 0; i < itemsLength; i++) { var resultado = items.item(i).getTextContent().trim(); dataset.addRow([resultado]); } return dataset; } else { dataset.addColumn("message"); dataset.addRow(["@@ Falha ao validar credenciais."]); return dataset; } } else { dataset.addColumn("message"); dataset.addRow(["@@ Não foram informados os parâmetros."]); return dataset; } } catch (e) { log.info("Digte Public Form - @@ Catch exceção ao executar getToken " + e); dataset.addColumn("message"); dataset.addRow(["@@ Catch exceção ao executar getToken " + e]); return dataset; } finally { if(isr != null) isr.close(); if(la != null) la.close(); if(connection != null) connection.disconnect(); } log.info("Digte Public Form - @@@ Fim Dataset ds_dpf_validateCredentials.js"); return dataset; } var objLocale = { "param-login-pt_BR": "@@ Parametro |login| não informado.", "param-login-en_US": "@@ Parameter |login| uninformed.", "param-login-es": "@@ Parámetro |login| no informado.", "param-password-pt_BR": "@@ Parametro |password| não informado.", "param-password-en_US": "@@ Parameter |password| uninformed.", "param-password-es": "@@ Parámetro |password| no informado.", "param-serverUrl-pt_BR": "@@ Parametro |serverUrl| não informado.", "param-serverUrl-en_US": "@@ Parameter |serverUrl| uninformed.", "param-serverUrl-es": "@@ Parámetro |serverUrl| no informado.", }