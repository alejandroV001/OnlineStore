using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class PhotoForReturnDto
    {
        public int Id { get; set; }
        public int ProductId {get;set;}
        public bool IsMain { get; set; }
        public string PublicId { get; set; }
        public string Url { get; set; }
    }
}