import 'package:flutter/material.dart';

class RegistrationScreen extends StatefulWidget {
  @override
  _RegistrationScreenState createState() => _RegistrationScreenState();
}

class _RegistrationScreenState extends State<RegistrationScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Container(
          height: MediaQuery.of(context).size.height,
          width: MediaQuery.of(context).size.width,
          decoration: BoxDecoration(
              image: DecorationImage(
                  image: AssetImage("assets/images/couple.jpg"),
                  fit: BoxFit.cover,
                  colorFilter:
                      ColorFilter.mode(Colors.black12, BlendMode.darken))),
          child: Padding(
            padding: const EdgeInsets.only(left: 25, right: 25),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Spacer(),
                Image.asset("assets/images/coeur.png", height: 200, width: 200),
                Spacer(),
                // SizedBox(height: 20),
                InkWell(
                  onTap: () {
                  },
                  child: AuthButton(
                    logo: "assets/images/facebook.png",
                    backgroundColor: Colors.blue,
                    color: Colors.white,
                    content: "Poursuivre avec Facebook",
                  ),
                ),
                SizedBox(height: 20),
                InkWell(
                  onTap: () {},
                  child: AuthButton(
                    logo: "assets/images/téléchargement.png",
                    backgroundColor: Colors.white,
                    color: Colors.black,
                    content: "Poursuivre avec Google",
                  ),
                ),
                SizedBox(height: 20),
                InkWell(
                  onTap: () {},
                  child: Container(
                    alignment: Alignment.center,
                    padding: EdgeInsets.all(15),
                    width: MediaQuery.of(context).size.width,
                    decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(5)),
                    child: Text("Inscrivez vous avec votre mail"),
                  ),
                ),
                SizedBox(height: 20),
                FlatButton(
                    onPressed: () {
                    },
                    child: Text(
                      "Me connecter",
                      style: TextStyle(
                          color: Colors.white, fontWeight: FontWeight.w500),
                    )),
                FlatButton(
                    onPressed: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => LoginScreen()));
                    },
                    child: Text(
                      "M'inscrire plus tard",
                      style: TextStyle(
                          color: Colors.white, fontWeight: FontWeight.w500),
                    ))
              ],
            ),
          ),
        ),
      ),
    );
  }
}
