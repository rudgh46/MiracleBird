package com.ssafy.miraclebird.dto;

import com.ssafy.miraclebird.entity.Verification;
import com.ssafy.miraclebird.util.ModelMapperUtils;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class VerificationDto {
    private long verificationIdx;
    private LocalDateTime regtime;
    private String selfie;
    private Boolean share;
    private long userIdx;
    private long challengeIdx;
    private long approval;

    //인증샷 유저정보
    private String name;
    private String imageUrl;

    public static VerificationDto of(Verification missionEntity) {
        VerificationDto missionDto = ModelMapperUtils.getModelMapper().map(missionEntity, VerificationDto.class);
        return missionDto;
    }
}
