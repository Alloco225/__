import 'package:flutter/material.dart';
import 'package:smooth_star_rating/smooth_star_rating.dart';

class TestimonyComponent extends StatefulWidget {
  final String name;
  final String date;
  final double rate;
  final String content;
  final String image;
  TestimonyComponent({this.name, this.date, this.rate, this.content, this.image});
  @override
  _TestimonyComponentState createState() => _TestimonyComponentState();
}

class _TestimonyComponentState extends State<TestimonyComponent> {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: <Widget>[
          ListTile(
                contentPadding: EdgeInsets.all(0),
                leading: Container(
                  height:60,
                  width: 60,
                  decoration: BoxDecoration(
                    color: Theme.of(context).accentColor,
                    border: Border.all(width: 3, color: Theme.of(context).primaryColor),
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(50),
                      bottomLeft: Radius.circular(50),
                      bottomRight: Radius.circular(50),
                    ),
                    image: DecorationImage(
                      image: AssetImage(widget.image),
                      fit: BoxFit.cover
                    )
                  ),
                ),
                subtitle: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(
                      widget.date
                    ),
                    SizedBox(height: 4),
                    SmoothStarRating(
                    rating: widget.rate,
                    isReadOnly: false,
                    size: 16,
                    filledIconData: Icons.star,
                    halfFilledIconData: Icons.star_half,
                    defaultIconData: Icons.star_border,
                    starCount: 5,
                    allowHalfRating: true,
                    spacing: 2.0,
                    color: Colors.amber,
                    borderColor: Colors.amber,
                  ),
                  ],
                ),
                title: Text(
                  widget.name,
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 18,
                  ),
                )
              ),
              SizedBox(
                height:10
              ),
              Text(
                widget.content,
                style: TextStyle(
                  color: Colors.black38
                ),
              )
        ],
      ),
    );
  }
}
