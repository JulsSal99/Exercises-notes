using System;

namespace CodeSample{
    class Program {
        static void Main(String[] args){
            int C = 1;
            int D = 0;
            if (C>D){
                int A = 10;
                Console.Write("What's your number: ");
                int B = int.Parse(Console.ReadLine());
                B = A + 10;
                B++;
                string sentence = "a equals " + B.ToString();
                Console.WriteLine(sentence);
            } else if (C<D) {
                Console.Write("C<D");
            } else {
                for(int j = 0; j < 2; j++){
                    Console.WriteLine("C=D");
                }
            }
            int a = 5;
            while(a <= 25){
                a = a + 5;
                Console.WriteLine(a);
            }
            string[] students = new string[3];
            for (int i = 0; i<students.Length; i++){
                students[i] = i*2;
            }
            foreach (int student in students)
            {
                Console.WriteLine(student);  // Stampa ogni elemento dell'array
            }

            String value = "hey";
        }
    }
}