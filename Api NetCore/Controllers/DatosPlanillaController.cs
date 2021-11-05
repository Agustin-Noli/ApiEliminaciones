using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using API_Eliminaciones.Models;

namespace API_Eliminaciones.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DatosPlanillaController : ControllerBase
    {

        private readonly EliminacionesContext_Custom dbContext;

        public DatosPlanillaController(EliminacionesContext_Custom context)
        {
            dbContext = context;
        }

        [HttpGet]
        public IEnumerable<DatosPlanilla> GetDatosPlanilla()
        {
            try
            {
                return dbContext.DatosPlanilla.ToList();
            }
            catch (Exception ex)
            {
                return null; //ex.ToString());
            }
        }

      



    }
}
