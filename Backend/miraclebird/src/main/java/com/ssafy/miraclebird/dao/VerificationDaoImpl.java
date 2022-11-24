package com.ssafy.miraclebird.dao;


import com.ssafy.miraclebird.dto.RankDto;
import com.ssafy.miraclebird.entity.Challenge;
import com.ssafy.miraclebird.entity.Verification;
import com.ssafy.miraclebird.repository.ChallengeRepository;
import com.ssafy.miraclebird.repository.VerificationRepository;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import com.ssafy.miraclebird.securityOauth.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class VerificationDaoImpl implements VerificationDao {
    private final VerificationRepository verificationRepository;
    private final UserRepository userRepository;
    private final ChallengeRepository challengeRepository;

    @Autowired
    public VerificationDaoImpl(VerificationRepository verificationRepository, UserRepository userRepository, ChallengeRepository challengeRepository){
        this.verificationRepository = verificationRepository;
        this.userRepository = userRepository;
        this.challengeRepository = challengeRepository;
    }

    @Override
    public List<Verification> getVerificationALL() {
        List<Verification> verificationEntity = verificationRepository.findAll();
        return verificationEntity;
    }

    @Override
    public Verification getVerificationById(long verificationIdx) {
        Verification verificationEntity = verificationRepository.getById(verificationIdx);
        return verificationEntity;
    }

    @Override
    public List<Verification> getVerificationByUser(long userIdx) {
        User user = userRepository.getById(userIdx);
        List<Verification> verificationEntity = verificationRepository.findByUser(user);
        return verificationEntity;
    }

    @Override
    public void saveVerification(Verification verification) throws Exception {
        try {
            verificationRepository.save(verification);
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    public Verification approveVerification(long verificationIdx, long updateApproval) throws Exception {
        Verification verificationEntity = verificationRepository.getById(verificationIdx);

        if(verificationEntity != null) {
            verificationEntity.setApproval(updateApproval);
            verificationRepository.save(verificationEntity);
            return verificationEntity;
        }
        else {
            throw new Exception();
        }
    }

    public void deleteVerificationInfo(long verificationIdx) throws Exception {
        try {
            verificationRepository.deleteById(verificationIdx);
        } catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    public List<Verification> getVerificationByPeriod(Long userIdx, LocalDateTime startDate, LocalDateTime endDate) {
        User user = userRepository.getById(userIdx);
        List<Verification> verificationEntity = verificationRepository.findByUserAndRegtimeBetween(user,startDate,endDate);
        return verificationEntity;
    }

    @Override
    public List<String> getRankByCount() {
        verificationRepository.rownuminit();
        List<String> stringEntity = verificationRepository.getRankByCount();
        return stringEntity;
    }
    @Override
    public List<String> getRankByStreak() {
        verificationRepository.rownuminit();
        List<String> stringEntity = verificationRepository.getRankByStreak();
        return stringEntity;
    }
    @Override
    public long getStreakByUserIdx(Long userIdx) {
        verificationRepository.rownuminit();
        List<Long> list = verificationRepository.getStreakByUserIdx(userIdx);
        if(list.size() != 1) return 0;
        return list.get(0);
    }
    @Override
    public List<RankDto> getNftOwner() {
        List<RankDto> rankDtoList = new ArrayList<>();
        List<String> stringList = verificationRepository.getNftOwner();
        for (int i = 0; i < stringList.size(); i++) {
            String temp = stringList.get(i);
            String[] arr = temp.split("http",2);
            RankDto rankDto = new RankDto();
            rankDto.setName(arr[0]);
            rankDto.setImage("http" + arr[1]);
            rankDtoList.add(rankDto);
        }

        return rankDtoList;
    }

    @Override
    public boolean isUploaded(long userIdx, long challengeIdx, LocalDateTime regtime) {
        User user = userRepository.getById(userIdx);
        Challenge challenge = challengeRepository.getById(challengeIdx);
        List<Verification> list = verificationRepository.findByUserAndChallengeAndApprovalAndRegtimeAfter(user, challenge, 0, regtime);
        List<Verification> list2 = verificationRepository.findByUserAndChallengeAndApprovalAndRegtimeAfter(user, challenge, 1, regtime);
        if(list.size() == 0 && list2.size() == 0) return false;
        return true;
    }
}
