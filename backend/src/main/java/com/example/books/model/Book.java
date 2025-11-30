package com.example.books.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Author name is required")
    @Column(nullable = false)
    private String author;

    @Min(value = 1450, message = "Invalid year")
    @Max(value = 2100, message = "Invalid year")
    @Column(name = "pub_year")
    private int year;

    @DecimalMin(value = "0.0", inclusive = true, message = "Price cannot be negative")
    private double price;

    @NotBlank(message = "Status is required")
    private String status;

    public Book() {}

    public Book(String title, String author, int year, double price, String status) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.price = price;
        this.status = status;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
