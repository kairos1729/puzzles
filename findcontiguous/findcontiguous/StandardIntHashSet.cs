using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace findcontiguous
{
    class StandardIntHashSet : IMyIntHashSet
    {
        public StandardIntHashSet(int n)
        {
            this.IntHashSet = new HashSet<int>(Enumerable.Range(0, n));
            this.IntHashSet.Clear();
        }

        public StandardIntHashSet(IEnumerable<int> xs)
        {
            this.IntHashSet = new HashSet<int>(xs);
        }

        private HashSet<int> IntHashSet { get; set; }

        public void Add(int i)
        {
            this.IntHashSet.Add(i);
        }

        public bool Contains(int i)
        {
            return this.IntHashSet.Contains(i);
        }
    }
}
