package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;

public interface UserDao {

    User getUserById(Long userIdx) throws Exception;

    User updateUserInfo(Long userIdx, String name, String imageUrl) throws Exception;

    void saveUser(User user) throws Exception;
    void deleteToken(String email) throws Exception;
}