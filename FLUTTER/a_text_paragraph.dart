import 'package:flutter/material.dart';

class ATextParagraph extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(8),
      child: Column(
        children: <Widget>[
          Text(
            "POURQUOI GERER SON BUDGET ?",
            textAlign: TextAlign.center,
            style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 19,
                color: Theme.of(context).accentColor),
          ),
          SizedBox(height: 20),
          Container(
            alignment: Alignment.center,
            height: 5,
            width: MediaQuery.of(context).size.width / 6,
            color: Theme.of(context).primaryColor,
          ),
          SizedBox(height: 20),
          Container(
            padding: EdgeInsets.only(left: 10),
            alignment: Alignment.topLeft,
            decoration: BoxDecoration(
                border: Border(
                    left: BorderSide(
                        color: Theme.of(context).accentColor, width: 5))),
            child: Text(
                "Qu'est-ce que le Lorem Ipsum?Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre ."),
          )
        ],
      ),
    );
  }
}
