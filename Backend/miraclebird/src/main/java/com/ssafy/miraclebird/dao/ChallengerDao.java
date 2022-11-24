package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.dto.ChallengerDto;
import com.ssafy.miraclebird.entity.Challenger;

import java.util.List;

public interface ChallengerDao {
    List<Challenger> getChallengerALL();
    Challenger getChallengerById(long challengerIdx);
    Challenger getIdByEntities(long challengeIdx,long userIdx);
    void addChallenger(Challenger challenger) throws Exception;
    void deleteChallenger(Long challengerIdx) throws Exception;
}
