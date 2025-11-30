package com.example.books.web;


import com.example.books.model.Book;
import com.example.books.repo.BookRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins="http://localhost:5173")
public class BookController {


    private final BookRepository repo;

    public BookController(BookRepository repo){
        this.repo=repo;
    }

    @GetMapping
    public List<Book> all(){
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Book one(@PathVariable long id){
       return repo.findById(id).orElseThrow(()-> new RuntimeException("BOOK_NOT_FOUND"));
    }

    @GetMapping("/search")
    public List<Book> search(@RequestParam("q") String q){
        return repo.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(q,q);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Book create (@RequestBody Book b){
        b.setId(null);
        return repo.save(b);
    }

    @PutMapping("/{id}")
    public Book update(@PathVariable Long id, @Valid @RequestBody Book updated){
   return repo.findById(id).map(existing -> {
existing.setAuthor(updated.getAuthor());
existing.setYear(updated.getYear());
existing.setPrice(updated.getPrice());
existing.setTitle(updated.getTitle());
existing.setStatus(updated.getStatus());
return repo.save(existing);

   } ).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"BOOK_NOT_FOUND"));
        
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void delete (@PathVariable long id){

        if(!repo.existsById(id)) throw new RuntimeException("BOOK_NOT_FOUND");
        repo.deleteById(id);
    }

}
