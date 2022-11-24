package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import com.ssafy.miraclebird.securityOauth.repository.auth.TokenRepository;
import com.ssafy.miraclebird.securityOauth.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserDaoImpl implements UserDao{

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;

    @Autowired
    public UserDaoImpl(UserRepository userRepository, TokenRepository tokenRepository) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
    }

    @Override
    public User getUserById(Long userIdx) throws Exception {
        User userEntity = userRepository.getById(userIdx);

        if(userEntity == null)
            throw new Exception();

        return userEntity;
    }

    @Override
    public User updateUserInfo(Long userIdx, String name, String imageUrl) throws Exception {

        Optional<User> userEntity = userRepository.findById(userIdx);
        User selectUser = null;

        if(userEntity.isPresent()) {
            selectUser = userEntity.get();
            if(name != null)selectUser.setName(name);
            if(imageUrl != null)selectUser.setImageUrl(imageUrl);
            userRepository.save(selectUser);
        }
        else {
            throw new Exception();
        }

        return selectUser;
    }

    @Override
    public void saveUser(User user) throws Exception {
        try {
            userRepository.save(user);
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    public void deleteToken(String email) throws Exception {
        try {
            tokenRepository.deleteByUserEmail(email);
        }
        catch (Exception e) {
            throw new Exception();
        }
    }
}
