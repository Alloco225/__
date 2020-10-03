import 'package:flutter/material.dart';

class AuthButton extends StatelessWidget {
  final String logo;
  final Color backgroundColor;
  final String content;
  final Color color;
  AuthButton(
    {
      this.logo, this.backgroundColor, this.content, this.color
    }
  );
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(15),
      width: MediaQuery.of(context).size.width,
      decoration: BoxDecoration(
          color: backgroundColor,
           borderRadius: BorderRadius.circular(5)),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Image.asset(
            logo,
            height: 20,
            width: 20,
            fit: BoxFit.cover,
          ),
          SizedBox(width: 20),
          Text(
            content,
            style: TextStyle(
              fontWeight: FontWeight.w400,
              color: color
            ),
          )
        ],
      ),
    );
  }
}
