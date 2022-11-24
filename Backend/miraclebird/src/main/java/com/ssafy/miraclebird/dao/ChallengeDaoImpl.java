package com.ssafy.miraclebird.dao;


import com.ssafy.miraclebird.entity.Challenge;
import com.ssafy.miraclebird.repository.ChallengeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ChallengeDaoImpl implements ChallengeDao {
    private final ChallengeRepository challengeRepository;

    @Autowired
    public ChallengeDaoImpl(ChallengeRepository challengeRepository){
        this.challengeRepository = challengeRepository;
    }

    @Override
    public List<Challenge> getChallengeALL() {
        List<Challenge> challengeEntity = challengeRepository.findAll();
        return challengeEntity;
    }

    @Override
    public Challenge getChallengeById(long challengeIdx) {
        Challenge challengeEntity = challengeRepository.getById(challengeIdx);
        return challengeEntity;
    }

    @Override
    public void saveChallenge(Challenge challenge) throws Exception {
        challengeRepository.save(challenge);
    }
}
