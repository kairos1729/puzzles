using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace findcontiguous
{
    class Program
    {
        static void Main(string[] args)
        {
            var x = new[] { 8, 1, 9, 2, 100, 91, 6, 2, 8, 4, 5 };

            // O(N)
            var h = new HashSet<int>(x);

            var sequences = new List<List<int>>();

            while (h.Any())
            {
                // O(1)
                var current = h.First();
                h.Remove(current);

                var sequence = new List<int>() { current };

                var i = current;
                while (h.Any() && h.Contains(--i)) // O(1)
                {
                    h.Remove(i);
                    sequence.Add(i);
                }

                i = current;
                while (h.Any() && h.Contains(++i)) // O(1)
                {
                    h.Remove(i);
                    sequence.Add(i);
                }

                sequences.Add(sequence);
            }

            Console.WriteLine(
                "Longest sequence length = "
                + sequences.Select(s => s.Count).Max());

            Console.WriteLine(
                string.Join(
                    Environment.NewLine,
                    sequences
                        .OrderBy(s => s.Min())
                        .Select(s => string.Join(", ", s.OrderBy(v => v)))));

            Console.ReadLine();
        }
    }
}
