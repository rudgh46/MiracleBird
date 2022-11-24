package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dao.ChallengeDao;
import com.ssafy.miraclebird.dao.ChallengerDao;
import com.ssafy.miraclebird.dao.UserDao;
import com.ssafy.miraclebird.dto.ChallengerDto;
import com.ssafy.miraclebird.entity.Challenger;
import com.ssafy.miraclebird.entity.Verification;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChallengerServiceImpl implements ChallengerService{
    private final ChallengerDao challengerDao;
    private final ChallengeDao challengeDao;
    private final UserDao userDao;


    @Autowired
    public ChallengerServiceImpl(ChallengerDao challengerDao, ChallengeDao challengeDao, UserDao userDao) {
        this.challengerDao = challengerDao;
        this.challengeDao = challengeDao;
        this.userDao = userDao;
    }

    @Override
    @Transactional
    public List<ChallengerDto> getChallengerALL() {
        List<Challenger> challengerEntity = challengerDao.getChallengerALL();
        List<ChallengerDto> challengerDtos = new ArrayList<>();
        for (int i = 0; i < challengerEntity.size(); i++) {
            challengerDtos.add(ChallengerDto.of(challengerEntity.get(i)));
        }
        return challengerDtos;
    }

    @Override
    @Transactional
    public ChallengerDto getChallengerById(long challengerId) {
        Challenger challengerEntity = challengerDao.getChallengerById(challengerId);
        ChallengerDto challengerDto = ChallengerDto.of(challengerEntity);
        return challengerDto;
    }

    @Override
    @Transactional
    public Long getIdByEntities(long challengeId, long userId) {
        Challenger challengerEntity = challengerDao.getIdByEntities(challengeId,userId);
        //널이면 -1 리턴
        if(challengerEntity == null) return (long)-1;
        long challengerIdx = challengerEntity.getChallengerIdx();
        return challengerIdx;
    }

    @Override
    @Transactional
    public String addChallenger(ChallengerDto challengerDto) throws Exception {
        try{
            Challenger challengerEntity = new Challenger();
            challengerEntity.setChallenge(challengeDao.getChallengeById(challengerDto.getChallenge()));
            challengerEntity.setUser(userDao.getUserById(challengerDto.getUser()));
            challengerEntity.setDeposit(challengerDto.isDeposit());
            challengerDao.addChallenger(challengerEntity);
            return "참가완료";
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    @Transactional
    public String deleteChallenger(long challengerId, long userId) throws Exception {
        try{
            User user = userDao.getUserById(userId);
            Challenger challenger = challengerDao.getChallengerById(challengerId);
            if (userId == challenger.getUser().getUserIdx() || user.getRole().getValue() == "ROLE_ADMIN") {
                challengerDao.deleteChallenger(challengerId);
                return "참가취소 완료";
            }
            return "권한이 없는 사용자입니다.";
        }
        catch (Exception e) {
            throw new Exception();
        }
    }
}
