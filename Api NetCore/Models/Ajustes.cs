using System;
using System.Collections.Generic;

namespace API_Eliminaciones.Models
{
    public partial class Ajustes
    {
        public int EmpCodigo { get; set; }
        public string Periodo { get; set; }
        public string RubCodigo { get; set; }
        public int EmpCodigoContraparte { get; set; }
        public decimal? AjuSaldo { get; set; }
        public decimal? AjuSaldoPromedio { get; set; }
    }
}
