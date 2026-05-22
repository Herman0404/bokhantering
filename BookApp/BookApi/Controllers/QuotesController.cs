using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BookApi.Models;
using System.Security.Claims;

namespace BookApi.Controllers
{
    [ApiController]                     // markerar som API-kontroller
    [Route("api/[controller]")]         // sätter URL till api/quotes
    [Authorize]                         // kräver en giltig JWT-token på alla endpoints
    public class QuotesController : ControllerBase 
    {
        // lagras i minnet, rensas när servern startas om (ingen databas)
        private static List<Quote> _quotes = new()
        {
            new Quote { Id = Guid.NewGuid(), Text = "Fantasi är viktigare än kunskap.", Author = "Albert Einstein", UserId = 0 },
            new Quote { Id = Guid.NewGuid(), Text = "Livet är vad som händer medan du är upptagen med att göra andra planer.", Author = "John Lennon", UserId = 0 },
            new Quote { Id = Guid.NewGuid(), Text = "Du missar 100% av de skotten du inte tar.", Author = "Wayne Gretzky", UserId = 0 },
            new Quote { Id = Guid.NewGuid(), Text = "Det spelar ingen roll hur långsamt du går, så länge du inte stannar.", Author = "Konfucius", UserId = 0 },
            new Quote { Id = Guid.NewGuid(), Text = "Det bästa sättet att förutsäga framtiden är att skapa den.", Author = "Abraham Lincoln", UserId = 0 },
        };

        // hämtar inloggad användares id
        private int GetUserId() => 
            int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        // hittar ett citat via id om det tillhör inloggad användare
        private Quote? FindQuote(Guid id, int userId) => 
            _quotes.FirstOrDefault(q => q.Id == id && q.UserId == userId);


        // == LÄSA ==
        // CRUD "R" eller READ
        // "GET" alla citat som tillhör användaren
        [HttpGet]
        public ActionResult<IEnumerable<Quote>> GetAll()
        {
            var userId = GetUserId();
            var userQuotes = Ok(_quotes.Where(q => q.UserId == userId || q.UserId == 0));
            return userQuotes;
        }

        // "GET" ett specifikt citat, 404 om det inte hittas eller inte tillhör användaren
        [HttpGet("{id}")]
        public ActionResult<Quote> GetById(Guid id)
        {
            var userId = GetUserId();
            var userQuote = FindQuote(id, userId);
            if (userQuote == null) return NotFound();
            return Ok(userQuote);
        }


        // == SKAPA ==
        // CRUD "C" eller CREATE
        // "POST" lägg till ett nytt citat
        [HttpPost]
        public ActionResult<Quote> Create([FromBody] Quote quote)
        {
            quote.Id = Guid.NewGuid();
            quote.UserId = GetUserId();
            _quotes.Add(quote);
            var newQuote = CreatedAtAction(nameof(GetById), new { id = quote.Id }, quote);
            return newQuote;
        }


        // == UPPDATERA ==
        // CRUD "U" eller UPDATE
        // "PUT" uppdatera citatinformation
        [HttpPut("{id}")]
        public ActionResult Update(Guid id, [FromBody] Quote updatedQuote)
        {
            var userId = GetUserId();
            if (FindQuote(id, userId) is not Quote quote) return NotFound();

            (quote.Text, quote.Author) = (updatedQuote.Text, updatedQuote.Author);

            return NoContent();
        }


        // == RADERA ==
        // CRUD "D" eller DELETE
        // "DELETE" ta bort ett citat
        [HttpDelete("{id}")]
        public ActionResult Delete(Guid id)
        {
            var userId = GetUserId();
            if (FindQuote(id, userId) is not Quote quote) return NotFound();
            _quotes.Remove(quote);
            return NoContent();
        }
    }
}