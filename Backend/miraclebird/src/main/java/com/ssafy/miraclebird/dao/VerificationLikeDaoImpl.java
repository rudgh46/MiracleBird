package com.ssafy.miraclebird.dao;


import com.ssafy.miraclebird.entity.Verification;
import com.ssafy.miraclebird.entity.VerificationLike;
import com.ssafy.miraclebird.repository.VerificationLikeRepository;
import com.ssafy.miraclebird.repository.VerificationRepository;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import com.ssafy.miraclebird.securityOauth.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class VerificationLikeDaoImpl implements VerificationLikeDao {
    private final VerificationLikeRepository verificationLikeRepository;
    private final VerificationRepository verificationRepository;
    private final UserRepository userRepository;

    @Autowired
    public VerificationLikeDaoImpl(VerificationLikeRepository verificationLikeRepository, VerificationRepository verificationRepository, UserRepository userRepository){
        this.verificationLikeRepository = verificationLikeRepository;
        this.verificationRepository = verificationRepository;
        this.userRepository = userRepository;
    }

//    @Override
//    public List<VerificationLike> getVerificationLikeALL() {
//        List<VerificationLike> verificationLikeEntity = verificationLikeRepository.findAll();
//        System.out.println("여기이");
//        return verificationLikeEntity;
//    }

    @Override
    public VerificationLike getVerificationLikeById(long verificationLikeIdx) {
        VerificationLike verificationLikeEntity = verificationLikeRepository.getById(verificationLikeIdx);
        return verificationLikeEntity;
    }

    @Override
    public boolean getVerificationLikeByUser(long verificationIdx, long userIdx) {
        Verification verification = verificationRepository.getById(verificationIdx);
        User user = userRepository.getById(userIdx);
        boolean result = verificationLikeRepository.existsByVerificationAndUser(verification,user);
        return result;
    }

    @Override
    public long getVerificationLikeByVerification(long verificationIdx) {
        Verification verification = verificationRepository.getById(verificationIdx);
        long result = verificationLikeRepository.countAllByVerification(verification);
        return result;
    }

    @Override
    public void saveVerificationLike(VerificationLike verificationLike) throws Exception {
        verificationLikeRepository.save(verificationLike);
    }
    @Override
    public void deleteVerificationLike(long verificationIdx, long userIdx) throws Exception {
        try {
            Verification verification = verificationRepository.getById(verificationIdx);
            User user = userRepository.getById(userIdx);

            verificationLikeRepository.deleteByVerificationAndUser(verification, user);
        }
        catch (Exception e) {
            throw new Exception();
        }
    }
}
