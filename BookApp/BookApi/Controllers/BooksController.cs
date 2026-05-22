using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BookApi.Models;
using System.Security.Claims;

namespace BookApi.Controllers
{
    [ApiController]                     // markerar som API-kontroller
    [Route("api/[controller]")]         // sätter URL till api/books
    [Authorize]                         // kräver en giltig JWT-token på alla endpoints
    public class BooksController : ControllerBase
    {
        // lagras i minnet, rensas när servern startas om (ingen databas)
        private static List<Book> _books = new();

        // hämtar inloggad användares id
        private int GetUserId() =>
            int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        // hittar en bok via id om den tillhör inloggad användare
        private Book? FindBook(Guid id, int userId) =>
            _books.FirstOrDefault(b => b.Id == id && b.UserId == userId);


        // == LÄSA ==
        // CRUD "R" eller READ
        // "GET" alla böcker som tillhör användaren
        [HttpGet]
        public ActionResult<IEnumerable<Book>> GetAll()
        {
            var userId = GetUserId();
            var userBooks = Ok(_books.Where(b => b.UserId == userId));
            return userBooks;
        }

        // "GET" en specifik bok, 404 om den inte hittas eller inte tillhör användaren
        [HttpGet("{id}")]
        public ActionResult<Book> GetById(Guid id)
        {
            var userId = GetUserId();
            var userBook = FindBook(id, userId);
            if (userBook == null) return NotFound();
            return Ok(userBook);
        }


        // == SKAPA ==
        // CRUD "C" eller CREATE
        // "POST" lägg till en ny bok
        [HttpPost]
        public ActionResult<Book> Create([FromBody] Book book)  // [FromBody] läser JSON som Angular skickar
        {
            book.Id = Guid.NewGuid();   // generera unikt id automatiskt
            book.UserId = GetUserId();  // sätt ägare på servern
            _books.Add(book);
            return CreatedAtAction(nameof(GetById), new { id = book.Id }, book);
        }


        // == UPPDATERA ==
        // CRUD "U" eller UPDATE
        // "PUT" uppdatera bokinformation
        [HttpPut("{id}")]
        public ActionResult Update(Guid id, [FromBody] Book updatedBook)
        {
            var userId = GetUserId();
            if (FindBook(id, userId) is not Book book) return NotFound();

            // ändra värden på befintlig bok, UserId exkluderat
            (book.Title, book.Author, book.PublishedDate, book.Description, book.Genre) =
                (updatedBook.Title, updatedBook.Author, updatedBook.PublishedDate, updatedBook.Description, updatedBook.Genre);

            return NoContent();
        }


        // == RADERA ==
        // CRUD "D" eller DELETE
        // "DELETE" ta bort en bok
        [HttpDelete("{id}")]
        public ActionResult Delete(Guid id)
        {
            var userId = GetUserId();
            if (FindBook(id, userId) is not Book book) return NotFound();
            _books.Remove(book);
            return NoContent();
        }
    }
}