using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace findcontiguous
{
    class Program
    {
        private static readonly Random r = new Random();

        static void Main(string[] args)
        {
            int n;
            while (int.TryParse(Console.ReadLine(), out n))
            {
                var originalList = Enumerable.Range(0, n).Select(_ => r.Next(10000000)).ToArray();
                var stopwatch = new Stopwatch();
                stopwatch.Start();

                // O(N)
                var h = new HashSet<int>(originalList);
                var found = new HashSet<int>();
                var sequences = new List<List<int>>();

                foreach (var current in h)
                {
                    if (found.Contains(current))
                    {
                        continue;
                    }

                    found.Add(current);

                    var sequence = new List<int>() { current };

                    var i = current;
                    while (h.Contains(--i)) // O(1)
                    {
                        found.Add(i);
                        sequence.Add(i);
                    }

                    i = current;
                    while (h.Contains(++i)) // O(1)
                    {
                        found.Add(i);
                        sequence.Add(i);
                    }

                    sequences.Add(sequence);
                }

                stopwatch.Stop();

                ////Console.WriteLine(string.Join(", ", originalList));

                ////Console.WriteLine(
                ////    string.Join(
                ////        Environment.NewLine,
                ////        sequences
                ////            .OrderBy(s => s.Min())
                ////            .Select(
                ////                s => string.Join(", ", s.OrderBy(v => v)))));

                var longest = sequences.Select(s => s.Count).Max();

                Console.WriteLine(
                    "n=" + n + " longest=" + longest +
                    " ElapsedTicks=" + stopwatch.ElapsedTicks);
            }
        }
    }
}
