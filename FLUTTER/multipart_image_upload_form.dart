import 'dart:convert';
import 'dart:io';

import 'package:ekipinventory/providers/etats.dart';
import 'package:ekipinventory/providers/marques.dart';
import 'package:provider/provider.dart';

import 'package:flutter_image_compress/flutter_image_compress.dart';
import 'package:path_provider/path_provider.dart' as path_provider;

import '../routes.dart';
import '../widgets/snackbar.dart';
import '../providers/biens.dart';
import '../providers/categories.dart';
import '../providers/fournisseurs.dart';
import '../models/bien.dart';
import 'package:combos/combos.dart';
import 'package:flutter/material.dart';
import 'package:image_picker_gallery_camera/image_picker_gallery_camera.dart';
import 'package:intl/intl.dart';
import 'package:progress_dialog/progress_dialog.dart';

class AjouterModifierBienScreen extends StatefulWidget {
  AjouterModifierBienScreen({Key key}) : super(key: key);

  @override
  _AjouterModifierBienScreenState createState() =>
      _AjouterModifierBienScreenState();
}

class _AjouterModifierBienScreenState extends State<AjouterModifierBienScreen> {
  GlobalKey _scaffoldKey = GlobalKey<ScaffoldState>();
  TextEditingController _nomInput;
  TextEditingController _prixInput;
  TextEditingController _detailsInput;
  TextEditingController _quantiteInput;
  TextEditingController _modeleInput;

  // date picker
  TextEditingController _dateAcquisitionInput;
  TextEditingController _dateFinGarantieInput;

  String _categorie = "Catégories";
  String _fournisseur = "Fournisseurs";
  String _etat = "actif";
  String _marque = "Marque";

  Bien _bien;
  int _bienId;

  var _isLoading = true;
  var _isInit = true;

  List<String> categories = [];
  List<String> fourn = [];

  File _image;
  String img64;
  // int catId, fournId;

  DateTime selectedDate = DateTime.now();
  ProgressDialog pr;

  @override
  void initState() {
    super.initState();
    _nomInput = TextEditingController();
    _prixInput = TextEditingController();
    _detailsInput = TextEditingController();
    _quantiteInput = TextEditingController();
    _modeleInput = TextEditingController();
    _dateAcquisitionInput = TextEditingController();
    _dateFinGarantieInput = TextEditingController();
  }

  @override
  void didChangeDependencies() {
    print("\n\n >>>SS ajouter_modifier_bien_screen");

    print("\n\n didChangeDependencies()");
    var args = ModalRoute.of(context).settings.arguments;

    if (_isInit) {
      print("\n\n >>_isInit");
      if (args != null && args is Bien) {
        print(">>> args supplied");
        _bien = args;
        _bienId = args.id;
        _nomInput..text = args.nom;
        _prixInput..text = args.prix;
        _detailsInput..text = args.details;
        _quantiteInput..text = args.quantite;
        _modeleInput..text = args.modele;
        _dateAcquisitionInput..text = args.date_acquisition;
        _dateFinGarantieInput..text = args.date_fin_garantie;
        //
        _etat = args.etat;
        _categorie = args.categorie;
        _fournisseur = args.fournisseur;
        _marque = args.marque;
        print(">>> id = $_bienId");
      }
      _setUpLists();
      _isInit = false;
    }
    _isLoading = false;

    setState(() {});

    pr = ProgressDialog(context);

    pr.style(
        message: 'Merci de patienter...',
        borderRadius: 10.0,
        backgroundColor: Colors.white,
        progressWidget: CircularProgressIndicator(),
        elevation: 10.0,
        insetAnimCurve: Curves.easeInOut,
        progress: 1.0,
        maxProgress: 2.0,
        progressTextStyle: TextStyle(
            color: Colors.black, fontSize: 13.0, fontWeight: FontWeight.w400),
        messageTextStyle: TextStyle(
            color: Colors.black, fontSize: 19.0, fontWeight: FontWeight.w600));
    super.didChangeDependencies();
  }

