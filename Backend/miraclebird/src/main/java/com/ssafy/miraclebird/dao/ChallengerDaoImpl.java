package com.ssafy.miraclebird.dao;


import com.ssafy.miraclebird.dto.ChallengerDto;
import com.ssafy.miraclebird.entity.Challenge;
import com.ssafy.miraclebird.entity.Challenger;
import com.ssafy.miraclebird.repository.ChallengeRepository;
import com.ssafy.miraclebird.repository.ChallengerRepository;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import com.ssafy.miraclebird.securityOauth.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ChallengerDaoImpl implements ChallengerDao {
    private final ChallengerRepository challengerRepository;
    private final ChallengeRepository challengeRepository;
    private final UserRepository userRepository;

    @Autowired
    public ChallengerDaoImpl(ChallengerRepository challengerRepository, ChallengeRepository challengeRepository, UserRepository userRepository){
        this.challengerRepository = challengerRepository;
        this.challengeRepository = challengeRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Challenger> getChallengerALL() {
        List<Challenger> challengerEntity = challengerRepository.findAll();
        return challengerEntity;
    }

    @Override
    public Challenger getChallengerById(long challengerIdx) {
        Challenger challengerEntity = challengerRepository.getById(challengerIdx);
        return challengerEntity;
    }

    @Override
    public Challenger getIdByEntities(long challengeIdx, long userIdx) {
        Challenge challenge = challengeRepository.getById(challengeIdx);
        User user = userRepository.getById(userIdx);
        Challenger challengerEntity = challengerRepository.findTop1ByChallengeAndUser(challenge, user);
        return challengerEntity;
    }

    @Override
    public void addChallenger(Challenger challenger) throws Exception {
        try {
            challengerRepository.save(challenger);
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    public void deleteChallenger(Long challengerIdx) throws Exception {
        try {
            challengerRepository.deleteById(challengerIdx);
        }
        catch (Exception e) {
            throw new Exception();
        }
    }
}
