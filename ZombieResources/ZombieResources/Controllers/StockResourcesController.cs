using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZombieResources.Configuration;
using ZombieResources.Models;

namespace ZombieResources.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockResourcesController : ControllerBase
    {
        private readonly Config _context;

        public StockResourcesController(Config context)
        {
            _context = context;
        }

        // GET: api/StockResources
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StockResources>>> GetStockResources()
        {
            return await _context.StockResources.ToListAsync();
        }

        // GET: api/StockResources/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StockResources>> GetStockResources(int id)
        {
            var stockResources = await _context.StockResources.FindAsync(id);

            if (stockResources == null)
            {
                return NotFound();
            }

            return stockResources;
        }

        // PUT: api/StockResources/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStockResources(int id, [FromForm]StockResources stockResources)
        {
            if (id != stockResources.Id)
            {
                return BadRequest();
            }

            _context.Entry(stockResources).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StockResourcesExists(id))
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

        // POST: api/StockResources
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StockResources>> PostStockResources([FromForm]StockResources stockResources)
        {
            _context.StockResources.Add(stockResources);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStockResources", new { id = stockResources.Id }, stockResources);
        }

        // DELETE: api/StockResources/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStockResources(int id)
        {
            var stockResources = await _context.StockResources.FindAsync(id);
            if (stockResources == null)
            {
                return NotFound();
            }

            _context.StockResources.Remove(stockResources);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StockResourcesExists(int id)
        {
            return _context.StockResources.Any(e => e.Id == id);
        }
    }
}
