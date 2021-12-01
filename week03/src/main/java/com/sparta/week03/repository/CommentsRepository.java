package com.sparta.week03.repository;

import com.sparta.week03.domain.Comments;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentsRepository extends JpaRepository<Comments, Long> {
    List<Comments> findByMemoId(Long id);
}
