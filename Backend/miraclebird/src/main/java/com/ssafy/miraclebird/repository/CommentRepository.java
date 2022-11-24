package com.ssafy.miraclebird.repository;

import com.ssafy.miraclebird.entity.Comment;
import com.ssafy.miraclebird.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long>{
    List<Comment> findAllByPost_PostIdx(Long postIdx);
}
