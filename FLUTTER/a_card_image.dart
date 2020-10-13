import 'package:flutter/material.dart';

class ACardImage extends StatelessWidget {
  final String image;
  final String title;
  ACardImage({
    this.image,
    this.title
  });
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.all(3),
      padding: EdgeInsets.all(8),
      width: MediaQuery.of(context).size.width,
      decoration: BoxDecoration(
          color: Colors.white, borderRadius: BorderRadius.circular(8)),
      child: Column(
        children: <Widget>[
          Container(
            height: 165,
            width: MediaQuery.of(context).size.width,
            decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(8),
                image: DecorationImage(
                  fit: BoxFit.cover,
                  image: AssetImage(image),
                  colorFilter: ColorFilter.mode(Colors.black12, BlendMode.darken)
                )),
          ),
          SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              Text(
                title,
                style: TextStyle(fontWeight: FontWeight.w400, fontSize: 18),
              ),
              Container(
                height: 35,
                width: 35,
                child: Icon(Icons.arrow_forward_ios,
                size: 15,
                    color: Theme.of(context).primaryColor),
                decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(100),
                    border: Border.all(
                        width: 2, color: Theme.of(context).primaryColor)),
              )
            ],
          )
        ],
      ),
    );
  }
}
