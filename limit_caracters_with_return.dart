get observationsFormatted {
    print(">>> obs");
    print(observations);
    String r = observations;
    if (observations != null) {
      // new version
      // if (observations.length > 50) {
      //   return observations.substring(0, 49);
      // }
      // return observations;

      int total = observations.length;
      int rounds = (total / 50).floor();
      int remaining = total % 50;
      int i = 0;

      if (rounds == 0) {
        return r;
      }
      r = "";
      while (i < rounds) {
        r += observations.substring(50 * i, (50 * (i + 1)) - 1);
        r += "\n";
        i++;
      }
      // return "$i $remaining ${50 * i},${50 * i + remaining - 1}  ${observations.length}";
      if(remaining > 0){
        r += observations.substring(50 * i, 50 * i + remaining - 1);
      }
    }

    return r;
  }
