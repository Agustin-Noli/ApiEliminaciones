using System;
using System.Collections.Generic;

namespace API_Eliminaciones.Models
{
    public partial class ImportPlanillas
    {
        public int EmpCodigo { get; set; }
        public string Periodo { get; set; }
        public string NombrePlanilla { get; set; }
        public string Grupo { get; set; }
        public string Porcentaje { get; set; }
    }
}
