package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dao.UserDao;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService{

    private final UserDao userDao;

    @Autowired
    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    @Transactional
    public UserDto getUserById(Long userIdx) throws Exception{
        User userEntity = userDao.getUserById(userIdx);
        UserDto userDto = UserDto.of(userEntity);

        return userDto;
    }

    @Override
    @Transactional
    public UserDto updateUserInfo(Long userIdx, String name, String imageUrl) throws Exception {
        User userEntity = userDao.updateUserInfo(userIdx, name, imageUrl);
        UserDto userDto = UserDto.of(userEntity);

        return userDto;
    }

    @Override
    @Transactional
    public void updateUserBlacklist(Long userIdx, Long blacklist) throws Exception {
        User userEntity = userDao.getUserById(userIdx);

        if (userEntity.getRole().getValue() == "ROLE_ADMIN") {
            User blacklistEntity = userDao.getUserById(blacklist);
            blacklistEntity.setBlacklist(true);
        }
        else {
            throw new Exception();
        }
    }

    @Override
    @Transactional
    public void deleteUser(Long userIdx) throws Exception {
        User userEntity = userDao.getUserById(userIdx);
        userDao.deleteToken(userEntity.getEmail());
        userEntity.setEmail(null);
        userEntity.setImageUrl(null);
        userEntity.setName("탈퇴한 회원");
        userDao.saveUser(userEntity);
    }
}