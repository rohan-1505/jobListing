package com.rohan.JobListing.Repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.rohan.JobListing.Model.JobPost;

public interface JobRepository extends MongoRepository<JobPost, String> {
}
