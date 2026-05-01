package com.rohan.JobListing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories(basePackages = "com.rohan.JobListing.Repo")
public class JoblistingApplication {
    public static void main(String[] args) {
        SpringApplication.run(JoblistingApplication.class, args);
    }
}
