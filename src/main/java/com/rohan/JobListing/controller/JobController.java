package com.rohan.JobListing.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;   // <-- Import this
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.rohan.JobListing.Model.JobPost;
import com.rohan.JobListing.Repo.JobRepository;
import com.rohan.JobListing.Repo.SearchRepository;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin(origins = "http://localhost:3000")  // <-- Allow React app running on port 3000
public class JobController {

    @Autowired
    JobRepository repo;

    @Autowired	
    SearchRepository srepo;

    @GetMapping("/")
    public void redirect(HttpServletResponse resp) throws IOException {
        resp.sendRedirect("/swagger-ui/index.html");
    }

    @GetMapping("/allPosts")
    public List<JobPost> getAllPost() {
        return repo.findAll();    
    }

    @GetMapping("/posts/{text}")
    public List<JobPost> search(@PathVariable String text) {
        return srepo.findByText(text);
    }

    @PostMapping("/post")
    public JobPost addPost(@RequestBody JobPost post) {
        return repo.save(post);
    }
    
    @DeleteMapping("/post/{id}")
    public ResponseEntity<String> deletePost(@PathVariable String id) {
        try {
            repo.deleteById(id);
            // Return a success response
            return ResponseEntity.ok("Post deleted successfully with ID: " + id);
        } catch (Exception e) {
            // Handle cases where the ID might not be found or other errors
            return ResponseEntity.status(500).body("Error deleting post: " + e.getMessage());
        }
    }
}
