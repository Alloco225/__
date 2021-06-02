get observationsFormatted {
    String r = "";
    int total = observations.length;
    int rounds = (total / 50).floor();
    int remaining = total % 50;
    int i = 0;
    while (i < rounds) {
      r += observations.substring(50 * i, (50 * (i + 1)) - 1);
      r += "\n";
      i++;
    }
    r += observations.substring(i, remaining);

    return r;
  }
