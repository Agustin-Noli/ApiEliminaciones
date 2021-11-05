using System;
using System.Collections.Generic;

namespace API_Eliminaciones.Models
{
    public partial class Rubros
    {
        public string RubCodigo { get; set; }
        public string RubDescripcion { get; set; }
        public string RubSigno { get; set; }
        public byte? RubNivel { get; set; }
        public string RubOrden { get; set; }
    }
}
