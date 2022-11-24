package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dto.PostDto;

import java.util.List;

public interface PostService {
    List<PostDto> getPostAll() throws Exception;
    PostDto getPost(Long postIdx) throws Exception;
    void createPost(PostDto postDto, Long userIdx) throws Exception;
    void updatePost(PostDto postDto, Long userIdx) throws Exception;
    void deletePost(Long postIdx, Long userIdx) throws Exception;
}