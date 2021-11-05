using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;


using Microsoft.EntityFrameworkCore.SqlServer.Infrastructure.Internal;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Eliminaciones.Models
{
    public partial class EliminacionesContext_Custom : EliminacionesContext
    {
        public EliminacionesContext_Custom(DbContextOptions<EliminacionesContext_Custom> options)
            : base(ChangeOptionsType<EliminacionesContext>(options))
        {
        }

        protected static DbContextOptions<T> ChangeOptionsType<T>(DbContextOptions options) where T : DbContext
        {
            var sqlExt = options.Extensions.FirstOrDefault(e => e is SqlServerOptionsExtension);

            if (sqlExt == null)
                throw (new Exception("Failed to retrieve SQL connection string for base Context"));

            return new DbContextOptionsBuilder<T>()
                        .UseSqlServer(((SqlServerOptionsExtension)sqlExt).ConnectionString)
                        .Options;
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


        }

    }
}
