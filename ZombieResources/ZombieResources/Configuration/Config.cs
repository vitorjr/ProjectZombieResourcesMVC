using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZombieResources.Models;

namespace ZombieResources.Configuration
{

    public class Config : DbContext
    {
        public Config(DbContextOptions<Config> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<StockResources> StockResources { get; set; }
    }
}
