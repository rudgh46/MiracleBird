package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.entity.Comment;
import com.ssafy.miraclebird.entity.Post;

import java.util.List;

public interface CommentDao {
    List<Comment> getCommentAll(Long postIdx) throws Exception;
    Comment getComment(Long commentIdx) throws Exception;
    void saveComment(Comment comment) throws Exception;
    void deleteComment(Long commentIdx) throws Exception;
}