package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dto.CommentDto;
import com.ssafy.miraclebird.dto.PostDto;
import com.ssafy.miraclebird.entity.Comment;

import java.util.List;

public interface CommentService {
    List<CommentDto> getCommentAll(Long postIdx) throws Exception;
    void createComment(CommentDto commentDto, Long postIdx, Long userIdx) throws Exception;
    void updateComment(CommentDto commentDto, Long userIdx) throws Exception;
    void deleteComment(Long commentIdx, Long userIdx) throws Exception;
}