package com.rohan.JobListing.Repo;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.stereotype.Component;

import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.rohan.JobListing.Model.JobPost;

@Component
public class SearchRepositoryImp implements SearchRepository {

    @Autowired
    MongoClient client; // We created client manually
    
    @Autowired
    MongoConverter converter;

    public List<JobPost> findByText(String text) {

        final List<JobPost> posts = new ArrayList<JobPost>();

        MongoDatabase database = client.getDatabase("Rohan");
        MongoCollection<Document> collection = database.getCollection("JobPost");

        // --- THIS IS THE IMPROVED SEARCH QUERY ---
        AggregateIterable<Document> result = collection.aggregate(Arrays.asList(
            new Document("$search",
                new Document("compound", // Use 'compound' to search multiple fields
                    new Document("should", Arrays.asList( // 'should' acts like an OR
                        new Document("text",
                            new Document("query", text)
                                .append("path", "profile") // Search the 'profile' field
                                .append("fuzzy", new Document("maxEdits", 1)) // Allow for 1 typo
                        ),
                        new Document("text",
                            new Document("query", text)
                                .append("path", "desc") // Search the 'desc' field
                        ),
                        new Document("text",
                            new Document("query", text)
                                .append("path", "techs") // Search the 'techs' field
                        )
                    ))
                    .append("minimumShouldMatch", 1) // At least one of the 'should' clauses must match
                )
            ),
            new Document("$sort",
                new Document("exp", 1L) // Sort by experience (ascending)
            ),
            new Document("$limit", 5L) // Limit to 5 results
        ));
        // ------------------------------------------
        
        // Convert BSON Documents to JobPost Java objects
        result.forEach(doc -> posts.add(converter.read(JobPost.class, doc)));

        return posts;
    }
}