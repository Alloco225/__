Future<void> addBien(Bien bien, {File imageFile}) async {
    const url = Env.API_URL + "biens";

    // request.headers.addAll({
    //   "Authorization":  " Client-ID $clientId"
    // });

    print("\n\n>>> addBien $url");
    bien.log();
    try {
      var request = http.MultipartRequest('POST', Uri.parse(url));

      request.files.add(http.MultipartFile.fromBytes(
          'photo', imageFile.readAsBytesSync(),
          filename: imageFile.path));
      request.fields.addAll(bien.toJson());

      var streamedResponse = await request.send();

      final response = await http.Response.fromStream(streamedResponse);

      if (response.statusCode != 200) {
        print(response.body);
        throw HttpException("Erreur lors de l'ajout du bien");
      }
      final responseData = json.decode(response.body);
      print("\n\n<<< addBien");
      print(responseData);
      print("\n\n\n");
      final bienData = responseData["data"];
      if (bienData == null) {
        throw HttpException("Erreur lors de l'ajout du bien");
      }

      final Bien _createdBien = Bien.fromJson(bienData);
      _items.insert(0, _createdBien);
      print("\n<<< bienAdded success");
      notifyListeners();
      return;
    } catch (error) {
      print("<<xx Exception addBien");
      print(error);
      throw error;
    }
  }
