package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.KakaoPush.CustomMessageService;
import com.ssafy.miraclebird.dao.VerificationLikeDao;
import com.ssafy.miraclebird.dao.UserDao;
import com.ssafy.miraclebird.dao.VerificationDao;
import com.ssafy.miraclebird.dto.VerificationLikeDto;
import com.ssafy.miraclebird.entity.VerificationLike;
import com.ssafy.miraclebird.entity.Verification;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VerificationLikeServiceImpl implements VerificationLikeService{
    private final VerificationLikeDao verificationLikeDao;
    private final UserDao userDao;
    private final VerificationDao verificationDao;

    /*
     * 카카오톡 알림
     */
    @Autowired
    CustomMessageService customMEssageService;

    @Autowired
    public VerificationLikeServiceImpl(VerificationLikeDao verificationLikeDao, UserDao userDao, VerificationDao verificationDao) {
        this.verificationLikeDao = verificationLikeDao;
        this.userDao = userDao;
        this.verificationDao = verificationDao;
    }

//    @Override
//    @Transactional
//    public List<VerificationLikeDto> getVerificationLikeALL() throws Exception {
//        try {
//            List<VerificationLike> verificationLikeList = verificationLikeDao.getVerificationLikeALL();
//            List<VerificationLikeDto> verificationLikeDtoList = verificationLikeList.stream().map(entity -> VerificationLikeDto.of(entity)).collect(Collectors.toList());
//            for (VerificationLikeDto verificationLikeDto : verificationLikeDtoList) {
//                User user = userDao.getUserById(verificationLikeDto.getUserIdx());
//                Verification verification = verificationDao.getVerificationById(verificationLikeDto.getVerificationIdx());
//                verificationLikeDto.setVerificationLikeerName(user.getName());
//                verificationLikeDto.setSuspectName(verification.getUser().getName());
//            }
//            return verificationLikeDtoList;
//            }
//        catch (Exception e) {
//            throw new Exception();
//        }
//    }

    @Override
    @Transactional
    public VerificationLikeDto getVerificationLikeById(long verificationLikeId) {
        VerificationLike verificationLikeEntity = verificationLikeDao.getVerificationLikeById(verificationLikeId);
        VerificationLikeDto verificationLikeDto = VerificationLikeDto.of(verificationLikeEntity);
        return verificationLikeDto;
    }

    @Override
    @Transactional
    public boolean getVerificationLikeByUser(long verificationId, long userId) {
        boolean result = verificationLikeDao.getVerificationLikeByUser(verificationId, userId);
        return result;
    }
    @Override
    @Transactional
    public long getVerificationLikeByVerification(long verificationId) {
        long result = verificationLikeDao.getVerificationLikeByVerification(verificationId);
        return result;
    }

    @Override
    @Transactional
    public void createVerificationLike(long verificationId, long userId) throws Exception {
        try {
            VerificationLike verificationLikeEntity = new VerificationLike();

            User user = userDao.getUserById(userId);
            Verification verification = verificationDao.getVerificationById(verificationId);

            verificationLikeEntity.setUser(user);
            verificationLikeEntity.setVerification(verification);

            verificationLikeDao.saveVerificationLike(verificationLikeEntity);

            /*
             * 카카오톡 알림
             */
            //long writeUserIdx = verification.getUser().getUserIdx();
            //String likeUser = userDao.getUserById(userId).getName();
            //if(userId != writeUserIdx && userDao.getUserById(writeUserIdx).getKakaoToken()!=null && LocalDateTime.now().isBefore(userDao.getUserById(writeUserIdx).getTokenPeriod().plusHours(6))) {
            //    customMEssageService.sendMyMessage(writeUserIdx, likeUser, 2);
            //}
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    @Transactional
    public void deleteVerificationLike(long verificationId, long userId) throws Exception {
        try {
//            VerificationLike verificationLikeEntity = new VerificationLike();
//
//            User user = userDao.getUserById(userId);
//            Verification verification = verificationDao.getVerificationById(verificationId);
//
//            verificationLikeEntity.setUser(user);
//            verificationLikeEntity.setVerification(verification);
//
//            verificationLikeDao.saveVerificationLike(verificationLikeEntity);
            verificationLikeDao.deleteVerificationLike(verificationId,userId);
        }
        catch (Exception e) {
            throw new Exception();
        }
    }
}
