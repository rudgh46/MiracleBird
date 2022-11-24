package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.entity.Challenge;

import java.util.List;

public interface ChallengeDao {
    List<Challenge> getChallengeALL();
    Challenge getChallengeById(long challengeIdx);
    void saveChallenge(Challenge challenge) throws Exception;
}
