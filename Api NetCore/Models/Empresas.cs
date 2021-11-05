using System;
using System.Collections.Generic;

namespace API_Eliminaciones.Models
{
    public partial class Empresas
    {
        public int EmpCodigo { get; set; }
        public string EmpDescripcion { get; set; }
        public string EmpIntercompany { get; set; }
        public decimal? EmpPorcentaje { get; set; }
    }
}