  _setUpLists() async {
    print("\n\n>> _setUpLists");
    _isLoading = true;
    Provider.of<Etats>(context).fetchAndSetEtats();
    Provider.of<Marques>(context).fetchAndSetMarques();
    Provider.of<Categories>(context).fetchAndSetCategories();
    Provider.of<Fournisseurs>(context).fetchAndSetFournisseurs();
    _isLoading = false;
    setState(() {});
  }

  @override
  void dispose() {
    super.dispose();
  }

  _pickImage() async {
    var image = await ImagePickerGC.pickImage(
      context: context,
      source: ImgSource.Both,
      maxHeight: 50,
      maxWidth: 50,
    );

    if (image != null) {
      var dir = await path_provider.getTemporaryDirectory();
      var targetPath = dir.absolute.path +
          "/temp" +
          DateTime.now().hour.toString() +
          '-' +
          DateTime.now().minute.toString() +
          '-' +
          DateTime.now().second.toString() +
          ".png";

      var imgFile = await FlutterImageCompress.compressAndGetFile(
          image.path, targetPath);

      if (imgFile != null) {
        if (mounted) {
          setState(() {
            _image = imgFile;
          });
        }
      }
    }
  }

  // showdatepicker
  showDatePickrDialog(BuildContext context) {
    Future<DateTime> selectedDate = showDatePicker(
      context: context,
      initialDate: DateTime(2020),
      firstDate: DateTime(2020),
      lastDate: DateTime(2099),
      builder: (BuildContext context, Widget child) {
        return Theme(
          data: ThemeData.dark(),
          child: child,
        );
      },
    );
    selectedDate.then((value) {
      var date = DateFormat('dd-MM-yyyy').format(value);
      print("SELECTED_DATE==$date");
    });
  }

  _validate() {
    print(">> _validate bien");

    if (_nomInput.text.isEmpty ||
        _prixInput.text.isEmpty ||
        _detailsInput.text.isEmpty ||
        _quantiteInput.text.isEmpty ||
        _categorie == null ||
        _fournisseur == null ||
        _marque == null ||
        _etat == null ||
        _dateAcquisitionInput.text.isEmpty ||
        _dateFinGarantieInput.text.isEmpty ||
        _modeleInput.text.isEmpty) {
      ASnackBar.show(
        _scaffoldKey,
        "Merci de bien renseigner les champs et de choisir une image de votre bien",
      );
      return;
    }
    pr.show();

    // if (_dateAcquisitionInput.text >= _dateFinGarantieInput.text) {
    //   ASnackBar.show(
    //     _scaffoldKey,
    //     "Mercie votre bien",
    //   );
    //   return;
    // }
    // if (_bien != null) {}

    Bien bien = Bien(
      id: _bienId,
      nom: _nomInput.text,
      prix: _prixInput.text,
      details: _detailsInput.text,
      quantite: _quantiteInput.text,
      // photo: img64 ?? _bien?.photo ?? null,
      date_acquisition: _dateAcquisitionInput.value.text,
      date_fin_garantie: _dateFinGarantieInput.value.text,
      modele: _modeleInput.value.text,
      categorie: _categorie,
      fournisseur: _fournisseur,
      marque: _marque,
      etat: _etat,
    );
    bien.log();
    _save(bien);
  }

  _save(Bien bien) async {
    print(">> _save Bien ${bien?.id}");
    if (_bienId == null) {
      await _addNewBien(bien);
    } else {
      await _updateBien(bien);
    }

    await _setUpLists();
    setState(() {});
  }

  _emptyFields() {
    _nomInput..text = "";
    _prixInput..text = "";
    _detailsInput..text = "";
    _quantiteInput..text = "";
    _modeleInput..text = "";
    //
    _etat = "";
    _categorie = "";
    _fournisseur = "";
    _marque = "";
  }

  _addNewBien(bien) async {
    try {
      await Provider.of<Biens>(context).addBien(bien, imageFile: _image);
      ASnackBar.show(
        _scaffoldKey,
        "Bien ajouté avec success",
      );
      pr.hide();
      showDialog(
          context: context,
          child: AlertDialog(
            title: Text("Ajouter un autre bien ?"),
            actions: [
              FlatButton(
                  onPressed: _emptyFields, child: Text("Ajouter un autre")),
              RaisedButton(
                onPressed: _gotoListeBien,
                child: Text("Liste des biens"),
              ),
            ],
          ));
      // _emptyFields();
    } catch (e) {
      pr.hide();
      ASnackBar.show(
        _scaffoldKey,
        "Impossible d'ajouter le bien",
      );
    }
  }

