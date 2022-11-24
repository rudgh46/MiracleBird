package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.entity.Comment;
import com.ssafy.miraclebird.entity.Post;
import com.ssafy.miraclebird.repository.CommentRepository;
import com.ssafy.miraclebird.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CommentDaoImpl implements CommentDao {

    private final CommentRepository commentRepository;

    @Autowired
    public CommentDaoImpl(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Override
    public List<Comment> getCommentAll(Long postIdx) {
        List<Comment> commentList = commentRepository.findAllByPost_PostIdx(postIdx);

        return commentList;
    }

    @Override
    public Comment getComment(Long commentIdx) throws Exception {
        Comment commentEntity = commentRepository.getById(commentIdx);

        if(commentEntity == null)
            throw new Exception();

        return commentEntity;
    }

    @Override
    public void saveComment(Comment comment) throws Exception {
        try {
            commentRepository.save(comment);
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    public void deleteComment(Long commentIdx) throws Exception{
        try {
            commentRepository.deleteById(commentIdx);
        }
        catch (Exception e) {
            throw new Exception();
        }
    }
}
