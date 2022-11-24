package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dao.*;
import com.ssafy.miraclebird.dto.RankDto;
import com.ssafy.miraclebird.dto.VerificationDto;
import com.ssafy.miraclebird.entity.Verification;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class VerificationServiceImpl implements VerificationService {
    private final VerificationDao verificationDao;
    private final UserDao userDao;
    private final ChallengeDao challengeDao;

    @Autowired
    public VerificationServiceImpl(VerificationDao verificationDao, UserDao userDao, ChallengeDao challengeDao) {
        this.verificationDao = verificationDao;
        this.userDao = userDao;
        this.challengeDao = challengeDao;
    }

    @Override
    @Transactional
    public List<VerificationDto> getVerificationALL() {
        List<Verification> verificationEntity = verificationDao.getVerificationALL();
        List<VerificationDto> verificationDtos = new ArrayList<>();
        for (int i = 0; i < verificationEntity.size(); i++) {
            User userEntity = verificationEntity.get(i).getUser();
            VerificationDto verificationDto = VerificationDto.of(verificationEntity.get(i));
            verificationDto.setName(userEntity.getName());
            verificationDto.setImageUrl(userEntity.getImageUrl());
            verificationDtos.add(verificationDto);
        }
        return verificationDtos;
    }

    @Override
    @Transactional
    public VerificationDto getVerificationById(long verificationId) {
        Verification verificationEntity = verificationDao.getVerificationById(verificationId);
        User userEntity = verificationEntity.getUser();
        VerificationDto verificationDto = VerificationDto.of(verificationEntity);
        verificationDto.setName(userEntity.getName());
        verificationDto.setImageUrl(userEntity.getImageUrl());
        return verificationDto;
    }

    @Override
    @Transactional
    public List<VerificationDto> getVerificationByUser(long userIdx) {
        List<Verification> verificationEntity = verificationDao.getVerificationByUser(userIdx);
        List<VerificationDto> verificationDtos = new ArrayList<>();
        for (int i = 0; i < verificationEntity.size(); i++) {
            User userEntity = verificationEntity.get(i).getUser();
            VerificationDto verificationDto = VerificationDto.of(verificationEntity.get(i));
            verificationDto.setName(userEntity.getName());
            verificationDto.setImageUrl(userEntity.getImageUrl());
            verificationDtos.add(verificationDto);
        }
        return verificationDtos;
    }

    @Override
    @Transactional
    public String uploadVerification(VerificationDto verificationDto) throws Exception {
        try {
            if(verificationDao.isUploaded(verificationDto.getUserIdx(), verificationDto.getChallengeIdx(), LocalDate.now().atStartOfDay())) return "already_uploaded";
            Verification verificationEntity = new Verification();
            verificationEntity.setRegtime(LocalDateTime.now());
            verificationEntity.setSelfie(verificationDto.getSelfie());
            verificationEntity.setUser(userDao.getUserById(verificationDto.getUserIdx()));
            verificationEntity.setChallenge(challengeDao.getChallengeById(verificationDto.getChallengeIdx()));
            verificationEntity.setApproval((long)0);    //초기값 0으로(미검토)
            verificationEntity.setShare(verificationDto.getShare());
            verificationDao.saveVerification(verificationEntity);
            return "upload_success";
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    @Transactional
    public VerificationDto approveVerification(long verificationId, long updateApproval, long userId) throws Exception {
        User user = userDao.getUserById(userId);
        if (user.getRole().getValue() == "ROLE_ADMIN") {
            Verification verificationEntity = verificationDao.approveVerification(verificationId, updateApproval);
            VerificationDto verificationDto = VerificationDto.of(verificationEntity);
            return verificationDto;
        }
        return null;
    }

    @Override
    @Transactional
    public void deleteVerificationInfo(long verificationId, long userId) throws Exception {
        try {
            User user = userDao.getUserById(userId);
            Verification verification = verificationDao.getVerificationById(verificationId);
            if (userId == verification.getUser().getUserIdx() || user.getRole().getValue() == "ROLE_ADMIN") {
                verificationDao.deleteVerificationInfo(verificationId);
            }
        }
        catch (Exception e){
            throw e;
        }
    }

    @Override
    @Transactional
    public List<VerificationDto> getVerificationByPeriod(Long userIdx, LocalDateTime startDate, LocalDateTime endDate) {
        List<Verification> verificationEntity = verificationDao.getVerificationByPeriod(userIdx, startDate, endDate);
        List<VerificationDto> verificationDtos = new ArrayList<>();
        for (int i = 0; i < verificationEntity.size(); i++) {
            verificationDtos.add(VerificationDto.of(verificationEntity.get(i)));
        }
        return verificationDtos;
    }

    @Override
    @Transactional
    public List<String> getRankByCount() {
        List<String> stringEntity = verificationDao.getRankByCount();
        return stringEntity;
    }

    @Override
    @Transactional
    public List<String> getRankByStreak() {
        List<String> stringEntity = verificationDao.getRankByStreak();
        return stringEntity;
    }
    @Override
    @Transactional
    public long getStreakByUserIdx(Long userIdx) {
        long result = verificationDao.getStreakByUserIdx(userIdx);
        return result;
    }

    @Override
    @Transactional
    public List<RankDto> getNftOwner() {
        List<RankDto> rank = verificationDao.getNftOwner();
        return rank;
    }
}
