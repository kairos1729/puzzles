using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace findcontiguous
{
    class MyIntHashSet : IMyIntHashSet
    {
        private const int SizingFactor = 2;

        public MyIntHashSet(int n)
        {
            // Make the number of buckets bigger than the number
            // of elements in the list to reduce the effect of collisions
            // (See Sedgewick algorithms book, chapter on hashing)
            this.Buckets =
                new List<int?>(
                    Enumerable.Repeat((int?)null, n * SizingFactor - 1));
        }

        public MyIntHashSet(ICollection<int> xs) : this(xs.Count)
        {
            foreach (var i in xs)
            {
                Add(i);
            }
        }

        private List<int?> Buckets { get; set; }

        public void Add(int i)
        {
            var index = FindIndex(i);

            // Don't add duplicates
            if (this.Buckets[index] == null)
            {
                this.Buckets[index] = i;
            }
        }

        public bool Contains(int i)
        {
            var index = FindIndex(i);
            return this.Buckets[index] == i;
        }

        private int FindIndex(int i)
        {
            var absi = Math.Abs(i);
            var hash = absi % this.Buckets.Count;

            var hash2 = this.Buckets.Count - 2 - (absi % (this.Buckets.Count - 2));

            while ((this.Buckets[hash] != i)
                && (this.Buckets[hash] != null))
            {
                hash = (hash + hash2) % this.Buckets.Count;
            }

            // either the index to an empty bucket or a bucket containing i
            return hash;
        }
    }
}
