package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dao.CommentDao;
import com.ssafy.miraclebird.dao.PostDao;
import com.ssafy.miraclebird.dao.UserDao;
import com.ssafy.miraclebird.dto.PostDto;
import com.ssafy.miraclebird.entity.Comment;
import com.ssafy.miraclebird.entity.Post;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.Role;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService {

    private final PostDao postDao;
    private final UserDao userDao;
    private final CommentDao commentDao;

    @Autowired
    public PostServiceImpl(PostDao postDao, UserDao userDao, CommentDao commentDao) {
        this.postDao = postDao;
        this.userDao = userDao;
        this.commentDao = commentDao;
    }

    @Override
    @Transactional
    public List<PostDto> getPostAll() throws Exception {
        try {
            List<Post> postList = postDao.getPostAll();
            List<PostDto> postDtoList = postList.stream().map(entity -> PostDto.of(entity)).collect(Collectors.toList());

            for (PostDto postDto : postDtoList) {
                User userEntity = userDao.getUserById(postDto.getUserIdx());
                postDto.setUserRole(userEntity.getRole());
                postDto.setName(userEntity.getName());
                postDto.setImage_url(userEntity.getImageUrl());
            }

            return postDtoList;
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    @Transactional
    public PostDto getPost(Long postIdx) throws Exception{
        try {
            Post postEntity = postDao.getPost(postIdx);
            User userEntity = postEntity.getUser();
            postEntity.setHit(postEntity.getHit()+1);
            PostDto postDto = PostDto.of(postEntity);
            postDto.setUserRole(userEntity.getRole());
            postDto.setName(userEntity.getName());
            postDto.setImage_url(userEntity.getImageUrl());

            return postDto;
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    @Transactional
    public void createPost(PostDto postDto, Long userIdx) throws Exception {
        try {
            Post postEntity = new Post();
            System.out.println("뽀스트 엔티티생성");
            postEntity.setTitle(postDto.getTitle());
            postEntity.setContent(postDto.getContent());
            postEntity.setRegtime(LocalDateTime.now());
            postEntity.setHit(0);
            postEntity.setUser(userDao.getUserById(userIdx));
            System.out.println("엔티티 세팅 완료");
            postDao.savePost(postEntity);
            System.out.println("세이브됬는데?");
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    @Transactional
    public void updatePost(PostDto postDto, Long userIdx) throws Exception {
        Post postEntity = postDao.getPost(postDto.getPostIdx());

        if (postEntity.getUser().getUserIdx() == userIdx) {
            postEntity.setTitle(postDto.getTitle());
            postEntity.setContent(postDto.getContent());
            postDao.savePost(postEntity);
        }
        else {
            throw new Exception();
        }
    }

    @Override
    @Transactional
    public void deletePost(Long postIdx, Long userIdx) throws Exception {
        Post postEntity = postDao.getPost(postIdx);

        if (postEntity.getUser().getUserIdx() == userIdx) {
            List<Comment> commentList = commentDao.getCommentAll(postIdx);

            for(Comment comment : commentList) {
                commentDao.deleteComment(comment.getCommentIdx());
            }

            postDao.deletePost(postIdx);
        }
        else {
            throw new Exception();
        }
    }
}