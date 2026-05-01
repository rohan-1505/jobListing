	package com.rohan.JobListing.Repo;
	
	import java.util.List;
	
	import com.rohan.JobListing.Model.JobPost;
	
	public interface SearchRepository {
	
	
			List<JobPost> findByText(String text);
	
	}
