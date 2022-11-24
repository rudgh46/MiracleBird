package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.KakaoPush.CustomMessageService;
import com.ssafy.miraclebird.dao.CommentDao;
import com.ssafy.miraclebird.dao.PostDao;
import com.ssafy.miraclebird.dao.UserDao;
import com.ssafy.miraclebird.dto.CommentDto;
import com.ssafy.miraclebird.dto.PostDto;
import com.ssafy.miraclebird.entity.Comment;
import com.ssafy.miraclebird.entity.Post;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentDao commentDao;
    private final UserDao userDao;
    private final PostDao postDao;

    /*
     * 카카오톡 알림
     */
    @Autowired
    CustomMessageService customMEssageService;

    @Autowired
    public CommentServiceImpl(CommentDao commentDao, PostDao postDao, UserDao userDao) {
        this.commentDao = commentDao;
        this.postDao = postDao;
        this.userDao = userDao;
    }

    @Override
    @Transactional
    public List<CommentDto> getCommentAll(Long postIdx) throws Exception {
        try {
            List<Comment> commentList = commentDao.getCommentAll(postIdx);
            List<CommentDto> commentDtoList = commentList.stream().map(entity -> CommentDto.of(entity)).collect(Collectors.toList());

            for (CommentDto commentDto : commentDtoList) {
                User userEntity = userDao.getUserById(commentDto.getUserIdx());
                commentDto.setName(userEntity.getName());
                commentDto.setImage_url(userEntity.getImageUrl());
            }

            return commentDtoList;
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    @Transactional
    public void createComment(CommentDto commentDto, Long postIdx, Long userIdx) throws Exception {
        try {
            Comment commentEntity = new Comment();
            commentEntity.setContent(commentDto.getContent());
            commentEntity.setRegtime(LocalDateTime.now());
            commentEntity.setPost(postDao.getPost(postIdx));
            commentEntity.setUser(userDao.getUserById(userIdx));
            commentDao.saveComment(commentEntity);

            /*
             * 카카오톡 알림
             */
            //long writeUserIdx = postDao.getPost(postIdx).getUser().getUserIdx();
            //String commentUser = userDao.getUserById(userIdx).getName();
            //if(userIdx!=writeUserIdx && userDao.getUserById(writeUserIdx).getKakaoToken()!=null && LocalDateTime.now().isBefore(userDao.getUserById(writeUserIdx).getTokenPeriod().plusHours(6))) {
            //    customMEssageService.sendMyMessage(writeUserIdx, commentUser, 1);
            //}
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    @Transactional
    public void updateComment(CommentDto commentDto, Long userIdx) throws Exception {
        Comment commentEntity = commentDao.getComment(commentDto.getCommentIdx());

        if (commentEntity.getUser().getUserIdx() == userIdx) {
            commentEntity.setContent(commentDto.getContent());
            commentEntity.setRegtime(LocalDateTime.now());
            commentDao.saveComment(commentEntity);
        }
        else {
            throw new Exception();
        }
    }

    @Override
    @Transactional
    public void deleteComment(Long commentIdx, Long userIdx) throws Exception {
        Comment commentEntity = commentDao.getComment(commentIdx);

        if (commentEntity.getUser().getUserIdx() == userIdx) {
            commentDao.deleteComment(commentIdx);
        }
        else {
            throw new Exception();
        }
    }

}