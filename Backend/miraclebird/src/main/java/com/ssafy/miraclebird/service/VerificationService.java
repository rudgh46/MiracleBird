package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dto.RankDto;
import com.ssafy.miraclebird.dto.VerificationDto;

import java.time.LocalDateTime;
import java.util.List;

public interface VerificationService {
    List<VerificationDto> getVerificationALL();
    VerificationDto getVerificationById(long verificationId);
    List<VerificationDto> getVerificationByUser(long userId);
    String uploadVerification(VerificationDto verificationDto) throws Exception ;
    VerificationDto approveVerification(long verificationId, long updateApproval, long userId) throws Exception;
    void deleteVerificationInfo(long verificationId, long userId) throws Exception;
    List<VerificationDto> getVerificationByPeriod(Long userIdx, LocalDateTime startDate, LocalDateTime endDate);
    List<String> getRankByCount();
    List<String> getRankByStreak();
    long getStreakByUserIdx(Long userIdx);
    List<RankDto> getNftOwner();
}
