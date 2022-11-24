package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dto.ChallengeDto;

import java.util.List;

public interface ChallengeService {
    List<ChallengeDto> getChallengeALL();
    ChallengeDto getChallengeById(long challengeId);
    void createChallenge(ChallengeDto challengeDto, long userId) throws Exception;
}
