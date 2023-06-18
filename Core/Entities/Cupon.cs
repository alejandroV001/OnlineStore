using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Cupon : BaseEntity
    {
        public string CuponName { get; set; }
        public int Value { get; set; }
        public DateTime StartingDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}