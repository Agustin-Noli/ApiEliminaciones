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
    public class UsuariosController : ControllerBase
    {
        private readonly EliminacionesContext_Custom _context;

        public UsuariosController(EliminacionesContext_Custom context)
        {
            _context = context;
        }

        // GET: Eliminaciones/Usuarios
        /// <summary>
        /// Obtiene todos los usuarios cargados en base
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuarios>>> GetUsuarios()
        {
            return await _context.Usuarios.ToListAsync();
        }

        // GET: Eliminaciones/Usuarios/5
        /// <summary>
        /// Obtiene el usuario solicitado por parametro
        /// </summary>
        /// <param name="USU_LEGAJO"></param>
        /// <returns></returns>
        [HttpGet("{USU_LEGAJO}")]
        public async Task<ActionResult<Usuarios>> GetUsuarios(string USU_LEGAJO)
        {
            var usuarios = await _context.Usuarios.FindAsync(USU_LEGAJO);

            if (usuarios == null)
            {
                return NotFound();
            }

            return usuarios;
        }

        // PUT: Eliminaciones/Usuarios/5
       /// <summary>
       /// Actualiza los datos de usuario definido por parametro
       /// </summary>
       /// <param name="USU_LEGAJO"></param>
       /// <param name="usuarios"></param>
       /// <returns></returns>
        [HttpPut("{USU_LEGAJO}")]
        public async Task<IActionResult> UpdateUsuarios(string USU_LEGAJO, Usuarios usuarios)
        {
            if (USU_LEGAJO != usuarios.UsuLegajo)
            {
                return BadRequest();
            }

            _context.Entry(usuarios).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuariosExists(USU_LEGAJO))
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

        // POST: Eliminaciones/Usuarios
        /// <summary>
        /// Da de alta un nuevo usuaario en la base de eliminaciones
        /// </summary>
        /// <param name="usuarios"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<Usuarios>> CreateUsuarios(Usuarios usuarios)
        {
            _context.Usuarios.Add(usuarios);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UsuariosExists(usuarios.UsuLegajo))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUsuarios", new { id = usuarios.UsuLegajo }, usuarios);
        }

        // DELETE: Eliminaciones/Usuarios/5
        /// <summary>
        /// Elimina el usuario indicado por parametro
        /// </summary>
        /// <param name="USU_LEGAJO"></param>
        /// <returns></returns>
        [HttpDelete("{USU_LEGAJO}")]
        public async Task<ActionResult<Usuarios>> DeleteUsuarios(string USU_LEGAJO)
        {
            var usuarios = await _context.Usuarios.FindAsync(USU_LEGAJO);
            if (usuarios == null)
            {
                return NotFound();
            }

            _context.Usuarios.Remove(usuarios);
            await _context.SaveChangesAsync();

            return usuarios;
        }

        private bool UsuariosExists(string id)
        {
            return _context.Usuarios.Any(e => e.UsuLegajo == id);
        }
    }
}
