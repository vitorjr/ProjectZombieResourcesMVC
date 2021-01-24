using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ZombieResources.Models
{
    [Table("StockResources")]
    public class StockResources
    {
        [Column("Id")]
        public int Id { get; set; }

        [Column("Description")]
        public string Description { get; set; }

        [Column("Observation")]
        public string Observation { get; set; }
        [Column("Amount")]
        public float Amout { get; set; }
        [Column("Responsibleinput")]
        public string Responsibleinput { get; set; }
        [Column("Responsibleoutput")]
        public string Responsibleoutput { get; set; }
    }
}
