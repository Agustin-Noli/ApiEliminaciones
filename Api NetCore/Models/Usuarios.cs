using System;
using System.Collections.Generic;

namespace API_Eliminaciones.Models
{
    public partial class Usuarios
    {
        public string UsuLegajo { get; set; }
        public string UsuNombre { get; set; }
        public string UsuPerfil { get; set; }
        public DateTime? UsuFecalta { get; set; }
    }
}
