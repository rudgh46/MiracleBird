package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dto.ChallengerDto;

import java.util.List;

public interface ChallengerService {
    List<ChallengerDto> getChallengerALL();
    ChallengerDto getChallengerById(long challengerId);
    Long getIdByEntities(long challengeId, long userId);
    String addChallenger(ChallengerDto challengerDto) throws Exception;
    String deleteChallenger(long challengerId, long userId) throws Exception;
}
