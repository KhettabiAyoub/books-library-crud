package com.example.books.config;


import com.example.books.model.Book;
import com.example.books.repo.BookRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {
@Bean
CommandLineRunner initBooks(BookRepository repo){
return args -> {

if(repo.count() == 0){
repo.save(new Book("Clean Code", "Robert C. Martin", 2008, 29.99, "AVAILABLE"));
repo.save(new Book("Effective Java", "Joshua Bloch", 2018, 39.99, "BORROWED"));
repo.save(new Book("You Don't Know JS", "Kyle Simpson", 2015, 24.99, "AVAILABLE"));
}
};



}
}
