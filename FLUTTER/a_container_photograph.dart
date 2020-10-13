import 'package:flutter/material.dart';

class AContainerPhotograph extends StatelessWidget {
  final String image;
  final String name;
  final String price;
  AContainerPhotograph({this.image, this.name, this.price});

  var rating = 3.0;
  @override
  Widget build(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width,
      color: Colors.white,
      padding: EdgeInsets.all(8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Image.asset(
            image,
            fit: BoxFit.cover,
            height: 105,
            width: MediaQuery.of(context).size.width,
          ),
          SizedBox(height: 5),
          Text(
            name,
            style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 6),
          Row(
            children: <Widget>[
              Icon(Icons.star, color: Colors.amber, size: 20),
              Icon(Icons.star, color: Colors.amber, size: 20),
              Icon(Icons.star, color: Colors.amber, size: 20),
              Icon(Icons.star_border, color: Colors.amber, size: 20),
              Icon(Icons.star_border, color: Colors.amber, size: 20),
              SizedBox(width: 10),
              Text(
                "(Photo de mariage)",
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.w400),
              ),
            ],
          ),
          Divider(),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Text(
                "Tarif à partir de ",
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.w400),
              ),
              SizedBox(height: 8),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Container(
                    padding: EdgeInsets.all(10),
                    decoration: BoxDecoration(
                        color: Theme.of(context).accentColor,
                        borderRadius: BorderRadius.circular(3)),
                    child: Text(
                      price,
                      style: TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.bold,
                          color: Colors.white),
                    ),
                  ),
                  InkWell(
                    onTap: () {},
                    child: Container(
                        padding: EdgeInsets.all(8),
                        decoration: BoxDecoration(
                            color: Theme.of(context).primaryColor,
                            borderRadius: BorderRadius.circular(3)),
                        child:
                            Icon(Icons.remove_red_eye, color: Colors.white70)),
                  ),
                ],
              )
            ],
          ),
        ],
      ),
    );
  }
}
