package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dao.ChallengeDao;
import com.ssafy.miraclebird.dao.UserDao;
import com.ssafy.miraclebird.entity.Challenge;
import com.ssafy.miraclebird.dto.ChallengeDto;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChallengeServiceImpl implements ChallengeService{
    private final ChallengeDao challengeDao;
    private final UserDao userDao;

    @Autowired
    public ChallengeServiceImpl(ChallengeDao challengeDao, UserDao userDao) {

        this.challengeDao = challengeDao;
        this.userDao = userDao;
    }

    @Override
    @Transactional
    public List<ChallengeDto> getChallengeALL() {
        List<Challenge> challengeEntity = challengeDao.getChallengeALL();
        List<ChallengeDto> challengeDtos = new ArrayList<>();
        for (int i = 0; i < challengeEntity.size(); i++) {
            challengeDtos.add(ChallengeDto.of(challengeEntity.get(i)));
        }
        return challengeDtos;
    }

    @Override
    @Transactional
    public ChallengeDto getChallengeById(long challengeId) {
        Challenge challengeEntity = challengeDao.getChallengeById(challengeId);
        ChallengeDto challengeDto = ChallengeDto.of(challengeEntity);
        return challengeDto;
    }

    @Override
    @Transactional
    public void createChallenge(ChallengeDto challengeDto, long userId) throws Exception {
        try {
            User user = userDao.getUserById(userId);
            if (user.getRole().getValue() == "ROLE_ADMIN") {
                Challenge challengeEntity = new Challenge();
                challengeEntity.setTitle(challengeDto.getTitle());
                challengeEntity.setContent(challengeDto.getContent());

                challengeDao.saveChallenge(challengeEntity);
            }
        }
        catch (Exception e) {
            throw new Exception();
        }
    }
}
