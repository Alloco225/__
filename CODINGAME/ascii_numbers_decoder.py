import sys
import math

# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.

line_1 = input()
line_2 = input()
line_3 = input()

# Write an answer using print
# To debug: print("Debug messages...", file=sys.stderr, flush=True)
result_number = ""

for i in range(0, len(line_1), 3):
    number = ""
    if(line_1[i:i+3] == "   "): # 1 or 4
        if(line_2[i:i+3] == "  |"): # 1
            number = "1"
        else:
            number = "4"
    elif(line_1[i:i+3] == " _ "): # 0 2 3 5 6 7 8 9
        if(line_2[i:i+3] == "| |"): # 0
            number = "0"
        elif (line_2[i:i+3] == "  |"): # 7
            number = "7"
        elif (line_2[i:i+3] == " _|"): # 2 3
            if (line_3[i:i+3] == "|_ "): # 2
                number = "2"
            else :
                number = "3"
        elif (line_2[i:i+3] == "|_ "): # 5 6
            if (line_3[i:i+3] == " _|"): # 5
                number = "5"
            else:
                number = "6"
        # elif (line_2[i:i+3] == "|_|"): # 8 9
        else:
            if (line_3[i:i+3] == "|_|"): # 8
                number = "8"
            else:
                number = "9"
    result_number+= number
print(result_number)

