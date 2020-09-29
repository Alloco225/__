import 'dart:io';
import 'dart:math';

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
void main() {
    List inputs;
    int n = int.parse(stdin.readLineSync()); // the number of temperatures to analyse
    inputs = stdin.readLineSync().split(' ');
    if(n == 0){
        print(0); 
        return ; 
    }

    int lowest = int.parse(inputs[0]);

    for (int i = 1; i < n; i++) {
        int t = int.parse(inputs[i]); // a temperature expressed as an integer ranging from -273 to 5526
        if(lowest.abs() > t.abs()){
            lowest = t;
        }else if(lowest.abs() == t.abs()){
            if(lowest < t){
                lowest = t;
            }
        }
    }
    print(lowest);
    // Write an answer using print()
    // To debug: stderr.writeln('Debug messages...');

}
