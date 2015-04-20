using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace rotate
{
    class Program
    {
        private static int swapCount = 0;

        static void Main(string[] args)
        {
            var list = new int[] { 1, 2, 3, 4, 5 };

            Console.WriteLine(string.Join(", ", list));
            Rotate(list, 2);

            Console.WriteLine(string.Join(", ", list));
            Console.WriteLine("Swap count: " + swapCount);
            Console.ReadLine();
        }

        private static void Rotate<T>(IList<T> xs, int n)
        {
            if (xs.Count < 1)
            {
                return;
            }

            n = (n % xs.Count + xs.Count) % xs.Count;
            var lo = 0;
            var hi = xs.Count - 1;
            var forward = true;

            while ((lo < hi) && (n > 0))
            {
                var m = hi - lo + 1 - n;
 
                if (n > m)
                {
                    n = m;
                    forward = !forward;
                }

                if (forward)
                {
                    SwapN(xs, n, lo);
                    lo = lo + n;
                }
                else
                {
                    SwapN(xs, n, hi - (2 * n) + 1);
                    hi = hi - n;
                }
            }
        }

        private static void SwapN<T>(IList<T> xs, int n, int index)
        {
            for (var i = index; i < index + n; ++i)
            {
                var temp = xs[i];
                xs[i] = xs[i + n];
                xs[i + n] = temp;
                swapCount++;
            }
        }
    }
}
