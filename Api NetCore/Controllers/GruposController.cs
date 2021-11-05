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
    public class GruposController : ControllerBase
    {
        private readonly EliminacionesContext_Custom _context;

        public GruposController(EliminacionesContext_Custom context)
        {
            _context = context;
        }

        // GET: Eliminaciones/Grupos
        /// <summary>
        /// Obtiene el listado completo de todos los grupos de empresas
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Grupos>>> GetGrupos()
        {
            return await _context.Grupos.ToListAsync();
        }

        // GET: Eliminaciones/Grupos/2
        /// <summary>
        /// Obtiene la empresa indicada por parametro
        /// </summary>
        /// <param name="Grupo_Id"></param>
        /// <returns></returns>
        [HttpGet("{Grupo_Id}")]
        public async Task<ActionResult<Grupos>> GetGrupos(int Grupo_Id)
        {
            var grupos = await _context.Grupos.FindAsync(Grupo_Id);

            if (grupos == null)
            {
                return NotFound();
            }

            return grupos;
        }

        // PUT: Eliminaciones/Grupos/2
        /// <summary>
        /// Actualiza el grupo indicado por parametro
        /// </summary>
        /// <param name="Grupo_Id"></param>
        /// <param name="grupos"></param>
        /// <returns></returns>
        [HttpPut("{Grupo_Id}")]
        public async Task<IActionResult> UpdateGrupos([FromRoute] int Grupo_Id, [FromBody] Grupos grupos)
        {
            if (Grupo_Id != grupos.GrupoId)
            {
                return BadRequest();
            }

            _context.Entry(grupos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GruposExists(Grupo_Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: Eliminaciones/Grupos
        /// <summary>
        /// Create nuevo Grupo
        /// </summary>
        /// <param name="grupos"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<Grupos>> CreateGrupos([FromBody] Grupos grupos)
        {
            _context.Grupos.Add(grupos);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGrupos", new { id = grupos.GrupoId }, grupos);
        }

        // DELETE: Eliminaciones/Grupos/3
        /// <summary>
        /// Elimina el grupo indicado por parametro
        /// </summary>
        /// <param name="Grupo_Id"></param>
        /// <returns></returns>
        [HttpDelete("{Grupo_Id}")]
        public async Task<ActionResult<Grupos>> DeleteGrupos(int Grupo_Id)
        {
            var grupos = await _context.Grupos.FindAsync(Grupo_Id);
            if (grupos == null)
            {
                return NotFound();
            }

            _context.Grupos.Remove(grupos);
            await _context.SaveChangesAsync();

            return grupos;
        }

        private bool GruposExists(int id)
        {
            return _context.Grupos.Any(e => e.GrupoId == id);
        }
    }
}
