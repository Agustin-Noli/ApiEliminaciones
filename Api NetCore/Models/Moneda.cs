using System;
using System.Collections.Generic;

namespace API_Eliminaciones.Models
{
    public partial class Moneda
    {
        public int MonCodigo { get; set; }
        public string MonDescripcion { get; set; }
        public decimal? MonCotizacion { get; set; }
    }
}
