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
            const int MaxValue = 10000000;
            int n;
            while (int.TryParse(Console.ReadLine(), out n))
            {
                var bestCaseList =
                    Enumerable.Range(0, n);

                var step = (MaxValue / n);
                var worstCaseList =
                    Enumerable.Range(0, n).Select(i => i * step * 2);

                var randomBestCase = ToRandomOrder(bestCaseList);

                var randomList =
                    Enumerable
                        .Range(0, n)
                        .Select(_ => r.Next(MaxValue));

                var randomWorstCase = ToRandomOrder(worstCaseList);
                var randomWorstCase2 = ToRandomOrder(worstCaseList);

                FindSequencesStandardHash("Best", bestCaseList);
                FindSequencesStandardHash("Worst", worstCaseList);
                FindSequencesStandardHash("BestR", randomBestCase);
                FindSequencesStandardHash("Random", randomList);
                FindSequencesStandardHash("WorstR", randomWorstCase);
                FindSequencesStandardHash("WorstR2", randomWorstCase2);
                FindSequencesMyHash("MyBest", bestCaseList);
                FindSequencesMyHash("MyWorst", worstCaseList);
                FindSequencesMyHash("MyBestR", randomBestCase);
                FindSequencesMyHash("MyRandom", randomList);
                FindSequencesMyHash("MyWorstR", randomWorstCase);
                FindSequencesMyHash("MyWorstR2", randomWorstCase2);
            }
        }

        private static List<int> ToRandomOrder(IEnumerable<int> toBeRandomised)
        {
            var retval = toBeRandomised.ToList();

            for (var i = 0; i < retval.Count; ++i)
            {
                var swapIndex = i + r.Next(retval.Count - i);
                var temp = retval[i];
                retval[i] = retval[swapIndex];
                retval[swapIndex] = temp;
            }

            return retval;
        }

        private static void FindSequencesStandardHash(
            string description,
            IEnumerable<int> toBeSearched)
        {
            FindSequences(
                description,
                toBeSearched,
                n => new StandardIntHashSet(n),
                xs => new StandardIntHashSet(xs));
        }

        private static void FindSequencesMyHash(
            string description,
            IEnumerable<int> toBeSearched)
        {
            FindSequences(
                description,
                toBeSearched,
                n => new MyIntHashSet(n),
                xs => new MyIntHashSet(xs));
        }

        private static void FindSequences(
            string description, 
            IEnumerable<int> toBeSearched,
            Func<int, IMyIntHashSet> emptyHashSetCreator,
            Func<ICollection<int>, IMyIntHashSet> populatedHashSetCreator)
        {
            // Create list now to remove overhead on creating each element
            var toBeSearchedAsList = toBeSearched.ToList();
            var n = toBeSearchedAsList.Count;
            var found = emptyHashSetCreator(n);

            var stopwatch1 = new Stopwatch();
            var stopwatch2 = new Stopwatch();

            stopwatch1.Start();
            stopwatch2.Start();

            // O(N)
            var h = populatedHashSetCreator(toBeSearchedAsList);
            stopwatch1.Stop();

            ////var sequences = new List<List<int>>();
            var maxLen = 1;

            var count = 0;
            var foundcount = 0;
            var notfoundcount = 0;
            var downcount = 0;
            var upcount = 0;

            foreach (var current in toBeSearchedAsList)
            {
                ++count;

                if (found.Contains(current))
                {
                    ++foundcount;
                    continue;
                }

                ++notfoundcount;

                found.Add(current);

                ////var sequence = new List<int>() { current };

                var len = 1;

                var i = current;
                while (h.Contains(--i)) // O(1)
                {
                    found.Add(i);
                    ++len;
                    ++downcount;
                    ////sequence.Add(i);
                }

                i = current;
                while (h.Contains(++i)) // O(1)
                {
                    found.Add(i);
                    ++len;
                    ++upcount;
                    ////sequence.Add(i);
                }

                if (len > maxLen)
                {
                    maxLen = len;
                }

                ////sequences.Add(sequence);
            }

            stopwatch2.Stop();

            ////Console.WriteLine(string.Join(", ", originalList));

            ////Console.WriteLine(
            ////    string.Join(
            ////        Environment.NewLine,
            ////        sequences
            ////            .OrderBy(s => s.Min())
            ////            .Select(
            ////                s => string.Join(", ", s.OrderBy(v => v)))));

            ////var longest = sequences.Select(s => s.Count).Max();
            var longest = maxLen;

            Console.WriteLine(
                string.Format(
                    "{0,10}: n={1,9} longest={2,9} Ticks={3,9} c+f={4,9}",
                    description, n, longest, stopwatch2.ElapsedTicks, count + foundcount));

            ////Console.WriteLine(
            ////    string.Format(
            ////        "f={0,9} n={1,9} f+n={2,9} d={3,9} u={4,9} d+u={5,9} c={6,9}",
            ////        foundcount,
            ////        notfoundcount,
            ////        foundcount + notfoundcount,
            ////        downcount,
            ////        upcount,
            ////        downcount + upcount,
            ////        count));
        }
    }
}
