public class NumerosRomanosTdd {
    static string n1 = "I";
    static string n5 = "V";
    static string n10= "X";
    static string n50= "L";
    static string n100="C";
    public String conversorNumerico(int numero){
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < numero; i++) {
            if (i <= 3) {
                sb.append(n1);
            } else if (i == 4) {
                sb.append(n1+n5);
            } else if (i > 4) {
                sb.append(n5+n1);
            }else if (i == 9){
                sb.append(n1+n10);
            }
        }
    }
}
