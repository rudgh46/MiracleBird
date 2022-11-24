package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.dto.RankDto;
import com.ssafy.miraclebird.entity.Verification;

import java.time.LocalDateTime;
import java.util.List;

public interface VerificationDao {
    List<Verification> getVerificationALL();
    Verification getVerificationById(long verificationIdx);
    List<Verification> getVerificationByUser(long userIdx);
    void saveVerification(Verification verification) throws Exception ;
    Verification approveVerification(long verificationIdx, long updateApproval) throws Exception;
    void deleteVerificationInfo(long verificationIdx) throws Exception;
    List<Verification> getVerificationByPeriod(Long userIdx, LocalDateTime startDate, LocalDateTime endDate);
    List<String> getRankByCount();
    List<String> getRankByStreak();
    long getStreakByUserIdx(Long userIdx);
    List<RankDto> getNftOwner();
    boolean isUploaded(long userIdx, long challengeIdx, LocalDateTime regtime);
}
