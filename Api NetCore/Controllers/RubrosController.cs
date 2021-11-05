using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Eliminaciones.Models;

namespace API_Eliminaciones.Controllers
{
    [Route("Eliminaciones/[controller]")]
    [ApiController]
    public class RubrosController : ControllerBase
    {
        private readonly EliminacionesContext_Custom _context;

        public RubrosController(EliminacionesContext_Custom context)
        {
            _context = context;
        }

        // GET: Eliminaciones/Rubros
        /// <summary>
        /// Trae todos los rubros cargados en base
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rubros>>> GetRubros()
        {
            return await _context.Rubros.ToListAsync();
        }

        // GET: Eliminaciones/Rubros/5
        /// <summary>
        /// Obtiene el Rubro indicado por parametro
        /// </summary>
        /// <param name="RUB_CODIGO"></param>
        /// <returns></returns>
        [HttpGet("{RUB_CODIGO}")]
        public async Task<ActionResult<Rubros>> GetRubros(string RUB_CODIGO)
        {
            var rubros = await _context.Rubros.FindAsync(RUB_CODIGO);

            if (rubros == null)
            {
                return NotFound();
            }

            return rubros;
        }

        private bool RubrosExists(string id)
        {
            return _context.Rubros.Any(e => e.RubCodigo == id);
        }
    }
}
