using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class CuponDataDto
    {
        public int Id { get; set; }
        public string CuponName { get; set; }
        public int Value { get; set; }
        public string StartingDate { get; set; }
        public string EndDate { get; set; }
    }
}