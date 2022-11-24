package com.ssafy.miraclebird.dto;

import com.ssafy.miraclebird.entity.Report;
import com.ssafy.miraclebird.entity.VerificationLike;
import com.ssafy.miraclebird.util.ModelMapperUtils;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class VerificationLikeDto {
    private long verificationLikeIdx;
    private long userIdx;
    private long verificationIdx;

    public static VerificationLikeDto of(VerificationLike missionEntity) {
        VerificationLikeDto missionDto = ModelMapperUtils.getModelMapper().map(missionEntity, VerificationLikeDto.class);
        return missionDto;
    }
}
