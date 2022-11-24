package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.entity.Post;

import java.util.List;

public interface PostDao {
    List<Post> getPostAll() throws Exception;
    Post getPost(Long postIdx) throws Exception;
    void savePost(Post post) throws Exception;
    void deletePost(Long postIdx) throws Exception;
}