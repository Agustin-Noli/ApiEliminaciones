using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace API_Eliminaciones.Models
{
    public partial class EliminacionesContext : DbContext
    {
        public EliminacionesContext()
        {
        }

        public EliminacionesContext(DbContextOptions<EliminacionesContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Ajustes> Ajustes { get; set; }
        public virtual DbSet<DatosPlanilla> DatosPlanilla { get; set; }
        public virtual DbSet<Eliminaciones> Eliminaciones { get; set; }
        public virtual DbSet<EmpresaRubro> EmpresaRubro { get; set; }
        public virtual DbSet<Empresas> Empresas { get; set; }
        public virtual DbSet<GrupoEmpresas> GrupoEmpresas { get; set; }
        public virtual DbSet<Grupos> Grupos { get; set; }
        public virtual DbSet<ImportPlanillas> ImportPlanillas { get; set; }
        public virtual DbSet<Moneda> Moneda { get; set; }
        public virtual DbSet<Rubros> Rubros { get; set; }
        public virtual DbSet<Usuarios> Usuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=SQLAD_CMRM_Eliminaciones,4000;Initial Catalog=Eliminaciones;User ID=usr_eliminaciones;Password=zug236ls1i");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ajustes>(entity =>
            {
                entity.HasKey(e => new { e.EmpCodigo, e.Periodo, e.RubCodigo, e.EmpCodigoContraparte })
                    .HasName("PK_Ajustes");

                entity.ToTable("AJUSTES");

                entity.Property(e => e.EmpCodigo).HasColumnName("EMP_CODIGO");

                entity.Property(e => e.Periodo)
                    .HasColumnName("PERIODO")
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.RubCodigo)
                    .HasColumnName("RUB_CODIGO")
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.EmpCodigoContraparte).HasColumnName("EMP_CODIGO_CONTRAPARTE");

                entity.Property(e => e.AjuSaldo)
                    .HasColumnName("AJU_SALDO")
                    .HasColumnType("numeric(23, 2)");

                entity.Property(e => e.AjuSaldoPromedio)
                    .HasColumnName("AJU_SALDO_PROMEDIO")
                    .HasColumnType("numeric(23, 2)");
            });

            modelBuilder.Entity<DatosPlanilla>(entity =>
            {
                entity.HasKey(e => new { e.EmpCodigo, e.Periodo, e.RubCodigo, e.EmpCodigoContraparte })
                    .HasName("PK_DatosPlanilla");

                entity.ToTable("DATOS_PLANILLA");

                entity.Property(e => e.EmpCodigo).HasColumnName("EMP_CODIGO");

                entity.Property(e => e.Periodo)
                    .HasColumnName("PERIODO")
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.RubCodigo)
                    .HasColumnName("RUB_CODIGO")
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.EmpCodigoContraparte).HasColumnName("EMP_CODIGO_CONTRAPARTE");

                entity.Property(e => e.Concepto)
                    .HasColumnName("CONCEPTO")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Exposicion)
                    .HasColumnName("EXPOSICION")
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Ind).HasColumnName("IND");

                entity.Property(e => e.MonCodigo).HasColumnName("MON_CODIGO");

                entity.Property(e => e.Pond).HasColumnName("POND");

                entity.Property(e => e.Saldo)
                    .HasColumnName("SALDO")
                    .HasColumnType("numeric(23, 2)");

                entity.Property(e => e.SaldoPromedio)
                    .HasColumnName("SALDO_PROMEDIO")
                    .HasColumnType("numeric(23, 2)");
            });

            modelBuilder.Entity<Eliminaciones>(entity =>
            {
                entity.HasKey(e => new { e.EmpCodigo, e.Periodo, e.EmpCodigoContraparte, e.RubCodigo })
                    .HasName("PK__ELIMINAC__9C216D652EFD8A3E");

                entity.ToTable("ELIMINACIONES");

                entity.Property(e => e.EmpCodigo).HasColumnName("EMP_CODIGO");

                entity.Property(e => e.Periodo)
                    .HasColumnName("PERIODO")
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.EmpCodigoContraparte).HasColumnName("EMP_CODIGO_CONTRAPARTE");

                entity.Property(e => e.RubCodigo)
                    .HasColumnName("RUB_CODIGO")
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.EliSaldo)
                    .HasColumnName("ELI_SALDO")
                    .HasColumnType("numeric(23, 2)");

                entity.Property(e => e.EliSaldoPromedio)
                    .HasColumnName("ELI_SALDO_PROMEDIO")
                    .HasColumnType("numeric(23, 2)");

                entity.Property(e => e.EmpPorcentaje)
                    .HasColumnName("EMP_PORCENTAJE")
                    .HasColumnType("numeric(23, 2)");

                entity.Property(e => e.GempId).HasColumnName("GEMP_ID");

                entity.Property(e => e.MonCodigo).HasColumnName("MON_CODIGO");
            });

            modelBuilder.Entity<EmpresaRubro>(entity =>
            {
                entity.HasKey(e => new { e.EmpCodigo, e.RubCodigo })
                    .HasName("PK_EmpresaRubro");

                entity.ToTable("EMPRESA_RUBRO");

                entity.Property(e => e.EmpCodigo).HasColumnName("EMP_CODIGO");

                entity.Property(e => e.RubCodigo)
                    .HasColumnName("RUB_CODIGO")
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength();
            });

            modelBuilder.Entity<Empresas>(entity =>
            {
                entity.HasKey(e => e.EmpCodigo)
                    .HasName("PK__EMPRESAS__F2F42A64C6ED1224");

                entity.ToTable("EMPRESAS");

                entity.Property(e => e.EmpCodigo).HasColumnName("EMP_CODIGO");

                entity.Property(e => e.EmpDescripcion)
                    .IsRequired()
                    .HasColumnName("EMP_DESCRIPCION")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.EmpIntercompany)
                    .IsRequired()
                    .HasColumnName("EMP_INTERCOMPANY")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.EmpPorcentaje)
                    .HasColumnName("EMP_PORCENTAJE")
                    .HasColumnType("numeric(23, 2)");
            });

            modelBuilder.Entity<GrupoEmpresas>(entity =>
            {
                entity.HasKey(e => new { e.GrupoId, e.EmpCodigo })
                    .HasName("PK__GRUPO_EM__C0CCB738B68FEF28");

                entity.ToTable("GRUPO_EMPRESAS");

                entity.Property(e => e.GrupoId).HasColumnName("GRUPO_ID");

                entity.Property(e => e.EmpCodigo).HasColumnName("EMP_CODIGO");
            });

            modelBuilder.Entity<Grupos>(entity =>
            {
                entity.HasKey(e => e.GrupoId)
                    .HasName("PK__GRUPOS__9FE3F59E382C011B");

                entity.ToTable("GRUPOS");

                entity.Property(e => e.GrupoId).HasColumnName("GRUPO_ID");

                entity.Property(e => e.GrupoDescripcion)
                    .IsRequired()
                    .HasColumnName("GRUPO_DESCRIPCION")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.GrupoNombre)
                    .IsRequired()
                    .HasColumnName("GRUPO_NOMBRE")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ImportPlanillas>(entity =>
            {
                entity.HasKey(e => new { e.EmpCodigo, e.Periodo })
                    .HasName("PK__IMPORT_P__74EEB8986A544FAC");

                entity.ToTable("IMPORT_PLANILLAS");

                entity.Property(e => e.EmpCodigo).HasColumnName("EMP_CODIGO");

                entity.Property(e => e.Periodo)
                    .HasColumnName("PERIODO")
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Grupo)
                    .HasColumnName("GRUPO")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.NombrePlanilla)
                    .IsRequired()
                    .HasColumnName("NOMBRE_PLANILLA")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Porcentaje)
                    .HasColumnName("PORCENTAJE")
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Moneda>(entity =>
            {
                entity.HasKey(e => e.MonCodigo)
                    .HasName("PK__MONEDA__C047136693422F4A");

                entity.ToTable("MONEDA");

                entity.Property(e => e.MonCodigo)
                    .HasColumnName("MON_CODIGO")
                    .ValueGeneratedNever();

                entity.Property(e => e.MonCotizacion)
                    .HasColumnName("MON_COTIZACION")
                    .HasColumnType("numeric(23, 2)");

                entity.Property(e => e.MonDescripcion)
                    .HasColumnName("MON_DESCRIPCION")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Rubros>(entity =>
            {
                entity.HasKey(e => e.RubCodigo)
                    .HasName("PK_Rubros");

                entity.ToTable("RUBROS");

                entity.Property(e => e.RubCodigo)
                    .HasColumnName("RUB_CODIGO")
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.RubDescripcion)
                    .HasColumnName("RUB_DESCRIPCION")
                    .HasMaxLength(60)
                    .IsUnicode(false);

                entity.Property(e => e.RubNivel).HasColumnName("RUB_NIVEL");

                entity.Property(e => e.RubOrden)
                    .IsRequired()
                    .HasColumnName("RUB_ORDEN")
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.RubSigno)
                    .HasColumnName("RUB_SIGNO")
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength();
            });

            modelBuilder.Entity<Usuarios>(entity =>
            {
                entity.HasKey(e => e.UsuLegajo)
                    .HasName("PK_Usuarios");

                entity.ToTable("USUARIOS");

                entity.Property(e => e.UsuLegajo)
                    .HasColumnName("USU_LEGAJO")
                    .HasMaxLength(8)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.UsuFecalta)
                    .HasColumnName("USU_FECALTA")
                    .HasColumnType("datetime");

                entity.Property(e => e.UsuNombre)
                    .HasColumnName("USU_NOMBRE")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UsuPerfil)
                    .HasColumnName("USU_PERFIL")
                    .HasMaxLength(15)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
