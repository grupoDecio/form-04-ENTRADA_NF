function createDataset(fields, constraints, sortFields) { log.info("Digte Public Form - @@@ Inicio Dataset ds_dpf_converter_string_to_base64.js"); var dataset = DatasetBuilder.newDataset(); dataset.addColumn("encoded"); dataset.addColumn("decoded"); var stringValue = ""; if (constraints != null) { for (var i = 0; i < constraints.length; i++) { if (constraints[i].fieldName == "stringValue" && constraints[i].initialValue != "") { stringValue = constraints[i].initialValue; stringValue = stringValue.trim(); } } } log.info("Digte Public Form - @@@@@@@@@@@@@@ Valor Original: " + stringValue); var str = new java.lang.String(stringValue); var decoded = ""; var encoded = ""; if (stringValue.matches("[0-9]+")) { /* Encode */ var auxLong = new java.lang.Long(stringValue); var auxLong = auxLong * 1000; str = new java.lang.String(auxLong); /* Encode */ var asB64 = java.util.Base64.getEncoder().encodeToString(str.getBytes("utf-8")); var auxStr = new java.lang.String(textoAleatorio(13) + asB64); /* Output will be: c29tZSBzdHJpbmc= */ encoded = java.util.Base64.getEncoder().encodeToString(auxStr.getBytes("utf-8")); log.info("Digte Public Form - @@@@@@@@@@@@@@ Valor Encode: " + encoded); } else { /* Decode */ var asB641 = java.util.Base64.getDecoder().decode(str); try /* tira prefixo */ { if (str.length() > 13) { var auxStr = new java.lang.String(asB641); var cAjuste = new java.lang.String(); cAjuste = auxStr.substring(13,auxStr.length()); str = cAjuste; } } catch (e) { log.info("Digte Public Form - @@@@@@@@@@@@@@ e: " + e); log.info("Digte Public Form - @@@@@@@@@@@@@@ e.message: " + e.message); } var asBytes = java.util.Base64.getDecoder().decode(str); var aux = new java.lang.String(asBytes, "utf-8"); /* And the output is: some string */ var auxLong = new java.lang.Long(aux); var auxLong = auxLong / 1000; decoded = new java.lang.String(auxLong); log.info("Digte Public Form - @@@@@@@@@@@@@@ Valor Decode: " + decoded); } dataset.addRow(new Array(encoded, decoded)); log.info("Digte Public Form - @@@ Fim Dataset ds_dpf_converter_string_to_base64.js"); return dataset; } function textoAleatorio(tamanho) { try{ var letras = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz"; var aleatorio = ""; for (var i = 0; i < tamanho; i++) { var rnum = Math.floor(Math.random() * letras.length); aleatorio += letras.substring(rnum, rnum + 1); } } catch (e) { log.info("Digte Public Form - @@@@@@@@@@@@@@ e: " + e); log.info("Digte Public Form - @@@@@@@@@@@@@@ e.message: " + e.message); } return aleatorio; }