  _updateBien(Bien bien) async {
    try {
      await Provider.of<Biens>(context).updateBien(bien.id, bien, imageFile: _image);

      ASnackBar.show(
        _scaffoldKey,
        "Bien mis à jour avec success",
      );
      // _emptyFields();
      pr.hide();
      await Future.delayed(Duration(seconds: 2));
      _gotoListeBien();
    } catch (e) {
      pr.hide();
      ASnackBar.show(
        _scaffoldKey,
        "Impossible de mettre à jour le bien",
      );
    }
  }

  _gotoListeBien() =>
      Navigator.of(context).pushReplacementNamed(Routes.listeBien);

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return new Scaffold(
      key: _scaffoldKey,
      appBar: AppBar(
        centerTitle: true,
        title: Text(
          (_bienId != null ? "Modifier" : "Ajout") + " Bien",
          textAlign: TextAlign.center,
          textScaleFactor: 1.2,
          style: TextStyle(fontWeight: FontWeight.bold, color: Colors.black),
        ),
        actions: [
          Image.asset(
            "assets/images/Logo.jpg",
            height: 50,
          ),
        ],
      ),
      body: _isLoading
          ? Center(
              child: CircularProgressIndicator(),
            )
          : Container(
              height: MediaQuery.of(context).size.height,
              width: MediaQuery.of(context).size.width,
              child: ListView(
                padding: EdgeInsets.all(10),
                children: [
                  SizedBox(
                    height: 20,
                  ),
                  Text(
                    "Merci de Renseigner le formulaire ci-dessous",
                    textScaleFactor: 1.5,
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(
                    height: 40,
                  ),
                  Wrap(
                    children: [
                      TextFormField(
                        controller: _nomInput,
                        decoration: InputDecoration(
                            hintText: "Nom du bien",
                            border: OutlineInputBorder(
                                borderRadius:
                                    BorderRadius.all(Radius.circular(5)))),
                      ),
                    ],
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  Wrap(
                    children: <Widget>[
                      TextFormField(
                        controller: _dateAcquisitionInput,
                        decoration: InputDecoration(
                          icon: Icon(
                            Icons.calendar_today,
                            color: Colors.blue,
                          ),
                          labelText: "Date d'acquisition",
                          hintText: "Ex. 28/09/1996",
                          hintStyle: TextStyle(fontSize: 20.0),
                        ),
                        onTap: () async {
                          DateTime date = DateTime(2020);
                          FocusScope.of(context).requestFocus(new FocusNode());

                          date = await showDatePicker(
                              context: context,
                              initialDate: DateTime.now(),
                              firstDate: DateTime(2021),
                              lastDate: DateTime(2099));
                          _dateAcquisitionInput.text =
                              DateFormat('dd-MM-yyyy').format(date);
                        },
                      ),
                      TextFormField(
                        controller: _dateFinGarantieInput,
                        decoration: InputDecoration(
                          icon: Icon(
                            Icons.calendar_today,
                            color: Colors.blue,
                          ),
                          labelText: "Date de garantie",
                          hintText: "Ex. 28/09/1996",
                          hintStyle:
                              TextStyle(fontSize: 20.0, color: Colors.blue),
                        ),
                        onTap: () async {
                          DateTime date = DateTime(2020);
                          FocusScope.of(context).requestFocus(new FocusNode());

                          date = await showDatePicker(
                              context: context,
                              initialDate: DateTime.now(),
                              firstDate: DateTime(2021),
                              lastDate: DateTime(2099));
                          _dateFinGarantieInput.text =
                              DateFormat('dd-MM-yyyy').format(date);
                        },
                      ),
                    ],
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  Wrap(
                    children: [
                      TextFormField(
                        controller: _modeleInput,
                        decoration: InputDecoration(
                            hintText: "Modele",
                            border: OutlineInputBorder(
                                borderRadius:
                                    BorderRadius.all(Radius.circular(5)))),
                      )
                    ],
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  Wrap(
                    children: [
                      TextFormField(
                        controller: _detailsInput,
                        maxLines: 4,
                        decoration: InputDecoration(
                            hintText: "Détails",
                            border: OutlineInputBorder(
                                borderRadius:
                                    BorderRadius.all(Radius.circular(5)))),
                      )
                    ],
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  Wrap(
                    children: [
                      TextFormField(
                        keyboardType: TextInputType.number,
                        controller: _prixInput,
                        decoration: InputDecoration(
                            hintText: "Prix",
                            border: OutlineInputBorder(
                                borderRadius:
                                    BorderRadius.all(Radius.circular(5)))),
                      )
                    ],
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  Wrap(
                    children: [
                      TextFormField(
                        controller: _quantiteInput,
                        keyboardType: TextInputType.number,
                        decoration: InputDecoration(
                            hintText: "Quantité",
                            border: OutlineInputBorder(
                                borderRadius:
                                    BorderRadius.all(Radius.circular(5)))),
                      )
                    ],
                  ),
                  ..._buildComboList(
                    type: "etat",
                    value: _etat,
                    dataSource: Provider.of<Etats>(context).noms,
                  ),
                  ..._buildComboList(
                    type: "categorie",
                    value: _categorie,
                    dataSource: Provider.of<Categories>(context).noms,
                  ),
                  ..._buildComboList(
                    type: "marque",
                    value: _marque,
                    dataSource: Provider.of<Marques>(context).noms,
                  ),
                  ..._buildComboList(
                    type: "fournisseur",
                    value: _fournisseur,
                    dataSource: Provider.of<Fournisseurs>(context).noms,
                  ),
                  Text(
                    "Image",
                    textAlign: TextAlign.center,
                  ),
                  GestureDetector(
                      onTap: _pickImage,
                      child: (_image != null)
                          ? Container(
                              height: 100,
                              width: 100,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                image: DecorationImage(
                                  image: FileImage(_image),
                                  fit: BoxFit.contain,
                                ),
                              ),
                            )
                          : Container(
                              height: 100,
                              width: 100,
                              decoration: BoxDecoration(
                                color: Colors.lightBlue,
                                shape: BoxShape.circle,
                              ),
                              // child: new Center(child: Icon(Icons.camera_enhance_sharp,size: 80,),),
                              child: _bien != null
                                  ? Image.network(
                                      _bien.photo,
                                    )
                                  : Center(
                                      child: Icon(
                                        Icons.camera_enhance,
                                        size: 80,
                                      ),
                                    ),
                            )),
                  SizedBox(
                    height: 10,
                  ),
                  GestureDetector(
                    onTap: _validate,
                    child: Container(
                      height: 50,
                      width: 100,
                      decoration: BoxDecoration(
                          color: Colors.blue,
                          borderRadius: BorderRadius.all(Radius.circular(20))),
                      child: Center(
                        child: Text(
                          _bienId != null ? "Modifier bien" : "Ajouter bien",
                          textScaleFactor: 1.3,
                          style: TextStyle(color: Colors.white),
                        ),
                      ),
                    ),
                  )
                ],
              ),
            ),
    );
  }

  List<Widget> _buildComboList({
    @required String type,
    @required String value,
    @required List<String> dataSource,
  }) {
    var _c = type[0].toUpperCase();
    var _default = _c + type.substring(1);
    return [
      SizedBox(
        height: 10,
      ),
      if (_etat != _default) Text("$_default"),
      SizedBox(
        height: 10,
      ),
      Wrap(
        children: [
          ListCombo<String>(
            closeAfterItemTapped: true,
            child: Padding(
              padding: EdgeInsets.all(16),
              child: Text("$value"),
            ),
            getList: () async => dataSource,
            // getList: () async {
            //   List c = await dataSource;
            //   return c;
            // },
            itemBuilder: (context, parameters, item) =>
                ListTile(title: Text(item)),
            onItemTapped: (item) {
              print(item);
              switch (type) {
                case "etat":
                  _etat = item.toString();
                  break;
                case "categorie":
                  _categorie = item.toString();
                  break;
                case "fournisseur":
                  _fournisseur = item.toString();
                  break;
                case "marque":
                  _marque = item.toString();
                  break;
              }
              setState(() {});
            },
          )
        ],
      ),
    ];
  }
}
