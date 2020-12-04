using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rest.Model
{
    public class WMIModelComparerByCreatedOn : IComparer<WMIModel>
    {
        public int Compare(WMIModel x, WMIModel y)
        {
            int c = DateTime.Compare(x.CreatedOn ?? new DateTime(), y.CreatedOn ?? new DateTime());
            if (c != 0)
                return c;
            return String.Compare(x.WMI, y.WMI);
        }
    }
}
