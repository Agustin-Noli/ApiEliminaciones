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
    public class EmpresasController : ControllerBase
    {
        private readonly EliminacionesContext_Custom _context;

        public EmpresasController(EliminacionesContext_Custom context)
        {
            _context = context;
        }

        // GET: Eliminaciones/Empresas
        /// <summary>
        /// Obtiene todas las Empresas
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Empresas>>> GetEmpresas()
        {
            return await _context.Empresas.ToListAsync();
        }

        // GET: Eliminaciones/Empresas/5
        /// <summary>
        /// Obtiene la empresa solicitada por parametro
        /// </summary>
        /// <param name="Emp_Codigo"></param>
        /// <returns></returns>
        [HttpGet("{Emp_Codigo}")]
        public async Task<ActionResult<Empresas>> GetEmpresas(int Emp_Codigo)
        {
            var empresas = await _context.Empresas.FindAsync(Emp_Codigo);

            if (empresas == null)
                return NotFound();

            return empresas;
        }

        // GET: Eliminaciones/GetEmpresasByGrupo/2
        /// <summary>
        /// Obtiene todas las Empresas filtradas por grupo
        /// </summary>
        /// <param name="Gemp_Id"></param>
        /// <returns></returns>
        //[HttpGet("GetEmpresasByGrupo/{Gemp_Id}")]
        //public async Task<ActionResult<IEnumerable<Empresas>>> GetEmpresasByGrupo(int Gemp_Id)
        //{
        //    var empresasByGrupo = await _context.Empresas.Where(id => id.GempId == Gemp_Id).ToListAsync();
            
        //    if (empresasByGrupo == null)
        //        return NotFound();

        //    return empresasByGrupo;
        //}

        // PUT: Eliminaciones/Empresas/5
        /// <summary>
        /// Actualiza la empresa indicada por parametro
        /// </summary>
        /// <param name="Emp_Codigo"></param>
        /// <param name="empresas"></param>
        /// <returns></returns>
        [HttpPut("{Emp_Codigo}")]
        public async Task<IActionResult> UpdateEmpresas([FromRoute] int Emp_Codigo, [FromBody] Empresas empresas)
        {
            if (Emp_Codigo != empresas.EmpCodigo)
                return BadRequest();

            _context.Entry(empresas).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmpresasExists(Emp_Codigo))
                    return NotFound();
                else
                    throw;
            }
            // modificar para que devuelva status 200
            return NoContent();
        }

        // POST: Eliminaciones/Empresas
        /// <summary>
        /// Crea una nueva empresa
        /// </summary>
        /// <param name="empresas"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<Empresas>> CreateEmpresas([FromBody] Empresas empresas)
        {
            _context.Empresas.Add(empresas);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmpresas", new { id = empresas.EmpCodigo }, empresas);
        }

        // DELETE: Eliminaciones/Empresas/5
        /// <summary>
        /// Elimina la empresa indicada por parametro
        /// </summary>
        /// <param name="Emp_Codigo"></param>
        /// <returns></returns>
        [HttpDelete("{Emp_Codigo}")]
        public async Task<ActionResult<Empresas>> DeleteEmpresas(int Emp_Codigo)
        {
            var empresas = await _context.Empresas.FindAsync(Emp_Codigo);
            if (empresas == null)
                return NotFound();

            _context.Empresas.Remove(empresas);
            await _context.SaveChangesAsync();

            return empresas;
        }

        private bool EmpresasExists(int id)
        {
            return _context.Empresas.Any(e => e.EmpCodigo == id);
        }
    }
}
