import 'package:flutter/material.dart';

class ArticleCard extends StatelessWidget {
  final String name;
  final String image;
  final int price;
  ArticleCard({this.name, this.image, this.price});
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Stack(
        children: <Widget>[
          Container(
            padding: EdgeInsets.all(6),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Container(
              decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(8),
                  image: DecorationImage(
                      image: AssetImage(image),
                      fit: BoxFit.cover)),
            ),
          ),
          Positioned(
            top: 20,
            left: 0,
            child: Container(
              width: 50,
              padding: EdgeInsets.all(5),
              decoration: BoxDecoration(
                  color: Theme.of(context).accentColor,
                  borderRadius: BorderRadius.only(
                    bottomRight: Radius.circular(10),
                    topLeft: Radius.circular(10),
                  )),
              child: Text(
                "$price",
                style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),

          Positioned(
            bottom: 5,
            right: 5,
            child: Container(
              alignment: Alignment.center,
              padding: EdgeInsets.all(10),
              decoration: BoxDecoration(
              color: Colors.black38,
                borderRadius: BorderRadius.only(
                  bottomRight: Radius.circular(8)
                )
              ),
              child: Text(
                name,
                style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold
                ),
              ),
            ),
          )
        ],
      ),
    );
  }
}
