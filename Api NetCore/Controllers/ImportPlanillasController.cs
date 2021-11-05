using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Eliminaciones.Models;
using Newtonsoft.Json;
using System.IO;
using System.Drawing;

namespace API_Eliminaciones.Controllers
{
    [Route("Eliminaciones/[controller]")]
    [ApiController]
    public class ImportPlanillasController : ControllerBase
    {
        private readonly EliminacionesContext_Custom _context;

        public ImportPlanillasController(EliminacionesContext_Custom context)
        {
            _context = context;
        }

        // GET: Eliminaciones/ImportPlanillas
        /// <summary>
        /// Obtiene todas las planillas importadas 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ImportPlanillas>>> GetImportPlanillas()
        {
            return await _context.ImportPlanillas.ToListAsync();
        }

        // GET: Eliminaciones/ImportPlanillas/5
        /// <summary>
        /// Obtiene las planillas filtradas por empresas
        /// </summary>
        /// <param name="EMP_CODIGO"></param>
        /// <returns></returns>
        [HttpGet("ByEmpresa/{EMP_CODIGO}")]
        public async Task<ActionResult<ImportPlanillas>> GetImportPlanillasByEmpresa(int EMP_CODIGO)
        {
            var importPlanillas = await _context.ImportPlanillas.Where(x => x.EmpCodigo == EMP_CODIGO).ToListAsync();

            if (importPlanillas == null || importPlanillas.Count == 0)
            {
                return NotFound();
            }

            return Ok(importPlanillas);
        }

        // GET: Eliminaciones/ImportPlanillas/5
        /// <summary>
        /// Obtiene las planillas filtradas por periodo
        /// </summary>
        /// <param name="EMP_CODIGO"></param>
        /// <returns></returns>
        [HttpGet("ByPeriodo/{PERIODO}")]
        public async Task<ActionResult<ImportPlanillas>> GetImportPlanillasByPeriodo(string PERIODO)
        {
            //var importPlanillas = await _context.ImportPlanillas.FindAsync(PERIODO);
            var importPlanillas = await _context.ImportPlanillas.Where(x => x.Periodo == PERIODO).ToListAsync();

            if (importPlanillas == null || importPlanillas.Count == 0)
            {
                return NotFound();
            }

            return  Ok(importPlanillas);
        }

        //// PUT: Eliminaciones/ImportPlanillas/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutImportPlanillas(int id, ImportPlanillas importPlanillas)
        //{
        //    if (id != importPlanillas.EmpCodigo)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(importPlanillas).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ImportPlanillasExists(id))
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

        //// POST: Eliminaciones/ImportPlanillas
        //[HttpPost]
        //public async Task<ActionResult<ImportPlanillas>> PostImportPlanillas(ImportPlanillas importPlanillas)
        //{
        //    _context.ImportPlanillas.Add(importPlanillas);
        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateException)
        //    {
        //        if (ImportPlanillasExists(importPlanillas.EmpCodigo))
        //        {
        //            return Conflict();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return CreatedAtAction("GetImportPlanillas", new { id = importPlanillas.EmpCodigo }, importPlanillas);
        //}

        //// DELETE: Eliminaciones/ImportPlanillas/5
        //[HttpDelete("{id}")]
        //public async Task<ActionResult<ImportPlanillas>> DeleteImportPlanillas(int id)
        //{
        //    var importPlanillas = await _context.ImportPlanillas.FindAsync(id);
        //    if (importPlanillas == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.ImportPlanillas.Remove(importPlanillas);
        //    await _context.SaveChangesAsync();

        //    return importPlanillas;
        //}

        private bool ImportPlanillasExists(int id)
        {
            return _context.ImportPlanillas.Any(e => e.EmpCodigo == id);
        }
    }
}
