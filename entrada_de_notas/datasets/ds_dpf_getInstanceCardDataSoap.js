function createDataset(fields, constraints, sortFields) { log.info("Digte Public Form - @@@ Inicio Dataset ds_dpf_getInstanceCardDataSoap.js"); var dataset = DatasetBuilder.newDataset(); var user = ""; var password = ""; var company = ""; var processInstanceId = ""; var serverUrl = ""; var userId = ""; try { if (constraints != null) { for (var i = 0; i < constraints.length; i++) { if (constraints[i].fieldName == "user" && constraints[i].initialValue != "") { user = constraints[i].initialValue; } else if (constraints[i].fieldName == "password" && constraints[i].initialValue != "") { password = constraints[i].initialValue; } else if (constraints[i].fieldName == "company" && constraints[i].initialValue != "") { company = constraints[i].initialValue; } else if (constraints[i].fieldName == "serverUrl" && constraints[i].initialValue != "") { serverUrl = constraints[i].initialValue; } else if (constraints[i].fieldName == "processInstanceId" && constraints[i].initialValue != "") { processInstanceId = constraints[i].initialValue; } else if (constraints[i].fieldName == "userId" && constraints[i].initialValue != "") { userId = constraints[i].initialValue; } } var message = ""; if (user == "") { message = "@@ Parametro 'user' não informado."; } else if (password == "") { message = "@@ Parametro 'password' não informado."; } else if (company == "") { message = "@@ Parametro 'company' não informado."; } else if (serverUrl == "") { message = "@@ Parametro 'serverUrl' não informado."; } else if (processInstanceId == "") { message = "@@ Parametro 'processInstanceId' não informado."; } else if (userId == "") { message = "@@ Parametro 'userId' não informado."; } if (message != "") { dataset.addColumn("message"); dataset.addRow([message]); return dataset; } log.info('Digte Public Form - chamada rest: ' + serverUrl + '/webdesk/ECMWorkflowEngineService?wsdl'); var url = new java.net.URL(serverUrl + "/webdesk/ECMWorkflowEngineService?wsdl"); var isr = null; var la = null; var connection = url.openConnection(); connection.setDoOutput(true); log.info('Digte Public Form - conexao realizada'); var postData = new java.lang.StringBuilder(); postData.append('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.workflow.ecm.technology.totvs.com/">'); postData.append("<soapenv:Header/>"); postData.append("<soapenv:Body>"); postData.append("<ws:getInstanceCardData>"); postData.append("<username>" + user + "</username>"); postData.append("<password>" + password + "</password>"); postData.append("<companyId>" + company + "</companyId>"); postData.append("<userId>" + userId + "</userId>"); postData.append("<processInstanceId>" + processInstanceId + "</processInstanceId>"); postData.append("</ws:getInstanceCardData>"); postData.append("</soapenv:Body>"); postData.append("</soapenv:Envelope>"); connection.setRequestMethod("POST"); var SOAPAction = "getInstanceCardData"; connection.setRequestProperty("Content-Type", "text/xml; charset=utf-8"); connection.setRequestProperty("SOAPAction", SOAPAction); var os = connection.getOutputStream(); os.write(postData.toString().getBytes()); os.flush(); var retorno = connection.getResponseCode(); var isr = new java.io.InputStreamReader(connection.getInputStream()); var la = new java.io.BufferedReader(isr); var mensagem = new java.lang.String(postData); var posIni = mensagem.indexOf("<password>") + 10; var posFim = mensagem.indexOf("</password>"); var senha = mensagem.substring(posIni,posFim); mensagem = mensagem.replace("<password>" + senha + "</password>", "<password>************</password>" ); log.info('Digte Public Form - xml: >>>>>>> '+mensagem); var responseString = ""; var outputString = ""; /* Write the SOAP message response to a String. */ while ((responseString = la.readLine()) != null) { outputString = outputString + responseString; } if (isr != null) { isr.close(); } if (la != null) { la.close(); } if (connection != null) { connection.disconnect(); } var dbf = javax.xml.parsers.DocumentBuilderFactory.newInstance(); var db = dbf.newDocumentBuilder(); var stringReader = new java.io.StringReader(outputString); var xml = db.parse( new org.xml.sax.InputSource(stringReader)); var CardData = xml.getElementsByTagName("CardData"); var items = CardData.item(0).getChildNodes(); var itemsLength = items.getLength(); stringReader.close(); if (itemsLength > 0) { dataset.addColumn("field"); dataset.addColumn("value"); for (var i = 0; i < itemsLength; i++) { var field = items.item(i).getChildNodes(); dataset.addRow([field.item(0).getTextContent().trim(), field.item(1).getTextContent().trim()]); } return dataset; } else { dataset.addColumn("message"); dataset.addRow(["@@ Falha ao consultar Thread."]); return dataset; } } else { dataset.addColumn("message"); dataset.addRow(["@@ Não foram informados os parâmetros."]); return dataset; } } catch (e) { if (isr != null) { isr.close(); } if (la != null) { la.close(); } if (connection != null) { connection.disconnect(); } log.info("Digte Public Form - @@ Catch exceção ao executar startProcess " + e); dataset.addColumn("message"); dataset.addRow(["@@ Catch exceção ao executar startProcess " + e]); return dataset; } log.info("Digte Public Form - @@@ Fim Dataset ds_dpf_getInstanceCardDataSoap.js"); return dataset; }