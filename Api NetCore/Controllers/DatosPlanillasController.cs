using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Eliminaciones.Models;
using API_Eliminaciones.ModelsDTO;

namespace API_Eliminaciones.Controllers
{
    [Route("Eliminaciones/[controller]")]
    [ApiController]
    public class DatosPlanillasController : ControllerBase
    {
        private readonly EliminacionesContext_Custom _context;

        public DatosPlanillasController(EliminacionesContext_Custom context)
        {
            _context = context;
        }

        // GET: Eliminaciones/DatosPlanillas
        /// <summary>
        /// Obtiene todos los datos de las planillas cargadas segun el filtro enviado por parametro
        /// </summary>
        /// <param name="filtros"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DatosPlanilla>>> GetDatosPlanilla([FromBody] DatosPlanillaFiltroDTO filtros )
        {
            // hacer consulta aca o en SP para filtrar
            
            return await _context.DatosPlanilla.ToListAsync();
        }

        // GET: Eliminaciones/DatosPlanillas/All
        /// <summary>
        /// Obtiene todos los datos de las planillas
        /// </summary>
        /// <returns></returns>
        [HttpGet("All")]
        public async Task<ActionResult<IEnumerable<DatosPlanilla>>> GetAllDatosPlanilla()
        {
            return await _context.DatosPlanilla.ToListAsync();
        }

        //// PUT: Eliminaciones/DatosPlanillas/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutDatosPlanilla(int id, DatosPlanilla datosPlanilla)
        //{
        //    if (id != datosPlanilla.EmpCodigo)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(datosPlanilla).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!DatosPlanillaExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //// POST: Eliminaciones/DatosPlanillas
        //[HttpPost]
        //public async Task<ActionResult<DatosPlanilla>> PostDatosPlanilla(DatosPlanilla datosPlanilla)
        //{
        //    _context.DatosPlanilla.Add(datosPlanilla);
        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateException)
        //    {
        //        if (DatosPlanillaExists(datosPlanilla.EmpCodigo))
        //        {
        //            return Conflict();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return CreatedAtAction("GetDatosPlanilla", new { id = datosPlanilla.EmpCodigo }, datosPlanilla);
        //}

        //// DELETE: Eliminaciones/DatosPlanillas/5
        //[HttpDelete("{id}")]
        //public async Task<ActionResult<DatosPlanilla>> DeleteDatosPlanilla(int id)
        //{
        //    var datosPlanilla = await _context.DatosPlanilla.FindAsync(id);
        //    if (datosPlanilla == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.DatosPlanilla.Remove(datosPlanilla);
        //    await _context.SaveChangesAsync();

        //    return datosPlanilla;
        //}

        private bool DatosPlanillaExists(int id)
        {
            return _context.DatosPlanilla.Any(e => e.EmpCodigo == id);
        }
    }
}
