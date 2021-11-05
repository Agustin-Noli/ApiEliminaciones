using System;
using System.Collections.Generic;

namespace API_Eliminaciones.Models
{
    public partial class Eliminaciones
    {
        public int EmpCodigo { get; set; }
        public string Periodo { get; set; }
        public int EmpCodigoContraparte { get; set; }
        public string RubCodigo { get; set; }
        public decimal? EliSaldo { get; set; }
        public decimal? EliSaldoPromedio { get; set; }
        public int? GempId { get; set; }
        public decimal? EmpPorcentaje { get; set; }
        public int? MonCodigo { get; set; }
    }
}
